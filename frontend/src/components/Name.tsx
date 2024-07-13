import { FC } from 'react';
import Avatar from './Avatar';

type NameProps = {
    name: string;
    imageUrl: string;
};

const Name: FC<NameProps> = ({ name, imageUrl }) => {
    return (
        <div className="flex flex-row gap-4 items-center">
            <Avatar imageUrl={imageUrl} />
            {name}
        </div>
    );
};

export default Name;
