import { BlogTypes } from '../../types/BlogTypes';

const BlogCard = ({
    id,
    img,
    title,
    desc,
    author_avatar,
    name,
    time,
    readMin,
}: BlogTypes) => {
    return (
        <div
            key={id}
            className="p-5 h-full cursor-pointer transition-all duration-300 rounded-xl shadow-md hover:scale-105"
        >
            <img
                src={img}
                alt=""
                className="h-auto w-[315px] md:w-[330px] mx-auto"
            />
            <p className="text-sm md:text-lg text-secondary-text flex items-center md:mt-5 mt-3">
                <span>{time}</span>
                <hr className="mx-3 w-[1px] h-[14px] bg-secondary-text" />
                <span>{readMin}</span>
            </p>
            <h3 className="md:mt-4 mt-3 md:text-xl text-lg font-semibold">
                {title}
            </h3>

            <p className="md:mt-4 mt-2 text-sm md:text-[16px] text-secondary-text font-light leading-6 line-clamp-3">
                {desc}
            </p>

            <div className="flex items-center gap-3 mt-4 md:mt-7">
                <img
                    src={author_avatar}
                    alt=""
                    className="h-[44px] w-[44px] md:h-[54px] md:w-[54px] rounded-full object-cover"
                />
                <p className="text-[16px] md:text-lg font-semibold">{name}</p>
            </div>
        </div>
    );
};

export default BlogCard;
