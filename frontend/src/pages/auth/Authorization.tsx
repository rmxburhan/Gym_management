import { FC } from 'react';
import useAuth from '../../components/context/Auth';
import { Navigate, Outlet } from 'react-router';
const Authorization: FC<{ role: string }> = ({ role }) => {
    const { token, user } = useAuth();

    const tokenData = token || localStorage.getItem('token');

    if (!tokenData || user?.role !== role) {
        return <Navigate to="/login" replace />;
    } else {
        return <Outlet />;
    }
};

export default Authorization;
