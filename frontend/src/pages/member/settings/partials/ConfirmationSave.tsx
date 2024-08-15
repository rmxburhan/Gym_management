import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { FC } from 'react';

interface Props {
    visibility: boolean;
    onClose: () => void;
    imageUrl: string;
}

const ConfirmationSave: FC<Props> = ({ visibility, onClose, imageUrl }) => {
    if (!visibility) return null;
    return (
        <div className="bg-[rgba(0,0,0,0.3)] absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
            <div className="max-w-[400px] w-full mx-4 border bg-white rounded divide-y">
                <div className="p-4 flex flex-row items-center">
                    <p className="font-bold">Profile</p>
                    <XIcon
                        onClick={() => onClose()}
                        className="font-bold ms-auto"
                        size={20}
                    />
                </div>
                <div className="p-4">
                    <img
                        className="h-[200px] w-[200px] mx-auto bg-gray-100 rounded mb-4"
                        src={imageUrl}
                    />
                    <Button className="w-full">Save</Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationSave;
