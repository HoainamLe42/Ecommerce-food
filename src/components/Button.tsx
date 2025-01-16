import { VariantProps, cva } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export const buttonStyles = cva(['transition-colors'], {
    variants: {
        variant: {
            default: [
                'bg-primary',
                'hover:bg-primary-hover',
                'text-white',
                'flex',
                'justify-center',
            ],
            ghost: ['hover:underline'],
            dark: [
                'bg-secondary-dark',
                'hover:bg-secondary-dark-hover',
                'text-secondary',
            ],
            outline: [''],
        },
        size: {
            default: ['rounded', 'p-2'],
            icon: [
                'rounded-full',
                'w-10',
                'h-10',
                'flex',
                'items-center',
                'justify-center',
                'p-2.5',
                'text-white',
            ],
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});
// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//     size: 'small' | 'medium' | 'large'; // Kích thước button
//     variant: 'primary' | 'secondary' | 'tertiary'; // Kiểu dáng button
//     className?: string; // Lớp CSS bổ sung
//     to?: string; // Dùng cho thẻ <a>, nếu có sẽ chuyển sang link
// }

type ButtonProps = VariantProps<typeof buttonStyles> &
    // ButtonHTMLAttributes<HTMLButtonElement> &
    ComponentProps<'button'> &
    ComponentProps<'a'> & { to?: string };
const Button = ({ size, variant, className, to, ...props }: ButtonProps) => {
    const buttonClassName = twMerge(buttonStyles({ size, variant }), className);
    if (to) {
        return <a href={to} {...props} className={buttonClassName}></a>;
    }

    return <button {...props} className={buttonClassName} />;
};

export default Button;
