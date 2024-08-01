import ClassCard from './ClassCard';

function UpcomingClass() {
    return (
        <div>
            <h2 className="text-md font-semibold">
                Your upcoming class
                <span className="text-xs font-semibold text-blue-500 ms-2">
                    See more &#62;&#62;
                </span>
            </h2>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-2 pt-2">
                <ClassCard />
                <ClassCard />
            </div>
        </div>
    );
}

export default UpcomingClass;
