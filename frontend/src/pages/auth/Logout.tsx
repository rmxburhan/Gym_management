import useAuth from '@/context/Auth';
import { useEffect } from 'react';
import { Navigate } from 'react-router';

function Logout() {
    const { logout } = useAuth();

    useEffect(() => {
        logout();
        console.log('logout');
    }, []);

    return <Navigate to="/login" />;
}

export default Logout;
