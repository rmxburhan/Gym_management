import NavBar from '@/components/NavBar';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
const Layout = () => {
    useEffect(() => {
        console.log('asd');
    }, []);
    return (
        <div className="flex flex-col h-[100vh]">
            <div className="flex-grow">
                <Outlet />
            </div>
            <NavBar />
        </div>
    );
};

export default Layout;
