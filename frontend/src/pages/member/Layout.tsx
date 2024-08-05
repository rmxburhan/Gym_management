import NavBar from '@/components/NavBar';
import { Outlet } from 'react-router';
const Layout = () => {
    return (
        <div className="bg-gray-50 flex flex-col">
            <Outlet />
            <NavBar />
        </div>
    );
};

export default Layout;
