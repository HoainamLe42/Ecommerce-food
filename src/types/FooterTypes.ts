export type FooterLink = {
    label: string;
    url: string;
};

export type SocialLink = {
    icon: string;
    url: string;
    color: string;
};

export type ServiceLink = {
    label: string;
    url: string;
};

export type FooterData = {
    companyInfo: {
        logo: string;
        description: string;
        address: string;
        email: string;
        phone: string;
    };
    socialLinks: SocialLink[];
    footerLinks: FooterLink[];
    servicesLinks: ServiceLink[];
    copyright: string;
};
