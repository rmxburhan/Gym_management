const FaciilitiesCard = () => {
    return (
        <div className="card">
            <div className="border-[3px] border-[#333] h-[300px] overflow-hidden rounded-md flex flex-col relative text-white">
                <img
                    src="http://localhost:5173/src/assets/images/hamburger.jpg"
                    className="object-cover absolute top-0 left-0 w-[100%] h-[100%]"
                />
                <div className="card-overlay absolute z-1 w-[100%] h-[100%]"></div>
                <div className="card-body z-2 absolute top-0 left-0 flex flex-col p-8 w-[100%] h-[100%]">
                    <h4 className="mb-auto font-bold text-4xl">Title</h4>
                    <span className="font-semibold text-2xl">Body</span>
                </div>
            </div>
        </div>
    );
};

export default FaciilitiesCard;
