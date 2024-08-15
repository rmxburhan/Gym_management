import ActionBar from '@/components/ActionBar';
import Avatar from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAuth from '@/context/Auth';
import { CameraIcon } from 'lucide-react';
import ConfirmationSave from './partials/ConfirmationSave';
import { useState } from 'react';

const SettingPage = () => {
    const { user } = useAuth();
    const [profileVisibility, setProfileVisibility] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>(user?.profile || '');
    return (
        <div className="bg-gray-50 h-[100vh] flex flex-col max-w-[800px] w-full mx-auto">
            <ActionBar title="Settings" backButton />
            <div className="profileImage mb-4 flex pt-4">
                <div className="mx-auto relative" onClick={() => {}}>
                    <Avatar
                        imageUrl={`http://localhost:5000/${user.profile}`}
                        className=" w-[100px] h-[100px] hover:cursor-pointer"
                    />
                    <div className="absolute bottom-0 right-0 bg-slate-900 text-white p-2 rounded-full">
                        <CameraIcon size={18} />
                    </div>
                </div>
            </div>
            <div className="px-4">
                <div className="bg-white p-2 px-3 border rounded mb-4">
                    <form className="grid gap-1.5">
                        <div className="">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                placeholder="Email"
                                id="email"
                                type="email"
                                required
                            />
                        </div>
                        <Button className="mt-2">Save</Button>
                    </form>
                </div>
                <div className="bg-white border p-2 px-4">
                    <form className="grid gap-1.5">
                        <div className="">
                            <Label htmlFor="oldPassword">Old password</Label>
                            <Input
                                placeholder=""
                                id="oldPassword"
                                type="password"
                                required
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                placeholder=""
                                id="newPassword"
                                type="password"
                                required
                            />
                        </div>

                        <Button className="mt-2 " variant="default">
                            Save
                        </Button>
                    </form>
                </div>
            </div>
            <ConfirmationSave
                visibility={profileVisibility}
                imageUrl={imageUrl}
                onClose={() => setProfileVisibility(false)}
            />
        </div>
    );
};

export default SettingPage;
