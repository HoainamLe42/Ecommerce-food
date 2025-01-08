export type FooterLink = {
    label: string;
    url: string;
};

export type SocialLink = {
    name: string;
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
    copyright: string;
};
