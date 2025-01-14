import { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { API_BASE_URL } from '../../context/StoreContext';
import { Move, Pencil, X } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';

type BannerImage = {
    id: number;
    src: string;
    alt: string;
};

const BannerManager = () => {
    const [bannerImages, setBannerImages] = useState<BannerImage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    useEffect(() => {
        const fetchBanner = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/banner`);
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                const data = await response.json();
                setBannerImages(data);
            } catch (error) {
                console.error('Lỗi HTTP', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanner();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBannerImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpdateBanner = async () => {
        try {
            const response = await fetch('http://localhost:3000/banner/1', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ images: bannerImages }),
            });

            if (response.ok) {
                alert('Cập nhật banner thành công!');
            } else {
                alert('Cập nhật banner thất bại!');
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    console.log(bannerImages);

    return (
        <AdminLayout>
            <h1 className="flex items-center justify-center h-screen text-3xl">
                Soon....
            </h1>
            {/* {loading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    <h1 className="text-xl uppercase font-bold my-4">
                        Chỉnh sửa Banner
                    </h1>

                    <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2"></th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Image
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    New image
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    View order
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Url
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bannerImages.map((banner, index) => (
                                <tr key={banner.id}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <Move />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img
                                            src={banner.src}
                                            alt={banner.alt}
                                            className="h-16 w-[100px] object-cover"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {previewUrl && (
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="h-16 w-[100px] object-cover"
                                            />
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-4 text-center py-2">
                                        {index + 1}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {banner.src}
                                    </td>

                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="flex gap-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                            <span className="flex items-center justify-center h-8 w-8 bg-blue-500 rounded-md cursor-pointer">
                                                <Pencil
                                                    color="white"
                                                    size="18"
                                                />
                                            </span>
                                            <a href={`${previewUrl}`}>LINK</a>
                                            <span className="flex items-center justify-center h-8 w-8 bg-red-500 rounded-md cursor-pointer">
                                                <X color="white" size="18" />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )} */}
        </AdminLayout>
    );
};

export default BannerManager;
