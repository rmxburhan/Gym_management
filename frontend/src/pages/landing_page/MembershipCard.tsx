function MembershipCard() {
    return (
        <div className="rounded p-8 border-[1px] border-[#333] h-[100%] w-[300px] text-center align-middle ">
            <h1 className="font-bold text-xl mb-4">Membership name</h1>
            <div className="membership-price mb-4">
                <span id="price-tag" className="text-4xl">
                    $9.00
                </span>
            </div>
            <div className="flex flex-col my-8">
                <span>asdsad</span>
                <span>asdsad</span>
                <span>asdsad</span>
                <span>asdsad</span>
            </div>
            <button className="px-[16px] py-[8px] bg-black text-white rounded">
                Choose packet
            </button>
        </div>
    );
}

export default MembershipCard;
