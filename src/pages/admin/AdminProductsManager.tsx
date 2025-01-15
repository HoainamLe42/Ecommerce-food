import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import ProductList from './components/products/ProductList';
import Popup from '../../components/Popup';

const AdminProducts = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);
    return (
        <AdminLayout>
            <ProductList openPopup={handleOpenPopup} />
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                <p className="p-8 w-">Add Item</p>
            </Popup>
        </AdminLayout>
    );
};

export default AdminProducts;
