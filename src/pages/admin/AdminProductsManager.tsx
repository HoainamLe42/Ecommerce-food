import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import ProductList from './components/products/ProductList';
import ProductForm from './components/products/ProductForm';
import { useAdminContext } from '../../context/AdminContext';
import Popup from '../../components/Popup';

const AdminProducts = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { handleAddProduct } = useAdminContext();

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);
    return (
        <AdminLayout>
            <ProductList openPopup={handleOpenPopup} />
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                <ProductForm onSubmit={handleAddProduct} />
            </Popup>
        </AdminLayout>
    );
};

export default AdminProducts;
