import { FC } from 'react';

type NotificationItemProps = {
    text: string;
};

const NotificationItem: FC<NotificationItemProps> = ({ text }) => {
    return (
        <div id="notification-item" className="border-b px-8 py-6">
            <p>{text}</p>
            <span className="text-gray-800 italic text-sm">
                Senin, 21 January 2022
            </span>
        </div>
    );
};

export default NotificationItem;
