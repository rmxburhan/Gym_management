import { cn } from '@/lib/utils';
import { FC } from 'react';

interface AvatarProps {
    imageUrl: string;
    className?: string;
}

const Avatar: FC<AvatarProps> = ({ imageUrl, className }) => {
    return (
        <div
            className={cn(
                'rounded-full border-2 ',
                className ? className : 'w-[50px] h-[50px]'
            )}
        >
            <img
                src={imageUrl}
                alt=""
                className="w-full h-full object-cover rounded-full"
            />
        </div>
    );
};

export default Avatar;
