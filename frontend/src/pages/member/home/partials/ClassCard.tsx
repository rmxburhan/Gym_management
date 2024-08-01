import Avatar from '@/components/Avatar';
import { EllipsisIcon } from 'lucide-react';

function ClassCard() {
    return (
        <div className="h-auto w-full rounded border p-2 grid grid-cols-1 gap-1.5 bg-white">
            <p className="font-semibold">A class title</p>
            <p className="text-xs">
                This is a class description that will teach you about how
                important it is to write something good than good shit
            </p>
            <div className="flex flex-row gap-1.5 items-center mt-2">
                <Avatar
                    className="w-[40px] h-[40px]"
                    imageUrl="https://wallpapers.com/images/hd/cute-anime-profile-pictures-hf5vd8c7ywpbvgvf.jpg"
                />
                <div className="flex flex-col">
                    <p className="text-xs">The trainer name</p>
                    <p className="text-xs text-muted-foreground italic">
                        Senin, 24 January 2024
                    </p>
                </div>
                <button className="px-2 rounded-full ms-auto hover:bg-gray-100 transition-colors duration-300">
                    <EllipsisIcon className="w-[14px] ms-auto p-0" />
                </button>
            </div>
        </div>
    );
}

export default ClassCard;
