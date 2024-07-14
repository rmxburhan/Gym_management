import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Member from './pages/dashboard/Member';
import Employee from './pages/dashboard/Employee';
import NoMatch from './components/NoMatch';
import Classes from './pages/dashboard/Classes';
import Equipments from './pages/dashboard/Equpiment';
import Notifications from './pages/dashboard/Notifications';
import Attendances from './pages/dashboard/Attendances';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Authorization from './pages/auth/Authorization';
function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<Authorization />}>
                        <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route path="" element={<Dashboard />} />
                            <Route
                                path="attendances"
                                element={<Attendances />}
                            />
                            <Route path="members" element={<Member />} />
                            <Route path="classes" element={<Classes />} />
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
