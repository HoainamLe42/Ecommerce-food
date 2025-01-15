import { BlogFilterTypes, BlogTypes } from '../types/BlogTypes';

export const blogsData: BlogTypes[] = [
    {
        id: 1,
        time: 'Nove 06, 2024',
        readMin: '10 min read',
        title: 'Top 10 vegetarian and vegan restaurants in your city.',
        desc: 'Looking to add more leafy greens and plant-based burgers to your plate this fall? Today, in celebration of World Vegetarian Day on October 1, we discover few restaurants for you.',
        name: 'David Warner',
        img: '/images/blog/img-01.png',
        author_avatar: '/images/authorAvatar/author-01.png',
    },

    {
        id: 2,
        time: 'Dec 03, 2024',
        readMin: '15 min read',
        title: 'Top 10 vegetarian and vegan restaurants in your city.',
        desc: 'Looking to add more leafy greens and plant-based burgers to your plate this fall? Today, in celebration of World Vegetarian Day on October 1, we discover few restaurants for you.',
        name: 'Neymar Jr',
        img: '/images/blog/img-02.png',
        author_avatar: '/images/authorAvatar/author-01.png',
    },

    {
        id: 3,
        time: 'May 02, 2024',
        readMin: '14 min read',
        title: 'Most popular vegetarian and vegan restaurants in your city.',
        desc: 'Looking to add more leafy greens and plant-based burgers to your plate this fall? Today, in celebration of World Vegetarian Day on October 1, we discover few restaurants for you.',
        name: 'Ronaldo Cr7',
        img: '/images/blog/img-03.png',
        author_avatar: '/images/authorAvatar/author-01.png',
    },

    {
        id: 4,
        time: 'Oct 01, 2024',
        readMin: '26 min read',
        title: 'Top 10 vegetarian and vegan restaurants in your city.',
        desc: 'Looking to add more leafy greens and plant-based burgers to your plate this fall? Today, in celebration of World Vegetarian Day on October 1, we discover few restaurants for you.',
        name: 'HoaiNam Le',
        img: '/images/blog/img-04.png',
        author_avatar: '/images/authorAvatar/author-01.png',
    },
];

export const blogFilters: BlogFilterTypes[] = [
    { id: 'all', label: 'Tất cả' },
    { id: 'popular', label: 'Phổ biến' },
    { id: 'recent', label: 'Gần đây' },
    // { id: 'oldest', label: 'Cũ nhất' },
    { id: 'old', label: 'Cũ nhất' },
];
