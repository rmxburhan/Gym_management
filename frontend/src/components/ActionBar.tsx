import { ChevronLeft } from 'lucide-react';
import React from 'react';

const ActionBar: React.FC<{
    backButton?: boolean;
    logo?: boolean;
    title?: string;
}> = ({ backButton = false, logo = false, title }) => {
    return (
        <div className="h-16 border-b flex items-center px-3 bg-white sticky top-0 z-20 gap-4">
            {backButton && (
                <div
                    className="hover:bg-gray-200 p-1 rounded-full"
                    onClick={() => history.back()}
                >
                    <ChevronLeft />
                </div>
            )}
            {logo && (
                <p className="text-lg font-semibold w-full text-center">
                    MA'GYM
                </p>
            )}
            {title && <p className="text-lg font-semibold">{title}</p>}
        </div>
    );
};

export default ActionBar;
