import useHide from '@/context/SideBarState';
import NotificationItem from '../../components/NotificationItem';
import { useEffect } from 'react';

const item = [
    'lorem ipsum todor sit amet',
    'sebuah game yang bisa',
    'Asdasdsdsad',
    'Asdsadasdasdhsahdadbsaj sahd hsd sahdvsajjhdsad saadbashdb ashdb asdjhs dsadb ',
];
const Notifications = () => {
    const { setActiveSideBar } = useHide();

    useEffect(() => setActiveSideBar('/dashboard/notifications'), []);
    return (
        <div className="px-4 pt-4">
            <h1 className="text-3xl font-bold text-black mb-4">
                Notifications
            </h1>
            <div className="bg-white rounded-lg">
                {item.map((data) => (
                    <NotificationItem key={data} text={data} />
                ))}
            </div>
        </div>
    );
};

export default Notifications;
