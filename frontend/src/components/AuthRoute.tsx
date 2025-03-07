import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/app/store';
import { useSelector } from 'react-redux';

const AuthRoute: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (user) {
        return <Navigate to={'/'} />;
    } else {
        return <Outlet />;
    }
};

export default AuthRoute;
