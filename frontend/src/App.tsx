import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Member from './pages/dashboard/members/page';
import Employee from './pages/dashboard/trainers/page.';
import NoMatch from './components/NoMatch';
import ClassPage from './pages/dashboard/classes/page';
import Equipments from './pages/dashboard/equipments/page';
import Notifications from './pages/dashboard/Notifications';
import AttendancesPage from './pages/dashboard/attendances/page';
import Login from './pages/auth/Login';
import Register from './pages/auth/register/page';
import Authorization from './pages/auth/Authorization';
import Membership from './pages/dashboard/membership/page';
function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route /*element={<Authorization role="admin" />}*/>
                        <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route path="" element={<Dashboard />} />
                            <Route
                                path="attendances"
                                element={<AttendancesPage />}
                            />
                            <Route path="members" element={<Member />} />
                            <Route
                                path="memberships"
                                element={<Membership />}
                            />
                            <Route path="classes" element={<ClassPage />} />
                            <Route path="employees" element={<Employee />} />
                            <Route path="equipments" element={<Equipments />} />
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
