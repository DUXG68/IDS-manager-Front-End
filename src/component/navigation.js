import { React, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TokenContext } from '../globalState/tokenProvider'
import { TbLogout } from "react-icons/tb";
import { AiTwotoneAlert } from "react-icons/ai";
import { MdRule } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaUserCog, FaUser } from "react-icons/fa";
import { FaVirusCovidSlash } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiArchiveResearch } from "react-icons/gi";
const Navigation = () => {
    const context = useContext(TokenContext);
    let name = sessionStorage.getItem('name');
    let role = sessionStorage.getItem('role');
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        context.logoutSuccess();
        navigate("/")
    };
    return (
        <div className="flex flex-col h-screen bg-gray-800 text-white w-[200px]">

            <div className=" border-gray-500 ">
                <h1 className=" p-4 text-xl font-bold text-center text-red-700 bg-yellow-500 boder-b-0 py-[28px] flex items-center "> <FaVirusCovidSlash size='2rem' className="mr-1" />XIDS DBK</h1>
            </div>
            <nav className="flex-grow overflow-y-auto">
                <ul className="">
                    <li>
                        <NavLink to="/dashboard" activeclassname="active" className=" py-3 px-6 text-sm font-semibold  hover:bg-gray-700 flex items-center"><LuLayoutDashboard size='1.2rem' className="mr-1" /> Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/alert/" activeclassname="active" className=" py-3 px-6 text-sm font-semibold  hover:bg-gray-700 flex items-center"><AiTwotoneAlert size='1.2rem' className="mr-1" /> Alert</NavLink>
                    </li>
                    {role === "admin" ?
                        <>
                            <li>
                                <NavLink to="/rule" activeclassname="active" className=" py-3 px-6 text-sm font-semibold   hover:bg-gray-700 flex items-center"><MdRule size='1.2rem' className="mr-1" /> Rule</NavLink>
                            </li>
                            <li>
                                <NavLink to="/ruleLab" activeclassname="active" className=" py-3 px-6 text-sm font-semibold   hover:bg-gray-700 flex items-center"><GiArchiveResearch size='1.2rem' className="mr-1" /> Rule Tool Kit</NavLink>
                            </li>
                            <li>
                                <NavLink to="/agent" activeclassname="active" className=" py-3 px-6 text-sm font-semibold   hover:bg-gray-700 flex items-center"><RiCustomerService2Fill size='1.2rem' className="mr-1" />Agent</NavLink>
                            </li>
                            <li>
                                <NavLink to="/user" activeclassname="active" className=" py-3 px-6 text-sm font-semibold   hover:bg-gray-700 flex items-center"><FaUserCog size='1.2rem' className="mr-1" />User</NavLink>
                            </li></>
                        : <></>}

                </ul>
            </nav>
            <NavLink to="/profile" activeclassname="active" className=" py-3 px-6 text-xl font-semibold   hover:bg-gray-700 flex items-center"><FaUser size='1.4rem' className="mr-1" />{name}</NavLink>
            <div className="p-4 border-t border-gray-700 ">
                <button
                    className="w-50% mx-auto flex text-center py-3 px-6 text-sm  rounded-full bg-red-500 hover:bg-red-700 text-white font-bold"
                    onClick={handleLogout}
                >
                    Log out <TbLogout className="ml-2" size="1.5rem" />
                </button>

            </div>

        </div>

    );
};

export default Navigation;
