import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Container from '../../components/Container';
import { useState } from 'react';
import Popup from '../../components/Popup';
import { NewUser } from '../../types/admin/UserTypes';

const SignUp: React.FC<NewUser> = () => {
    const [formData, setFormData] = useState<NewUser>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        avatar: null,
    });
    const [errors, setErrors] = useState<Partial<NewUser>>({});
    const [message, setMessage] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    const validate = (): boolean => {
        const newErrors: Partial<NewUser> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Họ không được để trống.';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Tên không được để trống.';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email không được để trống.';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
        ) {
            newErrors.email = 'Email không hợp lệ.';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Mật khẩu không được để trống.';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword =
                'Mật khẩu và xác nhận mật khẩu không khớp.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validate()) {
            try {
                // Xét mặc định vai trò của Users

                // Kiểm tra trùng lặp
                const response = await fetch('http://localhost:5001/users');
                const existingUsers: NewUser[] = await response.json();

                const userExists = existingUsers.some(
                    (user: { email: string }) => user.email === formData.email,
                );

                if (userExists) {
                    setMessage('Email đã tồn tại, vui lòng dùng email khác.');
                    return;
                }

                const generateId = () => Date.now();

                const newUser: NewUser = {
                    id: generateId(),
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    avatar: null,
                    role: 'user',
                };

                // Thêm tài khoản mới
                const createResponse = await fetch(
                    'http://localhost:5001/users',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newUser),
                    },
                );

                if (createResponse.ok) {
                    setMessage('Đăng ký tài khoản thành công.');
                    setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    });
                    handleOpenPopup();
                    alert(
                        'Form hợp lệ! Dữ liệu: ' +
                            JSON.stringify(formData, null, 2),
                    );
                }
            } catch (error) {
                console.error(error);
                setMessage('Lỗi tạo tài khoản, vui lòng thử lại');
            }
        }
    };

    return (
        <div className="bg-white">
            <div className="py-10 md:pt-[120px] pt-[80px]">
                <Container>
                    <h1 className="md:text-4xl text-3xl text-center uppercase mb-5 mt-3">
                        Đăng ký
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5 mx-auto max-w-[500px]"
                    >
                        {/* Left */}
                        <div className="">
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="py-2 px-6 mb-3 w-full rounded-full border-[1px] border-gray-400 shadow-sm"
                                    placeholder="Họ"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="py-2 px-6 mb-3 w-full rounded-full border-[1px] border-gray-400 shadow-sm"
                                    placeholder="Tên"
                                />
                            </div>
                            <div>
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm mb-2 ml-2">
                                        {errors.firstName}
                                    </p>
                                )}

                                {errors.lastName && (
                                    <p className="text-red-500 text-sm mb-2 ml-2">
                                        {errors.lastName}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor=""></label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="py-2 px-6 mb-3 w-full rounded-full border-[1px] border-gray-400 shadow-sm"
                                    placeholder="Email"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mb-2 ml-2">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor=""></label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="py-2 px-6 mb-3 w-full rounded-full border-[1px] border-gray-400 shadow-sm"
                                    placeholder="Mật khẩu"
                                />

                                {errors.password && (
                                    <p className="text-red-500 text-sm mb-2 ml-2">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor=""></label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="py-2 px-6 mb-3 w-full rounded-full border-[1px] border-gray-400 shadow-sm"
                                    placeholder="Nhập lại mật khẩu"
                                />

                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mb-2 ml-2">
                                        {errors.confirmPassword}
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
                                className="w-full rounded-full mt-5"
                            >
                                Đăng ký
                            </Button>
                            <p className="mt-4">
                                Nếu đã có tài khoản?{' '}
                                <Link
                                    to="/sign-in"
                                    className="underline font-semibold hover:text-primary"
                                >
                                    Đăng nhập
                                </Link>
                            </p>
                        </div>
                    </form>

                    {/* Bottom */}
                    <div className="flex flex-col justify-center mt-5 max-w-[500px] mx-auto">
                        <Button className="w-full mb-5 font-semibold rounded-full bg-transparent border-[1px] border-gray-700 text-black hover:bg-transparent hover:border-primary hover:text-primary">
                            Đăng nhập với Google
                        </Button>
                        <Button className="w-full font-semibold rounded-full bg-transparent border-[1px] border-gray-700 text-black hover:bg-transparent hover:border-primary hover:text-primary">
                            Đăng nhập với Facebook
                        </Button>
                    </div>
                </Container>
            </div>

            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                Bạn đã đăng ký thành công.
            </Popup>
        </div>
    );
};

export default SignUp;
