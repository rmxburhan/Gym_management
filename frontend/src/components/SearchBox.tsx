import { SearchIcon } from 'lucide-react';
import { FC, MouseEventHandler, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const SearchBox: FC<{ onSearch: (name: string) => void }> = ({ onSearch }) => {
    const [search, setSearch] = useState('');

    // live search
    // useEffect(() => {
    //     onSearch(search);
    // }, [search]);

    const btnCLicked: MouseEventHandler<HTMLButtonElement> = (e) =>
        onSearch(search);

    return (
        <div className="flex flex-row gap-2">
            <Input
                type="text"
                name="search"
                id="searchQuery"
                className="border bg-white rounded outline-none focus:border-slate-950 font-medium"
                placeholder="Searh..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <Button onClick={btnCLicked}>Search</Button>
        </div>
    );
};

export default SearchBox;
