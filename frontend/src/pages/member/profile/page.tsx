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

function Profile() {
    const { setActiveSideBar } = useHide();
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
                <SettingMenu icon={IdCardIcon} text="Membership" />
                <SettingMenu icon={ClockIcon} text="Attendances" />
                <SettingMenu icon={DumbbellIcon} text="Class" />
                <SettingMenu icon={PhoneIcon} text="Contact CS" />
                <SettingMenu icon={HistoryIcon} text="Transaction History" />
                <SettingMenu icon={SettingsIcon} text="Settings" />
            </div>

            <div
                className="bg-red-600 text-white flex flex-row items-center p-4 text-sm mt-4 rounded gap-2 shadow"
                onClick={() => logout()}
            >
                <LogOutIcon size={20} />
                <span className="font-bold">Logout</span>
            </div>
        </div>
    );
}

const SettingMenu = ({ icon, text }: { icon: LucideIcon; text: string }) => {
    const Icon = icon;
    return (
        <div className="p-4 flex flex-row gap-2 hover:bg-slate-900 hover:text-white hover:cursor-pointer transition-all duration-100 hover:px-8 hover:text-md text-sm items-center">
            <Icon size={20} />
            <p className="font-bold">{text}</p>
        </div>
    );
};

export default Profile;
