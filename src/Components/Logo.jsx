import React from 'react';
import logo from '../assets/logo.png';

const Logo = () => {
    return (
        <div className='h-12 flex items-center gap-2'>
            <img src={logo} className='h-12' />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">EduNest</h1>
        </div>
    );
};

export default Logo;