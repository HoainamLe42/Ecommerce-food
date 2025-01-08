import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import Container from '../Container';
import Button from '../Button';
import { useBlog } from '../../context/BlogContext';

const BlogSideshow = () => {
    const { blogPosts } = useBlog();
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % blogPosts.length);
    };

    const prevSlide = () => {
        setCurrentSlide(
            (currentSlide - 1 + blogPosts.length) % blogPosts.length,
        );
    };

    return (
        <Container>
            <div className="w-full overflow-hidden md:mt-[40px]">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {blogPosts.map((blog) => (
                        <div key={blog.id} className="w-full flex-shrink-0">
                            <div className="flex flex-col gap-y-7 md:grid grid-cols-12">
                                {/* Content */}
                                <div className="col-span-6 flex flex-col">
                                    <p className="text-sm md:text-lg text-secondary-text flex items-center">
                                        <span>{blog.time}</span>
                                        <hr className="mx-3 w-[1px] h-[14px] bg-secondary-text" />
                                        <span>{blog.readMin}</span>
                                    </p>
                                    <h1 className="pr-2 text-[34px] md:text-[44px] mt-4 font-semibold leading-none">
                                        {blog.title}
                                    </h1>
                                    <p className="mt-5 md:text-lg text-secondary-text font-light">
                                        {blog.desc}
                                    </p>
                                    <div className="flex items-center gap-3 mt-3 md:mt-9">
                                        <img
                                            src={blog.author_avatar}
                                            alt=""
                                            className="h-[44px] w-[44px] md:h-[54px] md:w-[54px] rounded-full object-cover"
                                        />
                                        <p className="text-[16px] md:text-lg font-semibold">
                                            {blog.name}
                                        </p>
                                    </div>
                                </div>

                                {/* Media */}
                                <section className="md:col-span-5 md:col-start-8 mx-auto">
                                    <img
                                        src={blog.img}
                                        alt=""
                                        className="h-auto w-[339px] md:w-[470px] object-cover rounded-xl"
                                    />
                                </section>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex md:justify-start justify-center gap-4 mt-4">
                    <Button onClick={prevSlide} size="icon">
                        <ChevronLeft />
                    </Button>

                    <Button onClick={nextSlide} size="icon">
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default BlogSideshow;
