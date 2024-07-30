import { ChevronLeft, ChevronRight, LogOut, LucideIcon } from 'lucide-react';
import React from 'react';
import useHide from '../../context/SideBarState';
import useAuth from '@/context/Auth';
import { useNavigate } from 'react-router';
interface SidebarProps {
    children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const { logout } = useAuth();
    const { isHide, setHide } = useHide();
    const navigate = useNavigate();
    return (
        <aside
            className={`sidebar flex flex-col ${
                isHide ? 'w-[70]' : 'w-[250px]'
            } border-r h-[100vh] transition-all ease-in duration-30 sticky`}
        >
            <div className={`${isHide ? 'px-2' : 'px-4'} flex-1 py-4`}>
                <div className="flex flex-row justify-between items-center mb-8">
                    {!isHide && (
                        <h1 className="font-bold text-black text-2xl">Gym</h1>
                    )}
                    {/* {!isHide && <LogoPlaceholder />} */}
                    <a
                        className={`p-2 bg-slate-950 text-white rounded ${
                            isHide && 'mx-auto'
                        }`}
                        onClick={() => {
                            setHide();
                        }}
                    >
                        {isHide ? (
                            <ChevronRight size={20} />
                        ) : (
                            <ChevronLeft size={20} />
                        )}
                    </a>
                </div>
                <div className="flex-1 flex flex-col gap-2">{children}</div>
            </div>

            <div className={`border-t ${isHide ? 'p-2' : 'p-4'}`}>
                <button
                    className={`flex bg-white text-black border-black border w-full items-center font-semibold text-xs px-4 py-3 rounded shadow-inner hover:shadow-md`}
                    id="btn-logout"
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                >
                    <LogOut size={20} />
                    {!isHide ? (
                        <span className="transition-all ms-2 text-xs font-semibold">
                            Logout
                        </span>
                    ) : (
                        ''
                    )}
                </button>
            </div>
        </aside>
    );
};

interface SideBarItemProps {
    Icon: LucideIcon;
    text: string;
    alert: boolean;
    active: boolean;
}

export const SideBarItem: React.FC<SideBarItemProps> = ({
    Icon,
    text,
    alert,
    active,
}) => {
    const { isHide } = useHide();

    return (
        <li
            className={`flex text-black rounded gap-4 hover:cursor-pointer transition-all relative items-center ${
                active
                    ? 'bg-slate-950 text-white'
                    : 'hover:bg-slate-950 hover:text-white'
            } ${isHide ? 'p-3' : 'px-4 py-3'}`}
        >
            <Icon size={20} className={`${isHide && 'mx-auto'}`} />
            <span
                className={`${
                    isHide ? 'hidden' : ''
                } transition-all text-xs font-semibold`}
            >
                {text}
            </span>
            {/* {isHide && (
                <span className="absolute left-20 bg-slate-950 text-white p-2 rounded text-sm transition-all">
                    {text}
                </span>
            )} */}
        </li>
    );
};
