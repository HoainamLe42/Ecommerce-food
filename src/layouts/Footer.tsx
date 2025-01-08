import Container from '../components/Container';
import { footerData } from '../data/footerData';

const Footer = () => {
    return (
        <footer className="sm:py-10 py-5">
            <Container>
                <div className="flex justify-between flex-wrap gap-5 sm:mb-10 mb-2">
                    {/* Company Info */}
                    <div className="text-gray-600">
                        <h3 className="text-xl font-semibold mb-2">
                            <img src={footerData.companyInfo.logo} alt="" />
                        </h3>
                        <div className="flex flex-col gap-2">
                            <p className="max-w-[400px]">
                                {footerData.companyInfo.description}
                            </p>
                            <p>{footerData.companyInfo.address}</p>
                            <p>
                                <span className="font-semibold">Email:</span>{' '}
                                {footerData.companyInfo.email}
                            </p>
                            <p>
                                <span className="font-semibold">Phone:</span>{' '}
                                <span className="hover:text-primary hover:underline cursor-pointer">
                                    {footerData.companyInfo.phone}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="mb-4 md:mb-0">
                        <h4 className="text-lg font-semibold mb-2">
                            Mạng xã hội
                        </h4>
                        <ul className="flex flex-col gap-2 text-gray-600">
                            {footerData.socialLinks.map((social, index) => (
                                <li
                                    key={index}
                                    className="hover:text-primary transition-all duration-100"
                                >
                                    <a href={social.url}>{social.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="mb-4 md:mb-0">
                        <h4 className="text-lg font-semibold mb-2">
                            Mạng xã hội
                        </h4>
                        <ul className="flex flex-col gap-2 text-gray-600">
                            {footerData.socialLinks.map((social, index) => (
                                <li
                                    key={index}
                                    className="hover:text-primary transition-all duration-100"
                                >
                                    <a href={social.url}>{social.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="mb-4 md:mb-0">
                        <h4 className="text-lg font-semibold mb-2">
                            Mạng xã hội
                        </h4>
                        <ul className="flex flex-col gap-2 text-gray-600">
                            {footerData.socialLinks.map((social, index) => (
                                <li
                                    key={index}
                                    className="hover:text-primary transition-all duration-100"
                                >
                                    <a href={social.url}>{social.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="sm:mt-6 mt-0 text-center text-sm pt-6 border-t-[1px] border-gray-400">
                    <p>{footerData.copyright}</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
