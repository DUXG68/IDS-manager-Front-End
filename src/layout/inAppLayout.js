import { Outlet } from 'react-router-dom'
import Navigation from '../component/navigation';
import React from 'react';
function InApp() {

    return (
        <div className="flex">
            <div className="fixed ">
                <Navigation />
            </div>
            <div className="w-full ml-[200px] ">
                <Outlet />
            </div>

        </div>
    )
}
export default InApp;