export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: string | null;
    role: 'user' | 'admin';
};

export type UserFormData = {
    email: string;
    password: string;
};

export interface NewUser {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    role?: 'user';
    avatar?: null;
}
