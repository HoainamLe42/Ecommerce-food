import React, { useState } from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import { contactData } from '../data/contactData';
import Popup from '../components/Popup';

interface ContactForm {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const Contact = () => {
    const [formData, setFormData] = useState<ContactForm>({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    const [errors, setErrors] = useState<Partial<ContactForm>>({});

    const validate = (): boolean => {
        const newErrors: Partial<ContactForm> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Tên không được để trống.';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email không được để trống.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ.';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Số điện thoại không được để trống.';
        } else if (formData.phone.length <= 11)
            newErrors.phone = 'Số điện thoại không hợp lệ.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
        // or
        // setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validate()) {
            handleOpenPopup();
            setFormData({ name: '', email: '', phone: '', message: '' });
            alert(JSON.stringify(formData, null, 2));
        }
    };

    return (
        <div className="bg-white">
            <div className="py-10 md:pt-[120px] pt-[80px]">
                <Container>
                    <h1 className="lg:text-4xl md:text-3xl text-2xl font-semibold mt-3">
                        Gửi tin nhắn cho chúng tôi
                    </h1>

                    {/* Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="grid md:grid-cols-2 grid-cols-1 gap-10 mt-5"
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Họ tên"
                                    className="py-3 px-4 border-[1px] border-gray-400 shadow-sm rounded-md"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-3">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="py-3 px-4 border-[1px] border-gray-400 shadow-sm rounded-md"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-3">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Điện thoại"
                                    className="py-3 px-4 border-[1px] border-gray-400 shadow-sm rounded-md"
                                />

                                {errors.phone && (
                                    <p className="text-sm text-red-500 mt-3">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <textarea
                                placeholder="Nhập nội dung"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="py-3 px-4 border-[1px] border-gray-400 shadow-sm rounded-md h-[120px]"
                            ></textarea>

                            <Button
                                type="submit"
                                className="max-w-[230px] py-3"
                            >
                                Gửi liên hệ
                            </Button>
                        </div>

                        {/* Info */}
                        <div className="flex flex-col gap-4">
                            {contactData.map((contact, index) => (
                                <div key={index} className="flex gap-2">
                                    <span className="h-10 w-10 rounded-full bg-primary flex flex-shrink items-center justify-center">
                                        <contact.icon
                                            color="white"
                                            className=""
                                        />
                                    </span>
                                    <div>
                                        <h3 className="font-semibold">
                                            {contact.title}
                                        </h3>
                                        <p className="text-secondary-text text-sm">
                                            {contact.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </form>
                </Container>
            </div>
            <Popup
                title="Confirm"
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
            >
                <p>Đã gửi đi thành công.</p>
            </Popup>
        </div>
    );
};

export default Contact;
