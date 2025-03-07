import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/app/store';
import { useSelector } from 'react-redux';

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return user.role === 'admin' ? <Navigate to="/admin" replace /> : <Navigate to="/user" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
