import React, { createContext, useContext, useEffect, useState } from 'react';
import { BlogTypes } from '../types/BlogTypes';

// Định nghĩa kiểu dữ liệu cho context
interface BlogContextProps {
    blogPosts: BlogTypes[];
    filteredBlogPosts: BlogTypes[];
    setFilteredBlogPosts: React.Dispatch<React.SetStateAction<BlogTypes[]>>;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredBlogs: BlogTypes[];
    selectedType: string;
    setSelectedType: React.Dispatch<React.SetStateAction<string>>;
}

// Tạo Context
const BlogContext = createContext<BlogContextProps | undefined>(undefined);

// Hook để sử dụng BlogContext
export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error('useBlog phải được sử dụng trong BlogProvider');
    }
    return context;
};

// Provider để quản lý trạng thái blog
export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [blogPosts, setBlogPosts] = useState<BlogTypes[]>([]);
    const [filteredBlogPosts, setFilteredBlogPosts] = useState<BlogTypes[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedType, setSelectedType] = useState('all');

    const fetchBlogPosts = async () => {
        try {
            const response = await fetch('http://localhost:5001/blogs');
            if (!response.ok) {
                throw new Error(`HTTP lỗi! status: ${response.status}`);
            }

            const data = await response.json();

            setBlogPosts(data);
        } catch (error) {
            console.error('Lỗi khi tải Blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    const filteredBlogs = blogPosts.filter((blog) => {
        const selectQuery = blog.title
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase());

        const selectType = selectedType === 'all' || blog.name === selectedType;

        return selectQuery || selectType;
    });

    return (
        <BlogContext.Provider
            value={{
                blogPosts,
                filteredBlogPosts,
                setFilteredBlogPosts,
                searchQuery,
                setSearchQuery,
                filteredBlogs,
                selectedType,
                setSelectedType,
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};
