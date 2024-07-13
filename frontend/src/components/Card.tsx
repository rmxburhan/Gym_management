import { LucideIcon } from 'lucide-react';

interface CardProps {
    title: string;
    description: string;
    Icon: LucideIcon;
    alert?: boolean;
    active?: boolean;
    children?: React.ReactNode;
}

// Define the component
export const Card: React.FC<CardProps> = ({
    title,
    description,
    Icon,
    alert,
    active,
    children,
}) => {
    return (
        <div
            className={`border rounded-lg p-6 transition-all ${
                active
                    ? 'border-indigo-500 bg-indigo-100'
                    : 'border-gray-300 bg-white'
            } shadow-lg hover:shadow-xl`}
        >
            <div className="flex items-center mb-4">
                <Icon className="text-indigo-500 w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold text-indigo-800">
                    {title}
                </h3>
                {alert && <span className="ml-2 text-red-500">*</span>}
            </div>
            <p className="text-gray-600">{description}</p>
            {children && <div className="mt-4">{children}</div>}
        </div>
    );
};
