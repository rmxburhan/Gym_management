import NotificationItem from '../../components/NotificationItem';

const item = [
    'lorem ipsum todor sit amet',
    'sebuah game yang bisa',
    'Asdasdsdsad',
    'Asdsadasdasdhsahdadbsaj sahd hsd sahdvsajjhdsad saadbashdb ashdb asdjhs dsadb ',
];
const Notifications = () => {
    return (
        <>
            <h2 className="text-4xl font-bold text-black mb-8">
                Notifications
            </h2>
            <div className="bg-white rounded-lg">
                {item.map((data) => (
                    <NotificationItem key={data} text={data} />
                ))}
            </div>
        </>
    );
};

export default Notifications;
