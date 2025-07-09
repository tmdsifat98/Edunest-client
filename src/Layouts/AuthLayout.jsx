import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='dark:bg-gray-900'>
            <Outlet />
        </div>
    );
};

export default AuthLayout;