import { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { API_BASE_URL } from '../../context/StoreContext';

type BannerImage = {
    id: number;
    src: string;
    alt: string;
};

const BannerManager = () => {
    const [bannerImages, setBannerImages] = useState<BannerImage[]>([]);
    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/banner`);
                if (!response.ok) {
                    throw new Error(`HTTP lỗi! status: ${response.status}`);
                }
                const data = await response.json();
                setBannerImages(data);
            } catch (error) {
                console.error('Lỗi HTTP', error);
            }
        };

        fetchBanner();
    }, []);

    console.log(bannerImages);

    return (
        <AdminLayout>
            <h1 className="flex items-center justify-center h-screen text-3xl">
                Soon....
            </h1>
        </AdminLayout>
    );
};

export default BannerManager;
