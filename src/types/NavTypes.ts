export interface NavItem {
    id: number;
    name: string;
    path: string;
    active: boolean;
}

export type NavList = NavItem[];
