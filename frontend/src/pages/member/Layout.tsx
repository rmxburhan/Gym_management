import NavBar from '@/components/NavBar';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
const Layout = () => {
    useEffect(() => {
        console.log('asd');
    }, []);
    return (
        <div className="flex flex-col h-[100vh] bg-gray-50">
            <div className="px-4 max-w-[800px] flex-grow mx-auto w-full ">
                <Outlet />
            </div>
            <NavBar />
        </div>
    );
};

export default Layout;
