import useAuth from '@/context/Auth';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router';

const NotAuthorizated: FC = () => {
    const { user, token } = useAuth();
    if (token && user) {
        if (user?.role == 'admin') {
            return <Navigate to="/dashboard" />;
        } else {
            return <Navigate to="/home" />;
        }
    }
    return <Outlet />;
};

export default NotAuthorizated;
