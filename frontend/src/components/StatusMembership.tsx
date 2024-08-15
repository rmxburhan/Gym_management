import { cn } from '@/lib/utils';
import React from 'react';

let style: Map = {
    Nonactive: 'bg-red-600 text-white',
    Expired: 'bg-yellow-600 text-white',
    Active: 'bg-green-600 text-white',
};
interface Map {
    [key: string]: string | undefined;
}

const StatusMembership: React.FC<{ text: string }> = ({ text }) => {
    let myStyle = style[text];
    return (
        <span className={cn('p-2 rounded font-medium', myStyle)}>{text}</span>
    );
};

export default StatusMembership;
