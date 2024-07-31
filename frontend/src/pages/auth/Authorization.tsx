import { FC } from 'react';
import useAuth from '../../context/Auth';
import { Navigate, Outlet } from 'react-router';
import ForbiddenPage from '@/components/ui/forbidden-page';
const Authorization: FC<{ role: string }> = ({ role }) => {
    const { token, user } = useAuth();

    const tokenData = token || localStorage.getItem('token');

    if (!tokenData) {
        return <Navigate to="/login" replace />;
    } else {
        if (user?.role !== role) {
            return <ForbiddenPage />;
        }
        return <Outlet />;
    }
};

export default Authorization;
