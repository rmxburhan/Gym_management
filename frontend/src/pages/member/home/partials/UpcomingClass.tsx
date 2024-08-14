import ClassCard from './ClassCard';

function UpcomingClass() {
    return (
        <div className="col-span-2">
            <h2 className="text-md font-semibold pb-2">Upcoming class</h2>
            <div className="flex flex-row flex-wrap gap-2">
                <ClassCard />
                <ClassCard />
            </div>
            {/* <div className="absolute top-0 right-0 bottom-0 flex flex-row items-center bg-gradient-to-r">
                    <div className="flex flex-col items-center">
                        <ChevronRightCircle size={20} />
                        <span className="text-xs">See more</span>
                    </div>
                </div> */}
        </div>
    );
}

export default UpcomingClass;
