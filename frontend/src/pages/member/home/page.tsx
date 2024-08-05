import UpcomingClass from './partials/UpcomingClass';
import Community from './partials/Community';
import useHide from '@/context/SideBarState';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCheckIcon, ChevronLeft, Clock } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import ActionBar from '@/components/ActionBar';
import { useNavigate } from 'react-router';

const HomePage = () => {
    const { setActiveSideBar } = useHide();
    const navigate = useNavigate();
    useEffect(() => {
        setActiveSideBar('/app/home');
    }, []);
    return (
        <div>
            <ActionBar logo={true} />
            <div className="container grid gap-4">
                <UpcomingClass />
                <Community />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                className="fixed bottom-24 right-10 px-0 w-[60px] h-[60px] rounded-full"
                                onClick={() => navigate('/app/attendances')}
                            >
                                <Clock />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Check in</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};

export default HomePage;
