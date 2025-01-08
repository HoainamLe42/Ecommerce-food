import React, { FormEvent, useState } from 'react';
import Button from '../Button';
import { Search } from 'lucide-react';
import { useShoppingCart } from '../../context/StoreContext';
import { useBlog } from '../../context/BlogContext';

const BlogSearch = () => {
    const { searchQuery, setSearchQuery } = useBlog();

    return (
        <form
            // onSubmit={handleSubmit}
            className="flex sm:flex-row flex-col md:justify-end justify-start gap-4 w-full"
        >
            <div className="relative flex flex-grow items-center md:h-[56px] h-[42px] w-full max-w-[378px] border-[1px] border-black rounded-xl overflow-hidden">
                <Search color="gray" size="20" className="ml-4" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="h-full px-3 outline-none border-none"
                />
            </div>

            {/* <Button className="md:h-[56px] h-[45px] sm:w-[130px] flex-shrink rounded-xl w-full max-w-[378px]">
                Tìm
            </Button> */}
        </form>
    );
};

export default BlogSearch;
