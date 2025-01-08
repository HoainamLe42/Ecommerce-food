import BlogSearch from './BlogSearch';
import { useBlog } from '../../context/BlogContext';
import { blogFilters } from '../../data/blogData';

const BlogFilter = () => {
    const { selectedType, setSelectedType, setSearchQuery } = useBlog();

    return (
        <div className="flex md:flex-row flex-col justify-between md:gap-6 gap-3  md:mt-[100px] md:mb-[55px] my-8">
            <div className="">
                <ul className="flex gap-7">
                    {blogFilters.map((filter) => (
                        <li
                            key={filter.id}
                            onClick={() => setSelectedType(filter.id)}
                            onChange={(e) => {
                                setSelectedType(filter.id);
                                setSearchQuery('');
                            }}
                            className={`md:text-lg text-sm text-nowrap py-2 border-b-2 cursor-pointer transition-all duration-150 ${
                                selectedType == filter.id
                                    ? 'text-primary border-b-primary'
                                    : 'text-secondary-text border-b-transparent'
                            }`}
                        >
                            {filter.label}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Search Input */}
            <BlogSearch />
        </div>
    );
};

export default BlogFilter;
