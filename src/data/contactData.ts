import { MapPin, Phone, Mail } from 'lucide-react';
import { ContactSection } from '../types/ContactTypes';

export const contactData: ContactSection[] = [
    {
        title: 'Địa chỉ liên hệ',
        value: '123 Tân Xuân, Ba Tri, Bến Tre, Việt Nam',
        icon: MapPin,
    },
    {
        title: 'Số điện thoại',
        value: '+1 234 567 890',
        icon: Phone,
    },
    {
        title: 'Email',
        value: 'contact@company.com',
        icon: Mail,
    },
];
