function CommunityCard() {
    return (
        <div className="border rounded-md p-4">
            <p className="text-sm font-semibold">A title</p>
            <p className="text-xs mb-4">{'Lorem isum todor sit amet'}</p>
            <p className="text-xs font-semibold">
                {new Date().toLocaleDateString('id-ID', {
                    dateStyle: 'full',
                })}
            </p>
        </div>
    );
}

export default CommunityCard;
