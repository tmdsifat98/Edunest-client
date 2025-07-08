import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';

const Root = () => {
    return (
        <div>
            <nav>
            <Navbar/>
            </nav>
            <Outlet /> 
        </div>
    );
};

export default Root;