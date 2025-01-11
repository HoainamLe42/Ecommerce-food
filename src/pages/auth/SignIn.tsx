import React, { useState } from 'react';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import Popup from '../../components/Popup';
import config from '../../config';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { UserFormData } from '../../types/admin/UserTypes';
import { API_BASE_URL } from '../../context/StoreContext';

const SignIn = () => {
    const [formData, setFormData] = useState<UserFormData>({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const { login } = useAuth();

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [isPassword, setIsPassword] = useState<boolean>(false);
    const [message, setMessage] = useState('');

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
    }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/users`);
            const users = await response.json();

            const user = users.find(
                (user: { email: string; password: string }) =>
                    user.email === formData.email &&
                    user.password === formData.password,
            );

            if (user) {
                setMessage('Đăng nhập thành công.');
                handleOpenPopup();

                if (user.role === 'admin') {
                    navigate(config.routes.adminDashboard);
                } else {
                    login(user);
                    alert('Đăng nhập thành công!');
                    navigate(config.routes.home);
                }
            } else {
                setMessage('Mật khẩu hoặc email không đúng.');
            }
        } catch {
            console.error(errors);
            setMessage('Lỗi khi đăng nhập. Vui lòng thử lại.');
        }

        // setFormData({ email: '', password: '' });
        // alert(JSON.stringify(formData, null, 2));
    };

    return (
        <div className="bg-white">
            <div className="py-10 md:pt-[120px] pt-[80px]">
                <Container>
                    <h1 className="text-3xl uppercase mb-5 text-center mt-3">
                        Đăng nhập
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col mx-auto max-w-[500px]"
                    >
                        {/* Left */}
                        <div className="">
                            <div>
                                <label htmlFor="email"></label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="py-2 px-6 mb-3 w-full rounded-full border-[1px] border-gray-400 shadow-sm"
                                    placeholder="Email"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm ml-1 mb-2">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="relative">
                                <label htmlFor="password"></label>
                                <input
                                    type={isPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="py-2 px-6 mb-3 w-full rounded-full border-[1px] border-gray-400 shadow-sm"
                                    placeholder="Mật khẩu"
                                    required
                                />

                                {formData.password && (
                                    <span
                                        onClick={() =>
                                            setIsPassword(!isPassword)
                                        }
                                        className="absolute right-2  top-1/2 -translate-x-1/2 -translate-y-1/2 pb-3"
                                    >
                                        {isPassword ? (
                                            <EyeOff color="gray" size="18" />
                                        ) : (
                                            <Eye color="gray" size="18" />
                                        )}
                                    </span>
                                )}

                                {errors.password && (
                                    <p className="text-red-500 text-sm ml-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {message && (
                                <p className="mt-4 text-center text-red-500">
                                    {message}
                                </p>
                            )}

                            <Button
                                type="submit"
                                className={`w-full rounded-full mt-4 disabled:bg-primary/80`}
                                disabled={!formData.email || !formData.password}
                            >
                                Đăng nhập
                            </Button>
                            <p className="mt-4">
                                Nếu chưa có tài khoản?{' '}
                                <Link
                                    to="/sign-up"
                                    className="underline font-semibold hover:text-primary"
                                >
                                    Đăng ký
                                </Link>
                            </p>
                            <p className="font-bold mt-2">Quên mật khẩu?</p>
                        </div>

                        {/* Bottom */}
                        <div className="flex flex-col justify-center mt-5">
                            <Button className="w-full mb-5 font-semibold rounded-full bg-transparent border-[1px] border-gray-700 text-black hover:bg-transparent hover:border-primary hover:text-primary">
                                Đăng nhập với Google
                            </Button>
                            <Button className="w-full font-semibold rounded-full bg-transparent border-[1px] border-gray-700 text-black hover:bg-transparent hover:border-primary hover:text-primary">
                                Đăng nhập với Facebook
                            </Button>
                        </div>
                    </form>
                </Container>
            </div>

            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                Đăng nhập thành công.
            </Popup>
        </div>
    );
};

export default SignIn;
