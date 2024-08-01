import { ChevronLeft } from 'lucide-react';
import React from 'react';

const ActionBar: React.FC<{ backButton?: boolean; logo?: boolean }> = ({
    backButton = false,
    logo = false,
}) => {
    return (
        <div className="h-16 border-b mb-4 flex items-center px-3 bg-white sticky top-0 z-20">
            {backButton && (
                <div className="hover:bg-gray-200 p-1 rounded-full">
                    <ChevronLeft />
                </div>
            )}
            {logo && (
                <p className="text-lg font-semibold w-full text-center">
                    MA'GYM
                </p>
            )}
        </div>
    );
};

export default ActionBar;
