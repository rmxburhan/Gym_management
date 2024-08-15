import ActionBar from '@/components/ActionBar';
import Avatar from '@/components/Avatar';
import { Button } from '@/components/ui/button';

const MyClassPage = () => {
    return (
        <div className="h-[100vh] bg-gray-50 max-w-[800px] w-full mx-auto">
            <ActionBar title="Registered Class" backButton />
            <div className="px-4 pt-4">
                <ClassCard />
                <ClassCard />
                <ClassCard />
            </div>
        </div>
    );
};

const ClassCard = () => {
    return (
        <div className="p-2 border border-black mb-4 bg-white">
            <p className="text-xl font-bold mb-2">This class title</p>
            <div className="flex gap-4 items-center">
                <Avatar imageUrl={`http://localhost:5000/${''}`} />
                <div>
                    <p className="font-semibold"></p>
                    <p className="text-sm">
                        Start at:{' '}
                        {new Date().toLocaleString('id-ID', {
                            dateStyle: 'long',
                            timeStyle: 'short',
                        })}
                    </p>
                </div>
            </div>
            <Button className="ms-auto w-full mt-2" variant="destructive">
                Cancel
            </Button>
        </div>
    );
};

export default MyClassPage;
