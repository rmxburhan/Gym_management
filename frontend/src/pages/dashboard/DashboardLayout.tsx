import {
    BellIcon,
    CalendarDays,
    CheckIcon,
    Dumbbell,
    FileBarChart,
    HomeIcon,
    LucideIcon,
    Package,
    Users,
} from 'lucide-react';
import { Sidebar, SideBarItem } from './Sidebar';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useHide from '../../context/SideBarState';

type SideBarListProps = {
    title: string;
    icon: LucideIcon;
    path: string;
};

const DashboardLayout: React.FC = () => {
    const SidebarList: SideBarListProps[] = [
        { icon: HomeIcon, title: 'Dashboard', path: '/dashboard' },
        {
            icon: CheckIcon,
            title: 'Attendances',
            path: '/dashboard/attendances',
        },
        { icon: Users, title: 'Member', path: '/dashboard/members' },
        { icon: Users, title: 'Trainer', path: '/dashboard/trainers' },
        // { icon: Users, title: 'Staff', path: '/dashboard/staffs' },
        { icon: CalendarDays, title: 'Class', path: '/dashboard/classes' },
        { icon: Dumbbell, title: 'Equipment', path: '/dashboard/equipments' },
        { icon: Package, title: 'Membership', path: '/dashboard/memberships' },
        {
            icon: BellIcon,
            title: 'Notifications',
            path: '/dashboard/notifications',
        },
        { icon: FileBarChart, title: 'Reports', path: '/dashboard/reports' },
    ];
    const { activeSideBar } = useHide();
    return (
        <div className="flex flex-row">
            <Sidebar>
                {SidebarList.map((item) => {
                    return (
                        <Link to={item.path} key={item.path}>
                            <SideBarItem
                                text={item.title}
                                Icon={item.icon}
                                active={activeSideBar === item.path}
                            />
                        </Link>
                    );
                })}
            </Sidebar>
            <div id="page" className="flex-1 overflow-y-auto bg-gray-50">
                <div className="overflow-y-scroll h-screen">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
