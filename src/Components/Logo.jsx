import React from 'react';
import logo from '../assets/logo.png';

const Logo = () => {
    return (
        <div className='h-11 flex items-center gap-1'>
            <img src={logo} className='h-12' />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Edu<span className='text-[#02caf8]'>Nest</span> </h1>
        </div>
    );
};

export default Logo;