import { ChevronLeft, ChevronRight, LogOut, LucideIcon } from 'lucide-react';
import React from 'react';
import useHide from '../../context/SideBarState';
import LogoPlaceholder from '@/components/LogoPlaceholder';
import useAuth from '@/context/Auth';
interface SidebarProps {
    children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const { logout } = useAuth();
    const { isHide, setHide } = useHide();
    return (
        <aside
            className={`sidebar flex flex-col ${
                isHide ? 'w-[75px]' : 'w-[350px]'
            } border-r h-[100vh] transition-all duration-30 sticky`}
        >
            <div className={`${isHide ? 'p-2' : 'p-4'} flex-1`}>
                <div className="flex justify-between items-center mb-4">
                    {isHide ? '' : <LogoPlaceholder />}
                    <button
                        className={`p-4 bg-indigo-100 text-indigo-500 rounded ${
                            isHide ?? 'w-full'
                        }`}
                        onClick={() => {
                            setHide();
                        }}
                    >
                        {isHide ? <ChevronRight /> : <ChevronLeft />}
                    </button>
                </div>
                <div className="flex-1 flex flex-col gap-2">{children}</div>
            </div>

            <div className={`border-t ${isHide ? 'p-2' : 'p-4'}`}>
                <button
                    className={`flex gap-2 bg-red-100 text-red-500 w-full items-center font-semibold p-4`}
                    id="btn-logout"
                    onClick={() => {
                        logout();
                    }}
                >
                    <LogOut size={20} />
                    {!isHide ? (
                        <span className="transition-all">Logout</span>
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
            className={`flex text-indigo-800 rounded gap-4 p-4 hover:cursor-pointer transition-all relative items-center ${
                active ? 'bg-indigo-100' : 'hover:bg-gray-100'
            }`}
        >
            <Icon />
            <span className={`${isHide ? 'hidden' : ''} transition-all`}>
                {text}
            </span>
            {/* {isHide && (
                <span className="absolute left-20 bg-indigo-100 text-indigo-500 p-2 rounded text-sm transition-all">
                    {text}
                </span>
            )} */}
        </li>
    );
};
