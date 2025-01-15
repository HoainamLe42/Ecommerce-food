import React, { useState } from 'react';
import Container from '../../components/Container';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import { CornerDownLeft, Pencil } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Popup from '../../components/Popup';

const UserProfile = () => {
    const { user } = useAuth();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handleOpenPopup();
        setTimeout(() => {
            navigate(-1);
        }, 2000);
    };

    return (
        <Container>
            <div className="min-h-screen md:py-10 py-5 flex flex-col justify-between">
                <div className="grid md:grid-cols-6 grid-cols-1">
                    {/* Media */}
                    <div className="col-span-2 p-4">
                        <div className="flex flex-col items-center justify-center md:mt-10 mt-4">
                            <div className="relative h-40 w-40 rounded-full flex items-center justify-center flex-shrink-0 text-4xl bg-primary text-white border-[2px] border-black">
                                {user?.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt=""
                                        className="rounded-full h-full w-full"
                                    />
                                ) : (
                                    <p>H</p>
                                )}

                                <div className="absolute bottom-0 right-5 flex items-center justify-center bg-white h-7 w-7 rounded-full border border-black cursor-pointer">
                                    <Pencil size="15" color="black" />
                                </div>
                            </div>

                            <p className="font-bold mt-3">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-secondary-text">{user?.email}</p>
                            <p className="text-secondary-text">
                                <span className="font-bold text-black">
                                    ID:
                                </span>{' '}
                                {String(user?.id)}
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="col-span-4 p-4">
                        <h2 className="uppercase text-2xl mb-7">Thông tin</h2>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4 w-full"
                        >
                            <div className="flex md:flex-row flex-col gap-4">
                                <div className="flex flex-col gap-1 w-full">
                                    <label
                                        htmlFor=""
                                        className="text-sm font-semibold"
                                    >
                                        FirstName
                                    </label>
                                    <input
                                        type="text"
                                        value={user?.firstName}
                                        className="p-1 border border-secondary-border px-3 rounded-md"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <label
                                        htmlFor=""
                                        className="text-sm font-semibold"
                                    >
                                        LastName
                                    </label>
                                    <input
                                        type="text"
                                        value={user?.lastName}
                                        className="p-1 border border-secondary-border px-3 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label
                                    htmlFor=""
                                    className="text-sm font-semibold"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email}
                                    className="p-1 border border-secondary-border px-3 rounded-md"
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label
                                    htmlFor=""
                                    className="text-sm font-semibold"
                                >
                                    Số điện thoại
                                </label>
                                <input
                                    type="number"
                                    value={'0917273645'}
                                    className="p-1 border border-secondary-border px-3 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label
                                    htmlFor=""
                                    className="text-sm font-semibold"
                                >
                                    Địa chỉ
                                </label>
                                <input
                                    type="text"
                                    value={'Bến Tre, Ba Tri, Tân Xuân'}
                                    className="p-1 border border-secondary-border px-3 rounded-md"
                                />
                            </div>

                            <div className="flex justify-center mt-5">
                                <Button
                                    type="submit"
                                    className="max-w-[200px] w-full"
                                >
                                    Lưu
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                <Link
                    to={config.routes.home}
                    className="flex items-center gap-3 text-primary mb-5"
                >
                    <CornerDownLeft size="20" />
                    Trở về trang chủ
                </Link>
            </div>
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                Cập nhật thông tin thành công.
            </Popup>
        </Container>
    );
};

export default UserProfile;
