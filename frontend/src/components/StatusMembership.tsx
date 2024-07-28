import React from 'react';

let style: Map = {
    Nonactive: 'border-red-600 text-red-600',
    Expired: 'border-yellow-600 text-yellow-600',
    Active: 'border-green-600 text-green-600',
};
interface Map {
    [key: string]: string | undefined;
}

const StatusMembership: React.FC<{ text: string }> = ({ text }) => {
    let myStyle = style[text];
    return (
        <span className={'px-2 py-1 border rounded ' + myStyle}>{text}</span>
    );
};

export default StatusMembership;
