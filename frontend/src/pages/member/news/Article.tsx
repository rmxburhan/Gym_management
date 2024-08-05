import Avatar from '@/components/Avatar';

function Article() {
    return (
        <div className="bg-white rounded border flex flex-row">
            <div className="flex flex-col gap-2 p-2">
                <p className="text-sm font-semibold">Title</p>
                <p className="text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    rem totam ut atque?
                </p>
                <div className="flex flex-row gap-2">
                    <Avatar
                        className="w-[35px] h-[35px]"
                        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBcQZBSZc9nMbrcz-_s-WYFaWRiuI-qMxCXQ&s"
                    />
                    <div>
                        <p className="text-xs">This is me a writer</p>
                        <p className="text-xs text-muted-foreground italic">
                            20 Januari 2024 12:12
                        </p>
                    </div>
                </div>
            </div>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBcQZBSZc9nMbrcz-_s-WYFaWRiuI-qMxCXQ&s"
                className="object-cover max-w-[30%]"
            />
        </div>
    );
}

export default Article;
