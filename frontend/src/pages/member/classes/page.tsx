import Avatar from '@/components/Avatar';
import useHide from '@/context/SideBarState';
import useGet from '@/hooks/useGet';
import { useEffect } from 'react';
import { getClassesResponse } from './data';

const ClassesPage = () => {
    const { setActiveSideBar } = useHide();
    const { data, isLoading, error } =
        useGet<getClassesResponse>('classes/upcoming');
    useEffect(() => setActiveSideBar('/app/classes'), []);
    return (
        <div className="py-4">
            <h2 className="font-bold mb-2 text-xl">Classes</h2>
            <div className="flex gap-2 mb-2">
                <div className="p-2  border-black border-2 font-semibold rounded">
                    By name
                </div>
                <div className="p-2  border-black border-2 font-semibold rounded">
                    Order
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {data?.data.map((x) => {
                    return (
                        <ClassItem
                            key={x.id}
                            title={x.name}
                            teacherImage={x.trainer.profile}
                            date={x.createdAt}
                            teacherName={x.trainer.name}
                        />
                    );
                })}
            </div>
            {isLoading && (
                <p className="p-4 text-center font-semibold ">Loading...</p>
            )}
            {error && (
                <div className="p-4 rounded bg-red-600 text-white text-center">
                    {error}
                </div>
            )}
        </div>
    );
};

const ClassItem = ({
    title,
    teacherName,
    date,
    teacherImage,
}: {
    title: string;
    teacherName: string;
    date: string;
    teacherImage: string;
}) => {
    return (
        <div className="p-2 border-2 rounded border-black">
            <p className="font-semibold text-md mb-2">{title}</p>
            <div className="flex items-center gap-2">
                <Avatar
                    imageUrl={`http://localhost:5000/${teacherImage}`}
                    className="w-[40px] h-[40px]"
                />
                <div>
                    <p className="text-sm font-semibold">{teacherName}</p>
                    <p className="text-xs">{new Date(date).toDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default ClassesPage;
