import { FC } from 'react';

type ChartProps = {
    tag: string;
};

const Chart: FC<ChartProps> = ({ tag }) => {
    return (
        <div>
            <canvas id={tag}></canvas>
        </div>
    );
};

export default Chart;
