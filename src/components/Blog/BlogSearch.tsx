import { Search, X } from 'lucide-react';
import { useBlog } from '../../context/BlogContext';

const BlogSearch = () => {
    const { searchQuery, setSearchQuery } = useBlog();

    return (
        <div className="flex sm:flex-row flex-col md:justify-end justify-start gap-4 w-full">
            <div className="relative flex flex-grow items-center md:h-[56px] h-[42px] w-full max-w-[378px] border-[1px] border-black rounded-xl overflow-hidden">
                <Search color="gray" size="20" className="ml-4" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="h-full px-3 outline-none border-none"
                />
                {searchQuery && (
                    <X
                        onClick={() => setSearchQuery('')}
                        color="gray"
                        size="20"
                        className="absolute right-0 mr-4 cursor-pointer"
                    />
                )}
            </div>
        </div>
    );
};

export default BlogSearch;
