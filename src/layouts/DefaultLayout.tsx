import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type DefaultLayoutProps = {
    children: ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <div className="h-full bg-[#FFFAE3]">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
