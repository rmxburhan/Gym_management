const HomeNavbar = () => {
    return (
        <nav className="flex flex-row justify-around p-6 items-center fixed w-[100%] text-white">
            <span className="">Halo</span>
            <ul className="list-none flex flex-row gap-8 me-4">
                <li>
                    <a href="#">Home</a>
                </li>

                <li>
                    <a href="#">Facilities</a>
                </li>
                <li>
                    <a href="#">Membership</a>
                </li>

                <li>
                    <a href="#">Review</a>
                </li>
                <li>
                    <a href="#">Gallery</a>
                </li>

                <li>
                    <a href="#">Customer Help</a>
                </li>
            </ul>
            <a href="/register">
                <button className="bg-[#94ff08] rounded text-black font-bold">
                    Join now
                </button>
            </a>
        </nav>
    );
};

export default HomeNavbar;
