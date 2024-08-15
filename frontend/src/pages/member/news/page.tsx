import useHide from '@/context/SideBarState';
import {
    ClockIcon,
    LetterTextIcon,
    SortAscIcon,
    SortDescIcon,
} from 'lucide-react';
import { useEffect } from 'react';

function NewsPage() {
    const { setActiveSideBar } = useHide();
    useEffect(() => setActiveSideBar('/app/news'), []);
    return (
        <div className="">
            <div className="sticky top-0 z-40 bg-gray-50 py-2">
                <input
                    type="text"
                    className="text-2xl text-end w-full p-4 bg-gray-50 outline-none border-none"
                    placeholder="Search..."
                />
                <div className="flex mb-2">
                    <div className="ms-auto border bg-white rounded flex divide-x">
                        <p className="p-2">
                            <ClockIcon size={20} />
                        </p>
                        <p className="p-2">
                            <LetterTextIcon size={20} />
                        </p>
                        <p className="p-2">
                            <SortAscIcon size={20} />
                        </p>
                        <p className="p-2">
                            <SortDescIcon size={20} />
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 mb-2">
                <MediaIcon />
                <MediaIcon />
                <MediaIcon />
                <MediaIcon />
                <MediaIcon />
                <MediaIcon />
                <MediaIcon />
            </div>
        </div>
    );
}

const MediaIcon = () => {
    return (
        <div className="rounded border h-[150px] relative overflow-hidden">
            <img
                src="https://res.cloudinary.com/dk0z4ums3/image/upload/v1608543180/attached_image/mengenal-hatha-yoga-dasar-dari-segala-jenis-yoga.jpg"
                alt=""
                className="absolute top-0 bottom-0 left-0 right-0"
            />
            <div className="bg-gradient-to-b from-transparent to-slate-900 z-1 absolute top-0 bottom-0 left-0 right-0"></div>
            <div className="absolute bottom-0 left-0 right-0 text-white text-start z-2 p-2">
                <p className="font-bold">Yoga</p>
                <p className="text-xs ">31 Resources</p>
            </div>
        </div>
    );
};

export default NewsPage;
