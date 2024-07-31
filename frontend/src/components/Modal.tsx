import { XIcon } from 'lucide-react';
import React from 'react';

interface props {
    children: any;
    onClose: () => void;
    isModalVisible: boolean;
    closeButton?: boolean;
}

const Modal: React.FC<props> = ({
    isModalVisible,
    onClose,
    children,
    closeButton = false,
}) => {
    if (!isModalVisible) {
        return null;
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div
                className={
                    'rounded-xl p-3 pb-4 bg-white border-2 flex flex-col max-h-[85%]'
                }
            >
                {closeButton ? (
                    <button
                        className="bg-red-800 text-red-100 p-1 rounded text-[12px] ms-auto"
                        onClick={onClose}
                    >
                        {' '}
                        <XIcon size={18} />
                    </button>
                ) : (
                    ''
                )}
                <div className="pt-4 o overflow-y-scroll">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
