import React from 'react';
import useAuth from '../../hooks/useAuth';

const Home = () => {
    const {name}= useAuth()
    console.log(name);
    return (
        <div>
            home
        </div>
    );
};

export default Home;