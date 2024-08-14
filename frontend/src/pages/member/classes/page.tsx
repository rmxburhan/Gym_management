import useHide from '@/context/SideBarState';
import { useEffect } from 'react';
import ClassCard from '../home/partials/ClassCard';

const ClassesPage = () => {
    const { setActiveSideBar } = useHide();
    useEffect(() => setActiveSideBar('/app/classes'), []);
    return (
        <div className="container">
            <h2 className="font-semibold">Upcoming Class</h2>
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
        </div>
    );
};

export default ClassesPage;
