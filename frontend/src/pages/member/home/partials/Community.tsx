import CommunityCard from './CommunityCard';

function Community() {
    return (
        <div>
            <p className="text-md font-bold mb-4">Announcements</p>
            <div className="grid gap-2">
                <CommunityCard />
                <CommunityCard />
                <CommunityCard />
                <CommunityCard />
                <CommunityCard />
            </div>
        </div>
    );
}

export default Community;
