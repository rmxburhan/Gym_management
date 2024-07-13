import { FC } from 'react';

interface AvatarProps {
    imageUrl: string;
}

const Avatar: FC<AvatarProps> = ({ imageUrl }) => {
    return (
        <div className="rounded-full border-2 w-[60px] h-[60px]">
            <img
                src={imageUrl}
                alt=""
                className="w-full h-full object-cover rounded-full"
            />
        </div>
    );
};

export default Avatar;
