import React, { createContext, useContext, useEffect, useState } from 'react';
import { BlogTypes } from '../types/BlogTypes';
// import { API_BASE_URL } from './StoreContext';

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
    loading: boolean;
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
    const [selectedType, setSelectedType] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const fetchBlogPosts = async () => {
        // try {
        //     setLoading(true);
        //     const response = await fetch(`${API_BASE_URL}/blogs`);
        //     if (!response.ok) {
        //         throw new Error(`HTTP lỗi! status: ${response.status}`);
        //     }

        //     const data = await response.json();

        //     setBlogPosts(data);
        // } catch (error) {
        //     console.error('Lỗi khi tải Blogs:', error);
        // } finally {
        //     setLoading(false);
        // }

        try {
            setLoading(true);
            const response = await fetch('db.json');
            if (!response.ok) {
                throw new Error(`HTTP lỗi! status: ${response.status}`);
            }
            const data = await response.json();
            setBlogPosts(data.blogs);
        } catch (error) {
            console.error('Lỗi khi tải Blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    const filteredBlogs = blogPosts.filter((blog) => {
        const matchesType =
            selectedType && selectedType !== 'all'
                ? blog.type === selectedType
                : true;
        const matchesQuery = searchQuery
            ? blog.title?.toLowerCase().includes(searchQuery?.toLowerCase())
            : true;

        return matchesType && matchesQuery;
    });

    useEffect(() => {
        setFilteredBlogPosts(filteredBlogs);
    }, [selectedType, searchQuery]);

    return (
        <BlogContext.Provider
            value={{
                loading,
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
