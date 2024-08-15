import Avatar from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import useHide from '@/context/SideBarState';
import useGet from '@/hooks/useGet';
import {
    ArrowRightIcon,
    ClockIcon,
    DumbbellIcon,
    IdCardIcon,
    LucideIcon,
} from 'lucide-react';
import { FC, useEffect } from 'react';
import { getAnnouncementsResponse } from './data';
import { getClassesResponse } from '../classes/data';

const HomePage = () => {
    const { setActiveSideBar } = useHide();
    const { data, isLoading } = useGet<getAnnouncementsResponse>(
        `announcements?startDate=${new Date().toDateString()}`
    );
    const { data: classData, error: getClassError } =
        useGet<getClassesResponse>(
            `classes/upcoming=${new Date().toDateString()}`
        );
    useEffect(() => {
        setActiveSideBar('/app/home');
    }, []);
    return (
        <div className="mx-auto pt-4">
            <h2 className="font-bold mb-2 text-xl">Upcoming class</h2>
            {classData && (
                <div className="p-2 border border-black mb-2">
                    <p className="text-xl font-bold mb-2">This class title</p>
                    <div className="flex gap-4 items-center">
                        <Avatar
                            imageUrl={`http://localhost:5000/${classData?.data[0].trainer.profile}`}
                        />
                        <div>
                            <p className="font-semibold">
                                {classData?.data[0].trainer.name}
                            </p>
                            <p className="text-sm">
                                Start at:{' '}
                                {new Date().toLocaleString('id-ID', {
                                    dateStyle: 'long',
                                    timeStyle: 'short',
                                })}
                            </p>
                        </div>
                    </div>
                    <Button
                        className="ms-auto w-full mt-2"
                        variant="secondary"
                        disabled={true}
                    >
                        Already registered
                    </Button>
                </div>
            )}
            {getClassError && (
                <div className="p-4 bg-red-600 text-white text-center rounded font-semibold text-sm mb-2 shadow">
                    {getClassError}
                </div>
            )}
            <hr className="mb-2" />
            <div className="flex flex-row justify-evenly gap-8 pb-4">
                <IconMenu icon={IdCardIcon} title="Membership" />
                <IconMenu icon={ClockIcon} title="Check In" />
                <IconMenu icon={DumbbellIcon} title={'My Class'} />
            </div>

            <div className="flex">
                <h2 className="font-bold mb-2 text-xl">Announcements</h2>
                <p className="ms-auto text-sm font-semibold flex items-center gap-2">
                    <span className="text-blue-600">View all</span>
                    <ArrowRightIcon size={16} />
                </p>
            </div>
            {data?.data.map((x) => {
                return (
                    <AnnouncementsItem
                        title={x.title}
                        content={x.content}
                        date={x.createdAt}
                    />
                );
            })}
            {isLoading && <p className="p-4 font-semibold">Loading...</p>}
        </div>
    );
};

const IconMenu = ({ title, icon }: { icon: LucideIcon; title: string }) => {
    const Icon = icon;
    return (
        <div className="flex flex-col text-center flex-wrap">
            <div className="p-2 border-2 border-black rounded text-center mx-auto w-[60px] h-[60px] flex justify-center flex-col hover:bg-slate-900 hover:text-white hover:cursor-pointer transition-all duration-150 shadow bg-white">
                <Icon className="mx-auto" size={36} />
            </div>
            <p className="text-xs mt-2">{title}</p>
        </div>
    );
};

const AnnouncementsItem: FC<{
    title: string;
    content: string;
    date: string;
}> = ({ title, content, date }) => {
    return (
        <div className="flex flex-col p-2 border-2 rounded border-black mb-2 shadow bg-white">
            <p className="font-semibold">{title}</p>
            <p className="text-sm mb-2">{content}</p>
            <p className="text-xs text-muted-foreground">
                {new Date(date).toLocaleString('id-ID', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                })}
            </p>
        </div>
    );
};

export default HomePage;
