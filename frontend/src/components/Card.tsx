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
            className={`border rounded-xl p-6 transition-all ${
                active ? 'border bg-slate-950' : 'border-gray-300 bg-white'
            } overflow-hidden`}
        >
            <div className="flex items-center mb-2">
                <Icon className="text-black w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold text-black">{title}</h3>
                {alert && <span className="ml-2 text-red-500">*</span>}
            </div>
            <p className="text-gray-600">{description}</p>
            {children && <div className="mt-4">{children}</div>}
        </div>
    );
};
