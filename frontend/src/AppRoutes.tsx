import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
function AppContent() {
    const navigate = useNavigate();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login navigate={navigate} />} />
            <Route path="/signup" element={<Signup navigate={navigate} />} />
            <Route element={<ProtectedRoute allowedRoles={['user']} />}>
                <Route path="/user" element={<User />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<Admin />} />
            </Route>
        </Routes>
    );
}

export default AppContent;
