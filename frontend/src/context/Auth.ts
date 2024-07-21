import { User } from 'lucide-react';
import { create } from 'zustand';
type AuthDataProps = {
    token?: string;
    user?: User;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
};

type User = {
    name: string;
    email: string;
    dateOfBirth: Date;
    image: string;
    address: string;
    role: string;
};

const useAuth = create<AuthDataProps>((set) => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('gym-user') || '{}'),
    setToken: (token) => {
        localStorage.setItem('token', token);
        set({ token });
    },
    setUser: (user: User) => {
        localStorage.setItem('gym-user', JSON.stringify(user));
        set({ user });
    },
    logout: () => {
        set({ user: undefined, token: undefined });
        localStorage.setItem('token', '');
    },
}));

export default useAuth;
