import CommunityCard from './CommunityCard';

function Community() {
    return (
        <div className="">
            <p className="text-md font-semibold mb-4">Announcements</p>
            <div id="announcements-container" className="grid gap-4">
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
