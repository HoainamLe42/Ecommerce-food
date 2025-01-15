import { BlogFilterTypes } from '../types/BlogTypes';

export const blogFilters: BlogFilterTypes[] = [
    { id: 'all', label: 'Tất cả' },
    { id: 'popular', label: 'Phổ biến' },
    { id: 'recent', label: 'Gần đây' },
    { id: 'oldest', label: 'Cũ nhất' },
];
