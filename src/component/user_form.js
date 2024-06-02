import React, { useState } from 'react';



const UserForm = ({ setContentForm, contentForm, infoForm, onSubmit, onCancel }) => {
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log({ name, value })
        setContentForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(contentForm, infoForm);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{infoForm}</h2>
            <form onSubmit={handleSubmit}>
                {(infoForm === "Add User") && (<>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                        <input type="text" name="user_name" required value={contentForm.user_name} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <input type="text" name="name" required value={contentForm.name} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
                        <select name="role" value={contentForm.role || "viewer"} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">State:</label>
                        <select name="user_state" value={contentForm.user_state || "Block"} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="Block">Block</option>
                            <option value="Active">Active</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input type="password" name="password" required value={contentForm.password} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
                        <input type="password" name="re_password" required value={contentForm.re_password} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </>)}

                {(infoForm === "Edit User") && (<>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-1xl font-bold mb-2">Username:</label>
                        <input type="text" name="name" required readOnly value={contentForm.user_name} onChange={handleChange} className="border font-bold rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <input type="text" name="name" required value={contentForm.name} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
                        <select name="role" value={contentForm.role} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">State:</label>
                        <select name="user_state" value={contentForm.user_state} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="Block">Block</option>
                            <option value="Active">Active</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Count Try:</label>
                        <input type="number" name="count_try" required value={contentForm.count_try} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </>)}

                {(infoForm === "Change Password") && (<>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-1xl font-bold mb-2">Username:</label>
                        <input type="text" name="name" required readOnly value={contentForm.user_name} onChange={handleChange} className="border font-bold rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input type="password" name="password" required value={contentForm.password} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
                        <input type="password" name="re_password" required value={contentForm.re_password} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </>)}

                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
