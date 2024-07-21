import { useNavigate } from 'react-router';
import FaciilitiesCard from './landing_page/FaciilitiesCard';
import HomeNavbar from './landing_page/HomeNavbar';
import MembershipCard from './landing_page/MembershipCard';
import './Home.css';
const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <HomeNavbar />
            <main>
                <div className="hamburger h-[100vh] w-[100vw] flex items-center justify-center">
                    <div className="hamburger-content text-center text-white flex flex-col ms-auto me-auto">
                        <h1 className="text-8xl mb-16  font-bold">Gym XYZ</h1>

                        <div className="cta-group flex flex-row items-center gap-8 justify-center">
                            <button
                                className="primary ps-[32px] pe-[32px] pt-[16px] pb-[16px] rounded text-black font-bold"
                                onClick={() => navigate('/register')}
                            >
                                Join now
                            </button>
                            <button className="secondary ps-[32px] pe-[32px] pt-[16px] pb-[16px] rounded font-bold">
                                Contact us
                            </button>
                        </div>
                    </div>
                </div>
                <div id="facilities" className="px-[15%] py-[4rem]">
                    <h4 className="text-4xl font-bold mb-8">Facilitiess</h4>
                    <div className="grid gap-8 grid-cols-3 grid-rows-2">
                        <FaciilitiesCard />
                        <FaciilitiesCard />
                        <FaciilitiesCard />
                        <FaciilitiesCard />
                        <FaciilitiesCard />
                        <FaciilitiesCard />
                    </div>
                </div>

                <div id="membershio" className="px-[15%] pb-[4rem]">
                    <h4 className="text-4xl font-bold mb-16">Memberships</h4>
                    <div className="flex flex-row justify-center gap-8">
                        <MembershipCard />
                        <MembershipCard />
                        <MembershipCard />
                    </div>
                </div>
                <div id="customer-service" className="px-[30%] py-[4rem]">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-4xl font-bold  text-center">
                            Gym Book
                        </h2>
                        <span className="text-center">
                            Get full guid pdf about our gym
                        </span>
                        <form action="" method="POST" className="p-8">
                            <div className="flex flex-col">
                                <label htmlFor="name" className="mb-4">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="mb-4 p-2 rounded"
                                />
                                <label htmlFor="email" className="mb-4">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="mb-4 p-2 rounded"
                                />
                            </div>
                            <button className="bg-black text-white rounded px-8 py-4">
                                Send me book
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
