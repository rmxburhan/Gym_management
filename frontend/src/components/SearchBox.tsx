import { SearchIcon } from 'lucide-react';
import { FC, useState } from 'react';

const SearchBox: FC<{ onSearch: (name: string) => void }> = ({ onSearch }) => {
    const [search, setSearch] = useState('');

    // live search
    // useEffect(() => {
    //     onSearch(search);
    // }, [search]);

    return (
        <div className="flex flex-row gap-2">
            <input
                type="text"
                name="search"
                id="searchQuery"
                className="px-2 py-1 border bg-white rounded outline-none focus:border-slate-950 text-sm"
                placeholder="Searh..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <button
                className="flex flex-row items-center bg-slate-950 text-white rounded text-xs font-semibold"
                onClick={() => {
                    onSearch(search);
                }}
            >
                <SearchIcon size={16} className="me-2 " /> Search
            </button>
        </div>
    );
};

export default SearchBox;
