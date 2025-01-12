import { useState } from 'react';

import BlogCard from '../components/Blog/BlogCard';
import BlogFilter from '../components/Blog/BlogFilter';
import BlogSideshow from '../components/Blog/BlogSideshow';
import Container from '../components/Container';
import { useBlog } from '../context/BlogContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Blog = () => {
    const { blogPosts, filteredBlogPosts, loading } = useBlog();

    return (
        <div className="bg-white">
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="py-10 md:pt-[120px] pt-[80px]">
                    <BlogSideshow />
                    <Container>
                        <BlogFilter />
                        <div className="grid  lg:grid-cols-3 md:grid-cols-2 gap-7">
                            {(filteredBlogPosts && filteredBlogPosts.length > 0
                                ? filteredBlogPosts
                                : blogPosts
                            ).map((blog) => (
                                <BlogCard {...blog} key={blog.id} />
                            ))}
                        </div>
                    </Container>
                </div>
            )}
        </div>
    );
};

export default Blog;
