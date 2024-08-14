import Avatar from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import useHide from '@/context/SideBarState';
import useGet from '@/hooks/useGet';
import { ArrowRightIcon } from 'lucide-react';
import { FC, useEffect } from 'react';
import { getAnnouncementsResponse } from './data';

const HomePage = () => {
    const { setActiveSideBar } = useHide();
    const { data, isLoading } = useGet<getAnnouncementsResponse>(
        `announcements?startDate=${new Date().toDateString()}`
    );
    useEffect(() => {
        setActiveSideBar('/app/home');
    }, []);
    return (
        <div className="px-4 max-w-[800px] mx-auto pt-4">
            <h2 className="font-bold mb-2">Upcoming class</h2>
            <div className="p-2 border border-black mb-2">
                <p className="text-xl font-bold mb-2">This class title</p>
                <div className="flex gap-4 items-center">
                    <Avatar imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Ka4hDsrmgaTw1r9qxIrdBs4oFellp7kSJw&s" />
                    <div>
                        <p className="font-semibold">Trainer name</p>
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

            <div className="flex">
                <h2 className="font-bold mb-2">Announcements</h2>
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

const AnnouncementsItem: FC<{
    title: string;
    content: string;
    date: string;
}> = ({ title, content, date }) => {
    return (
        <div className="flex flex-col p-2 border border-black mb-2">
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

// const FABCheckin = () => {
//     const navigate = useNavigate();
//     return (
//         <TooltipProvider>
//             <Tooltip>
//                 <TooltipTrigger asChild>
//                     <Button
//                         className="fixed bottom-24 right-10 px-0 w-[60px] h-[60px] rounded-full"
//                         onClick={() => navigate('/app/attendances')}
//                     >
//                         <Clock />
//                     </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                     <p>Check in</p>
//                 </TooltipContent>
//             </Tooltip>
//         </TooltipProvider>
//     );
// };

export default HomePage;
