import Avatar from '@/components/Avatar';
import { ClockIcon } from 'lucide-react';

function ClassCard() {
    return (
        <div className="bg-sky-600 text-white p-4 rounded-md min-h-[100px] flex flex-col gap-2">
            <p className="font-bold uppercase mb-auto">
                This is class tite with the following line
            </p>
            <p className="text-sm flex gap-2">
                <ClockIcon size={18} />
                <span className="font-semibold drop-shadow">08:00 AM</span>
            </p>
            <div className="flex flex-row gap-2 items-center">
                <Avatar
                    imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPXomUZ43ajXSkYCOlloiab6MZehB5TNyGsg&s"
                    className="w-[40px] h-[40px] border"
                />
                <div>
                    <p className="text-sm">Rizal Burhanudin</p>
                </div>
            </div>
        </div>
    );
}

export default ClassCard;
