import useHide from '@/context/SideBarState';
import { useEffect, useState } from 'react';
import Article from './Article';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SortAsc, SortDesc } from 'lucide-react';

function NewsPage() {
    const { setActiveSideBar } = useHide();
    const [sortType, setSortType] = useState<boolean>(false);
    useEffect(() => setActiveSideBar('/app/news'), []);
    return (
        <div className="bg-gray-50 container grid pt-4 gap-2">
            <div className="flex flex-row gap-2">
                <Input placeholder="Searh here..." />
                <Button>Search</Button>
            </div>
            <div className="flex flex-row justify-end px-4 py-2">
                {sortType ? (
                    <SortAsc
                        size={20}
                        onClick={() => setSortType(!sortType)}
                        className="transition-all ease-in-out"
                    />
                ) : (
                    <SortDesc
                        size={20}
                        onClick={() => setSortType(!sortType)}
                        className="transition-all ease-in-out  duration-300"
                    />
                )}
            </div>
            <Article />
            <Article />
            <Article />
            <Article />
            <Article />
            <Article />
            <Article />
        </div>
    );
}

export default NewsPage;
