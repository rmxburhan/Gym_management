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
    profile?: string;
    role: string;
};
const useAuth = create<AuthDataProps>((set) => {
    return {
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
            localStorage.setItem('token', '');
            set({ user: undefined, token: undefined });
        },
    };
});

export default useAuth;
