import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Member from './pages/dashboard/members/page';
import NoMatch from './components/NoMatch';
import ClassPage from './pages/dashboard/classes/page';
import Equipments from './pages/dashboard/equipments/page';
import Notifications from './pages/dashboard/Notifications';
import AttendancesPage from './pages/dashboard/attendances/page';
import Login from './pages/auth/Login';
import Register from './pages/auth/register/page';
import Membership from './pages/dashboard/membership/page';
import CreateClass from './pages/dashboard/classes/create';
import CreateMembership from './pages/dashboard/membership/create';
import Trainer from './pages/dashboard/trainers/page.';
import CreateTrainer from './pages/dashboard/trainers/create';
import CreateMember from './pages/dashboard/members/create';
import CreateEquipment from './pages/dashboard/equipments/create';
import Authorization from './pages/auth/Authorization';
import NotAuthorizated from './pages/auth/NotAuthorizated';
import Logout from './pages/auth/Logout';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route element={<NotAuthorizated />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route element={<Authorization role="admin" />}>
                        <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route path="" element={<Dashboard />} />
                            <Route
                                path="attendances"
                                element={<AttendancesPage />}
                            />
                            <Route path="members">
                                <Route path="" element={<Member />} />
                                <Route path=":id" element={<CreateMember />} />
                                <Route
                                    path="create"
                                    element={<CreateMember />}
                                />
                            </Route>
                            <Route path="memberships">
                                <Route path="" element={<Membership />} />
                                <Route
                                    path=":id"
                                    element={<CreateMembership />}
                                />
                                <Route
                                    path="create"
                                    element={<CreateMembership />}
                                />
                            </Route>
                            <Route path="classes">
                                <Route path="" element={<ClassPage />} />
                                <Route path=":id" element={<CreateClass />} />
                                <Route
                                    path="create"
                                    element={<CreateClass />}
                                />
                            </Route>
                            <Route path="trainers">
                                <Route path="" element={<Trainer />} />
                                <Route path=":id" element={<CreateTrainer />} />
                                <Route
                                    path="create"
                                    element={<CreateTrainer />}
                                />
                            </Route>
                            <Route path="equipments">
                                <Route path="" element={<Equipments />} />
                                <Route
                                    path=":id"
                                    element={<CreateEquipment />}
                                />
                                <Route
                                    path="create"
                                    element={<CreateEquipment />}
                                />
                            </Route>
                            <Route
                                path="notifications"
                                element={<Notifications />}
                            />
                        </Route>
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
