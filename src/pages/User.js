import React, { useState, useEffect } from "react";
import UserForm from "../component/user_form";
import UserList from "../component/user_list";
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import UserServices from "../services/userService";

// const users = [
//     {
//         "user_id": 1,
//         "user_name": "analys",
//         "role": "admin",
//         "user_state": "Active",
//         "name": "analys SOC tier 1",
//         "count_try": 0
//     },
//     {
//         "user_id": 8,
//         "user_name": "analys2",
//         "role": "admin",
//         "user_state": "Active",
//         "name": "analys SOC",
//         "count_try": 0
//     },
//     {
//         "user_id": 10,
//         "user_name": "analys3",
//         "role": "admin",
//         "user_state": "Active",
//         "name": "analys",
//         "count_try": 10
//     },
//     {
//         "user_id": 11,
//         "user_name": "analys32",
//         "role": "admin",
//         "user_state": "Active",
//         "name": "analys",
//         "count_try": 0
//     },
//     {
//         "user_id": 19,
//         "user_name": "analys33",
//         "role": "admin",
//         "user_state": "Active",
//         "name": "analys hehe",
//         "count_try": 0
//     },
//     {
//         "user_id": 20,
//         "user_name": "analys3413",
//         "role": "admin",
//         "user_state": "Active",
//         "name": "analys  hehe",
//         "count_try": 0
//     },
//     {
//         "user_id": 25,
//         "user_name": "admin",
//         "role": "admin",
//         "user_state": "Active",
//         "name": "Admin User",
//         "count_try": 0
//     },
//     {
//         "user_id": 26,
//         "user_name": "user1",
//         "role": "viewer",
//         "user_state": "Active",
//         "name": "analys  hehe",
//         "count_try": 0
//     }
// ]


function User() {
    const notifySuccessVar = (success) => { toast.success(`${success}`) };
    const notifyErrorVar = (error) => toast.error(`ERROR: ${error} `);

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/;
    const usernameRegex = /^[a-zA-Z0-9]{5,}$/
    const nameRegex = /^[a-zA-Z0-9\s]{5,}$/

    const [users, setUsers] = useState([])
    const [showForm, setShowForm] = useState({ infoForm: "", show: false });
    const [contentForm, setContentForm] = useState({
        user_id: '',
        user_name: '',
        name: '',
        role: 'viewer',
        user_state: 'Block',
        count_try: 0,
        password: '',
        re_password: ''
    });

    const handleSubmitForm = (newUser, infoForm) => {
        if (!usernameRegex.test(newUser.user_name) || !nameRegex.test(newUser.name)) {
            notifyErrorVar("Information is not correct format");
        }
        else if (infoForm === "Add User") {
            const getUserID = async () => {
                try {
                    const responseGetUserID = await UserServices.createUser(newUser)
                    if (responseGetUserID.data.result.user_id) {
                        notifySuccessVar("Create User Success");
                        newUser = { ...newUser, user_id: responseGetUserID.data.result.user_id }
                        setUsers([...users, newUser]);
                        setShowForm({ infoForm: "", show: false });
                        setContentForm({
                            user_id: '',
                            user_name: '',
                            name: '',
                            role: 'viewer',
                            user_state: 'Block',
                            count_try: 0,
                            password: '',
                            re_password: ''
                        })
                    } else { notifyErrorVar("Username already exist") }
                } catch (error) {
                    notifyErrorVar(`Lỗi khi gọi API add user`)
                }
            };
            if (newUser.password !== newUser.re_password) {
                notifyErrorVar("Password and Confirmation Password must be the same");
            } else if (!passRegex.test(newUser.password)) {
                notifyErrorVar("Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be more than 8 characters long.");
            } else {
                getUserID()
            }
        } else if (infoForm === "Edit User") {
            const updateUser = async () => {
                try {
                    notifySuccessVar("Update User Success");
                    var info = {
                        role: newUser.role,
                        user_state: newUser.user_state,
                        name: newUser.name,
                        count_try: parseInt(newUser.count_try)
                    }
                    const updatedUsers = users.map(user => {
                        if (user.user_id === newUser.user_id) {
                            return { ...newUser };
                        }
                        return user;
                    });
                    setUsers(updatedUsers);
                    await UserServices.updateInfoUser(newUser.user_id, info)
                    setShowForm({ infoForm: "", show: false });
                    setContentForm({
                        user_id: '',
                        user_name: '',
                        name: '',
                        role: 'viewer',
                        user_state: 'Block',
                        count_try: 0,
                        password: '',
                        re_password: ''
                    })
                } catch (error) {
                    notifyErrorVar(`Lỗi khi gọi API update user`)
                }
            }
            updateUser();
        } else {
            const updatePass = async () => {
                try {
                    await UserServices.changePassUser(newUser.user_id, { password: newUser.password })
                    notifySuccessVar("Change Password Success");
                    setShowForm({ infoForm: "", show: false });
                    setContentForm({
                        user_id: '',
                        user_name: '',
                        name: '',
                        role: 'viewer',
                        user_state: 'Block',
                        count_try: 0,
                        password: '',
                        re_password: ''
                    })
                } catch (error) {
                    console.error(`Lỗi khi gọi API update pass: ${error}`);
                }
            }

            if (newUser.password !== newUser.re_password) {
                notifyErrorVar("Password and Confirmation Password must be the same");
            } else if (!passRegex.test(newUser.password)) {
                notifyErrorVar("Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be more than 8 characters long.");
            } else {
                updatePass()
            }


        }
    };


    const handleDeleteUser = (user_id) => {
        confirmAlert({
            customUI: ({ onClose }) => (
                <div className="fixed inset-0 flex items-center justify-center overflow-auto z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <h1 className="text-xl font-bold mb-4">DELETE USER</h1>
                        <p className="text-gray-700 mb-4">Are you sure you want to delete user?</p>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={() => {
                                    const filteredUsers = users.filter(user => user.user_id !== user_id);
                                    setUsers(filteredUsers)
                                    const deleteUser = async (user_id) => {
                                        try {
                                            const resdelete = await UserServices.deleteUser(user_id)
                                            console.log({ resdelete: resdelete })
                                        } catch (error) {
                                            console.error('Lỗi khi gọi API: delete rule', error);
                                        }
                                    };
                                    deleteUser(user_id);
                                    onClose();
                                    notifySuccessVar("Delete User Success");
                                }}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                                onClick={onClose}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )
        });
    };

    const handleStateUser = (user_id, user_state) => {
        const updateState = async () => {
            try {
                user_state = user_state === "Block" ? "Active" : "Block";
                await UserServices.updateStateUser(user_id, { user_state: user_state })
                const updatedRules = users.map(user => {
                    if (user.user_id === user_id) {
                        return { ...user, user_state: user_state, count_try: 0 };
                    }
                    return user;
                });
                setUsers(updatedRules)
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        };
        updateState();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let responseAgent = await UserServices.getUsers()
                setUsers(responseAgent.data.result)
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        };

        fetchData();
    }, [])

    return (
        < >
            <ToastContainer position="top-center" />
            <div className="flex items-center justify-between border-b-2 py-2">
                <h1 className="text-2xl font-bold m-4">User Management</h1>
                <button
                    className="text-base bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded"
                    onClick={() => setShowForm({ infoForm: "Add User", show: true })}
                >
                    + Add User
                </button>
            </div>
            {showForm.show && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-1/4">
                        <UserForm setContentForm={setContentForm} infoForm={showForm.infoForm} contentForm={contentForm} onSubmit={handleSubmitForm}
                            onCancel={() => {
                                setShowForm({ ...showForm, show: false }); setContentForm({
                                    user_id: '',
                                    user_name: '',
                                    name: '',
                                    role: 'viewer',
                                    user_state: 'Block',
                                    count_try: 0,
                                    password: '',
                                    re_password: ''
                                })
                            }} />
                    </div></div>
            )
            }
            <UserList users={users} onDeleteUser={handleDeleteUser} onStateUser={handleStateUser} setShowForm={setShowForm} setContentForm={setContentForm} />
        </>
    );
}

export default User;