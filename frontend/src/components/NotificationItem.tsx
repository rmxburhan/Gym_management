import { FC } from 'react';

type NotificationItemProps = {
    text: string;
};

const NotificationItem: FC<NotificationItemProps> = ({ text }) => {
    return (
        <div id="notification-item" className="border-b px-4 py-3">
            <p className="text-sm font-medium">{text}</p>
            <span className="text-gray-800 italic text-xs">
                Senin, 21 January 2022
            </span>
        </div>
    );
};

export default NotificationItem;
