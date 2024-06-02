import React, { useState, useContext } from 'react';
import UserServices from '../services/userService';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { TokenContext } from '../globalState/tokenProvider'
import { RiLoginBoxLine } from "react-icons/ri";
import { FaVirusCovidSlash } from "react-icons/fa6";
const Login = () => {
    const context = useContext(TokenContext)
    const notifyErrorVar = (error) => toast.error(`ERROR: ${error} `);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginHandle = async () => {
            try {
                let responseUser = await UserServices.login({ user_name: username, password })
                if (typeof (responseUser.data.result) == 'string') {
                    notifyErrorVar(responseUser.data.result);
                } else if (responseUser.data.result.name) {
                    context.loginSuccess(responseUser.data.result)
                    navigate("/dashboard");
                }
                console.log({ responseUser: responseUser })
            } catch (error) {
                notifyErrorVar('Backend Server Down');
            }
        };
        loginHandle();

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-100 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer position="top-center" />
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900  flex items-center"><FaVirusCovidSlash size='2rem' className="mr-1" />XIDS Management DBK</h2>
                </div>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Password"
                            />
                        </div>
                        <div className="flex items-center justify-between">

                            <button
                                type="submit"
                                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Log in<RiLoginBoxLine className="ml-1" size="1.4rem" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
