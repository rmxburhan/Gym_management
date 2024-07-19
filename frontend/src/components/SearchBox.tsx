import { SearchIcon } from 'lucide-react';
import { FC, useState } from 'react';

const SearchBox: FC<{ onSearch: (name: string) => void }> = ({ onSearch }) => {
    const [search, setSearch] = useState('');
    return (
        <div className="flex flex-row gap-2">
            <input
                type="text"
                name="search"
                id="searchQuery"
                className="px-4 py-2 border bg-white rounded outline-none focus:border-blue-500"
                placeholder="Searh..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <button
                className="flex flex-row items-center bg-blue-500 text-white rounded"
                onClick={() => {
                    onSearch(search);
                }}
            >
                <SearchIcon size={18} className="me-2" /> Search
            </button>
        </div>
    );
};

export default SearchBox;
