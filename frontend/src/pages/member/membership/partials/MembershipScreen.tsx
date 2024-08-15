import useAuth from '@/context/Auth';

const MembershipScreen = () => {
    const { user } = useAuth();

    return (
        <div className="px-4 pt-4">
            <div className="bg-amber-500 p-2 rounded border border-amber-600 text-black flex gap-2 overflow-hidden">
                <img
                    className="border-0 w-[100px] h-[120px] bg-gray-50 object-cover rounded"
                    src={`http://localhost:5000/${user?.profile}`}
                />
                <div className="flex-grow flex flex-col justify-between">
                    <p className="text-lg font-bold">{user?.name}</p>
                    <div>
                        <p className="text-sm font-medium">Registered: </p>
                        <p className="text-sm font-medium">Expired: </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembershipScreen;
