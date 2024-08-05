import useHide from '@/context/SideBarState';
import { cn } from '@/lib/utils';
import {
    Dumbbell,
    LayoutDashboardIcon,
    Newspaper,
    UserCircleIcon,
} from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

let menu = [
    {
        name: 'Dashboard',
        icon: <LayoutDashboardIcon />,
        path: '/app/home',
    },
    {
        name: 'Classes',
        icon: <Dumbbell />,
        path: '/app/classes',
    },
    {
        name: 'Media',
        icon: <Newspaper />,
        path: '/app/news',
    },
    {
        name: 'Profile',
        icon: <UserCircleIcon />,
        path: '/app/profile',
    },
];

const NavBar = () => {
    const navigate = useNavigate();
    const { activeSideBar } = useHide();
    return (
        <div className="bg-white h-[75px] w-full sticky bottom-0 left-0 right-0 border-t">
            <nav className="grid grid-cols-4 items-center align-middle h-full container">
                {menu.map((x) => {
                    return (
                        <div className="flex justify-center">
                            <button
                                className={cn(
                                    'hover:bg-gray-100 hover:cursor-pointer transition-all duration-100 px-2 py-1.5 rounded-lg flex flex-col items-center gap-0.5 min-w-20',
                                    activeSideBar === x.path &&
                                        'hover:bg-gray-200 animate-in'
                                )}
                                onClick={() => {
                                    navigate(x.path);
                                }}
                            >
                                {x.icon}
                                {activeSideBar === x.path && (
                                    <p className="text-xs transition-all">
                                        {x.name}
                                    </p>
                                )}
                            </button>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
};

export default NavBar;
