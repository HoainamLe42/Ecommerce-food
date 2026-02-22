import React, { useState } from 'react';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import Popup from '../../components/Popup';
import config from '../../config';
// import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
// import { UserFormData } from '../../types/admin/UserTypes';
// import { API_BASE_URL } from '../../context/StoreContext';

type Errors = {
    email?: string;
    password?: string;
    api?: string;
};

const SignIn = () => {
    // const [formData, setFormData] = useState<UserFormData>({
    //     email: '',
    //     password: '',
    // });
    const navigate = useNavigate();
    // const { login } = useAuth();

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [isPassword, setIsPassword] = useState<boolean>(false);
    // const [message, setMessage] = useState('');

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    console.log(handleOpenPopup);

    // const [errors, setErrors] = useState<Partial<UserFormData>>({});

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    const validate = (trimmedEmail: string, trimmedPassword: string) => {
        const newErrors: Errors = {};

        if (!trimmedEmail) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
            newErrors.email = 'Invalid email format';
        }

        if (!trimmedPassword) {
            newErrors.password = 'Password is required';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(trimmedPassword)) {
            newErrors.password =
                'Password must be at least 6 characters and include 1 uppercase & 1 lowercase letter';
        }

        return newErrors;
    };

    // Fake API
    const fakeLoginApi = (email: string, password: string) => {
        return new Promise<{ message: string }>((resolve, reject) => {
            setTimeout(() => {
                if (email === 'admin@gmail.com' && password === '123456Admin') {
                    resolve({ message: 'ok' });
                } else {
                    reject({ message: 'Email or password is incorrect' });
                }
            }, 1000);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSuccess('');
        setErrors({});

        // ✅ Trim ở đây
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        const validationErrors = validate(trimmedEmail, trimmedPassword);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);
            const response = await fakeLoginApi(trimmedEmail, trimmedPassword);
            setSuccess(response.message);
            alert('Đăng nhập thành công!');
            navigate(config.routes.home);
        } catch (err: any) {
            setErrors({ api: err.message });
        } finally {
            setLoading(false);
        }
    };

    // const validate = (): boolean => {
    //     const newErrors: Partial<UserFormData> = {};

    //     if (!formData.email.trim()) {
    //         newErrors.email = 'Email không được để trống.';
    //     } else if (
    //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    //     ) {
    //         newErrors.email = 'Email không hợp lệ.';
    //     }

    //     if (!formData.password.trim()) {
    //         newErrors.password = 'Mật khẩu không được để trống.';
    //     }

    //     setErrors(newErrors);

    //     return Object.keys(newErrors).length === 0;
    // };

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     if (validate()) {
    //         try {
    //             const response = await fetch(`${API_BASE_URL}/users`);

    //             const users = await response.json();
    //             console.log(users);

    //             const user = users.find(
    //                 (user: { email: string; password: string }) =>
    //                     user.email === formData.email &&
    //                     user.password === formData.password,
    //             );

    //             if (user) {
    //                 setMessage('Đăng nhập thành công.');
    //                 handleOpenPopup();

    //                 if (user.role === 'admin') {
    //                     navigate(config.routes.adminDashboard);
    //                 } else {
    //                     login(user);
    //                     alert('Đăng nhập thành công!');
    //                     navigate(config.routes.home);
    //                 }
    //             } else {
    //                 setMessage('Mật khẩu hoặc email không đúng.');
    //             }
    //         } catch {
    //             console.error(errors);
    //             setMessage('Lỗi khi đăng nhập. Vui lòng thử lại.');
    //         }
    //     }

    //     // alert(JSON.stringify(formData, null, 2));
    // };

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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="py-2 px-6 mb-3 w-full rounded-full border-[1px] border-gray-400 shadow-sm"
                                    placeholder="Mật khẩu"
                                    required
                                />

                                {errors.password && (
                                    <span
                                        onClick={() =>
                                            setIsPassword(!isPassword)
                                        }
                                        className="absolute right-2 top-1/2 -translate-x-1/2 -translate-y-1/2 pb-3"
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
                            {/* {message && (
                                <p className="mt-4 text-center text-red-500">
                                    {message}
                                </p>
                            )} */}

                            {/* API Error */}
                            {errors.api && (
                                <p className="text-red-600 text-sm mb-3">
                                    {errors.api}
                                </p>
                            )}

                            {/* Success */}
                            {success && (
                                <p className="text-green-600 text-sm mb-3">
                                    Login {success}
                                </p>
                            )}
                            <Button
                                type="submit"
                                className={`w-full rounded-full mt-4 disabled:bg-primary/80`}
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Login'}
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
                <p className="p-8">Đăng nhập thành công.</p>
            </Popup>
        </div>
    );
};

export default SignIn;
