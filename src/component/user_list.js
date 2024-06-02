import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdLockReset } from "react-icons/md";
const UserList = ({ users, onDeleteUser, onStateUser, setContentForm, setShowForm }) => {
    return (
        <div className="">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th scope="col" className="px-3 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                            STT
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                            Username
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                            Role
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                            User State
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                            Count Try
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.user_id} className="hover:bg-gray-100 border-t border-gray-300">
                            <td className="p-2 text-base">{index + 1}</td>
                            <td className="p-2 text-base">{user.user_name}</td>
                            <td className="p-2 text-base">{user.name}</td>
                            <td className="p-2 text-base">{user.role}</td>
                            <td className={`p-2 text-base ${user.user_state === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                                {user.user_state}
                            </td>
                            <td className="p-2 text-base">{user.count_try}</td>

                            <td className="p-2 flex items-center">
                                <div className="flex space-x-2">
                                    <button
                                        className="flex items-center bg-blue-500 hover:bg-blue-700 text-white text-base font-bold py-1 px-2 rounded"
                                        onClick={() => {
                                            setContentForm(prevState => ({
                                                ...prevState,
                                                user_id: user.user_id,
                                                user_name: user.user_name,
                                                name: user.name,
                                                count_try: user.count_try,
                                                role: user.role,
                                                user_state: user.user_state,
                                                password: '',
                                                re_password: ''
                                            }));
                                            setShowForm({ infoForm: "Edit User", show: true });
                                        }}
                                    >
                                        < FaEdit className="mr-1" /> Edit
                                    </button>
                                    <button
                                        className="flex items-center bg-red-500 hover:bg-red-700 text-white text-base font-bold py-1 px-2 rounded"
                                        onClick={() => { onDeleteUser(user.user_id) }}
                                    >
                                        <MdDelete className="mr-1" /> Delete
                                    </button>
                                    <button
                                        className="flex items-center bg-gray-500 hover:bg-gray-700 text-white text-base font-bold py-1 ml-2 px-2 rounded"
                                        onClick={() => {
                                            setContentForm(prevState => ({
                                                ...prevState,
                                                user_id: user.user_id,
                                                user_name: user.user_name,
                                                name: user.name,
                                                password: '',
                                                re_password: ''
                                            }));
                                            setShowForm({ infoForm: "Change Password", show: true });
                                        }}
                                    >
                                        <MdLockReset className="mr-1" /> Change Pass
                                    </button>
                                    <button
                                        className={`text-white text-base font-bold py-1 px-2 rounded ml-2  ${user.user_state === 'Block' ? 'bg-green-500 hover:bg-green-700' : 'bg-orange-500 hover:bg-orange-700'}`}
                                        onClick={() => onStateUser(user.user_id, user.user_state)}
                                    >
                                        {user.user_state === 'Active' ? 'Block' : 'Active'}
                                    </button>
                                </div>


                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;

