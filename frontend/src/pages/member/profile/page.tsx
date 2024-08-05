import ActionBar from '@/components/ActionBar';
import Avatar from '@/components/Avatar';
import useAuth from '@/context/Auth';
import useHide from '@/context/SideBarState';
import {
    CheckCheck,
    ChevronLeft,
    CreditCardIcon,
    HistoryIcon,
    LogOut,
    SettingsIcon,
    UserCircleIcon,
} from 'lucide-react';
import { useEffect } from 'react';

function Profile() {
    const { setActiveSideBar } = useHide();
    const { user, logout } = useAuth();
    useEffect(() => setActiveSideBar('/app/profile'), []);
    return (
        <div className="bg-white h-[100vh]">
            <ActionBar />
            <div className="container">
                <div className="profile-header h-16 bg-indigo-300 relative">
                    <Avatar
                        imageUrl="https://i.pinimg.com/originals/84/4e/e9/844ee9e1a2976ef40bf4aac1515aa85f.jpg"
                        className="absolute w-[80px] h-[80px] -bottom-[65%] left-0"
                    />
                </div>
                <div className="grid gap-2 pt-14">
                    <div className="flex flex-row">
                        <div className="flex-1">
                            <div className="font-semibold">
                                Rizal Burhanudin
                            </div>
                            <div className="text-sm">
                                rizalburhanudin556@gmail.com
                            </div>
                        </div>
                        <div className="px-2 py-1 border rounded flex flex-row items-center divide-x-2">
                            <div className="me-2 text-center">
                                <p className="font-semibold">23</p>
                                <p className="text-xs">Attendances</p>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded flex flex-row p-4 bg-white gap-4 items-center">
                        <UserCircleIcon />
                        <span className="font-medium text-sm">Profile</span>
                    </div>
                    <div className="border rounded flex flex-row p-4 bg-white gap-4 items-center">
                        <SettingsIcon />
                        <span className="font-medium text-sm">Settings</span>
                    </div>

                    <div className="border rounded flex flex-row p-4 bg-white gap-4 items-center">
                        <HistoryIcon />
                        <span className="font-medium text-sm">
                            Attendances history
                        </span>
                    </div>

                    <div className="border rounded flex flex-row p-4 bg-white gap-4 items-center">
                        <CreditCardIcon />
                        <span className="font-medium text-sm">
                            Membership plan
                        </span>
                    </div>
                    <hr className="m-2" />
                    <div
                        className="border rounded flex flex-row p-4 bg-white gap-4 items-center text-red-500"
                        onClick={logout}
                    >
                        <LogOut />
                        <span className="font-medium text-sm">Logout</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
