import { FC } from 'react';
import useAuth from '../../components/context/Auth';
import { Navigate, Outlet } from 'react-router';
const Authorization: FC = () => {
    const { token } = useAuth();
    console.log('token', token);
    const tokenData = token || localStorage.getItem('token');
    console.log('tokenData', tokenData == null);
    if (tokenData == null) {
        console.log('as1u');
        return <Navigate to="/login" replace />;
    } else {
        console.log('asu');
        return <Outlet />;
    }
};

export default Authorization;
