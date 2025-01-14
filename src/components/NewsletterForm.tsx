import React, { useState } from 'react';

import Container from '../components/Container';
import Button from '../components/Button';
import newsletterImg from '../assets/home/decor_newsletter.png';

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const NewsletterForm = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError(false);
        setSuccess(false);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError(true);
            return;
        }
        setSuccess(true);
        setError(false);
    };

    return (
        <section className="hidden md:block py-[100px] text-center bg-[#29B067] text-white relative">
            <Container>
                <div className="relative z-10">
                    <div className="max-w-[520px] mx-auto">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
                            Đăng ký nhận bản tin để nhận thông tin cập nhật
                        </h2>
                        <p>
                            Tải ứng dụng Just Eat để đặt hàng nhanh hơn và nhận
                            được những đề xuất cá nhân hóa hơn.
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex justify-center gap-4 mt-9"
                    >
                        <div className="h-12 w-full max-w-[392px]">
                            <label
                                htmlFor="newsletter-email"
                                className="sr-only"
                            >
                                Nhập email của bạn
                            </label>
                            <input
                                id="newsletter-email"
                                onChange={handleChange}
                                name="email"
                                placeholder="Nhập email..."
                                className={`h-full w-full px-4 rounded-md focus:outline-primary text-black ${
                                    error ? 'border border-red-500' : ''
                                }`}
                            />

                            {error && (
                                <p className="text-red-800 text-sm mt-2 text-left">
                                    Vui lòng nhập email hợp lệ.
                                </p>
                            )}

                            {success && (
                                <p className="text-primary text-sm mt-2 text-left">
                                    Cảm ơn bạn đã đăng ký thành công!
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="py-3 px-5 bg-[#FFCF54] text-black hover:scale-105 hover:bg-[#FFCF54] transition-all duration-200"
                        >
                            Subscribe
                        </Button>
                    </form>
                </div>
                <div className="absolute inset-0 m-auto max-w-[1057px] max-h-full">
                    <img
                        src={newsletterImg}
                        alt=""
                        className="block w-full h-full"
                    />
                </div>
            </Container>
        </section>
    );
};

export default NewsletterForm;
