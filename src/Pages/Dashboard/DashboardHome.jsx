import React from 'react';
import useUserRole from '../../hooks/useUserRole';
import StudentdHome from './Student/StudentHome';

const DashboardHome = () => {
    const {role}=useUserRole()
    if(role==="student"){
        return <StudentdHome/>
    }
    return (
        <div>
            
        </div>
    );
};

export default DashboardHome;