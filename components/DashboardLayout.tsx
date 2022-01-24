import React from 'react';
import Navbar from "./Navbar";

const DashboardLayout: React.FC = ({ children}) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default DashboardLayout;