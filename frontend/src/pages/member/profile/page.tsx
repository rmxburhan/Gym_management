import Avatar from '@/components/Avatar';
import useAuth from '@/context/Auth';
import useHide from '@/context/SideBarState';
import useGet from '@/hooks/useGet';
import { getMemberResponseData } from '@/pages/dashboard/members/data';
import {
    ClockIcon,
    DumbbellIcon,
    HistoryIcon,
    IdCardIcon,
    LogOutIcon,
    LucideIcon,
    PhoneIcon,
    SettingsIcon,
} from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function Profile() {
    const { setActiveSideBar } = useHide();
    const navigate = useNavigate();
    useEffect(() => setActiveSideBar('/app/profile'), []);
    const { logout } = useAuth();
    const { data } = useGet<getMemberResponseData>('user');
    return (
        <div className="py-4">
            <div className="profile text-center flex flex-col items-center align-middle mb-2">
                <Avatar
                    imageUrl={`http://localhost:5000/${data?.data.profile}`}
                    className="w-[60px] h-[60px] mb-2"
                />
                <p className="text-xl font-bold ">{data?.data.name}</p>
            </div>
            <div
                id="stats"
                className="border rounded grid grid-cols-2 divide-x overflow-hidden mb-2 bg-white shadow"
            >
                <div className="p-2 relative hover:bg-slate-900 hover:text-white hover:cursor-pointer transition-all duration-200">
                    <p className=" text-center font-bold">Attendances</p>
                    <p className=" text-center text-sm">4 days in week</p>
                </div>
                <div className="p-2 relative hover:bg-slate-900 hover:text-white hover:cursor-pointer transition-all duration-200">
                    <p className=" text-center font-bold">Attendances</p>
                    <p className=" text-center text-sm">4 days in week</p>
                </div>
            </div>
            <div
                id="menu"
                className="divide-y flex flex-col rounded overflow-hidden border bg-white shadow"
            >
                <SettingMenu
                    icon={IdCardIcon}
                    text="Membership"
                    onClick={() => navigate('/app/membership')}
                />
                <SettingMenu
                    icon={ClockIcon}
                    text="Attendances"
                    onClick={() => navigate('/app/checkin')}
                />
                <SettingMenu
                    icon={DumbbellIcon}
                    text="Class"
                    onClick={() => navigate('/app/myclass')}
                />
                <SettingMenu
                    icon={PhoneIcon}
                    text="Contact CS"
                    onClick={() => navigate('/app/contact')}
                />
                <SettingMenu
                    icon={HistoryIcon}
                    text="Transaction History"
                    onClick={() => navigate('/app/transactions')}
                />
                <SettingMenu
                    icon={SettingsIcon}
                    text="Settings"
                    onClick={() => navigate('/app/settings')}
                />
            </div>

            <div
                className="bg-red-100 text-red-500 flex flex-row items-center p-4 text-sm mt-4 rounded gap-2 shadow hover:cursor-pointer"
                onClick={() => logout()}
            >
                <LogOutIcon size={20} />
                <span className="font-bold">Logout</span>
            </div>
        </div>
    );
}

const SettingMenu = ({
    icon,
    text,
    onClick,
}: { icon: LucideIcon; text: string; onClick: () => void }) => {
    const Icon = icon;
    return (
        <div
            className="p-4 flex flex-row gap-2 hover:bg-slate-900 hover:text-white hover:cursor-pointer transition-all duration-100 hover:px-8 hover:text-md text-sm items-center"
            onClick={onClick}
        >
            <Icon size={20} />
            <p className="font-bold">{text}</p>
        </div>
    );
};

export default Profile;
