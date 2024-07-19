import {
    CheckIcon,
    InfoIcon,
    MessageCircleWarningIcon,
    XCircleIcon,
} from 'lucide-react';
import { FC } from 'react';

export enum ToastType {
    SUCCESS,
    ERROR,
    WARNING,
    INFO,
}
const Toast: FC<{ type: ToastType; message: string }> = ({ type, message }) => {
    const toastStyle = [
        'bg-green-700 text-white',
        'bg-red-700 text-white',
        'bg-yellow-700 text-black',
        'bg-blue-600 text-white',
    ];

    const toastIcon = [
        <CheckIcon />,
        <XCircleIcon />,
        <MessageCircleWarningIcon />,
        <InfoIcon />,
    ];
    return (
        <div
            className={
                'fixed bottom-4 right-4 p-4 min-w-64 rounded flex flex-row items-center' +
                ` ${toastStyle[type]}`
            }
        >
            {toastIcon[type]}
            <p className="ms-2">{message}</p>
        </div>
    );
};

export default Toast;
