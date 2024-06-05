import React, { useState, useContext } from 'react';
import UserServices from '../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { TokenContext } from '../globalState/tokenProvider'

const UserProfile = () => {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const notifySuccessVar = (success) => { toast.success(`${success}`) };
  const notifyErrorVar = (error) => toast.error(`ERROR: ${error} `);
  const context = useContext(TokenContext)
  const [name, setName] = useState(sessionStorage.getItem('name'));
  const user_id = parseInt(sessionStorage.getItem('user_id'))
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [messagePass, setMessagePass] = useState('');
  const [messageName, setMessageName] = useState('');

  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/;
  const nameRegex = /^[a-zA-Z0-9\s]{5,}$/


  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const updateName = async () => {
      try {
        context.changeName(name)
        await UserServices.updateInfo({ user_id: user_id, name: name }, token)
        notifySuccessVar("Update Success")
      } catch (error) {
        setMessageName('Can not connect to server or wrong token');
      }
    };
    if (nameRegex.test(name)) {
      updateName()
      setMessageName('');
    } else {
      setMessageName('Name only have a-z, A-Z, 0-9 and greater than 5 characters');
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessagePass('New password and confirm password must match.');
      return;
    }
    const changePass = async () => {
      try {
        const response = await UserServices.changPass({ user_id: user_id, password: currentPassword, password_new: newPassword }, token)
        console.log({ response: response })
        if (response.data.result === "update password success") {
          setMessagePass("")
          setCurrentPassword("")
          setConfirmNewPassword("")
          setNewPassword("")
          notifySuccessVar("Change Password Success")

        } else if (response.data.result === "Block user") {
          notifyErrorVar("Account has been locked")
          context.logoutSuccess()
        } else {
          setMessagePass("Password wrong")
        }
      } catch (error) {
        setMessagePass('Can not connect to server or wrong token');
      }
    }

    if (passRegex.test(newPassword)) {

      changePass()
    } else {
      setMessagePass("Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be more than 8 characters long.")
    }
  };

  return (
    <div className="w-full">
      <ToastContainer position="top-center" />
      <div className="flex items-center justify-between  py-[12px] ">
        <h1 className="text-2xl font-bold m-4">User Profile</h1>
      </div>

      <form className="bg-white    w-full mb-4  border border-gray-400 p-4" onSubmit={handleUpdateProfile}>
        <h2 className="text-xl font-semibold mb-3">Personal information</h2>
        <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Name</label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full px-4 py-3 mb-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-700 mt-2"
        >
          Update Name
        </button>
        {messageName && <p className="text-red-500 mt-4">{messageName}</p>}
      </form>
      <form className="bg-white    w-full  p-4" onSubmit={handleChangePassword}>
        <h2 className="text-2xl font-semibold mb-3">Change the password</h2>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
        <input
          type="password"
          id="currentPassword"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
          className="w-full px-4 py-3 mb-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          required
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-full px-4 py-3 mb-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
        <input
          type="password"
          id="confirmNewPassword"
          value={confirmNewPassword}
          required
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="Confirm New Password"
          className="w-full px-4 py-3 mb-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-2 bg-blue-500 text-white py-3 rounded hover:bg-blue-700 mt-2"
        >
          Update password
        </button>
        {messagePass && <p className="text-red-500 mt-4">{messagePass}</p>}
      </form>
    </div>
  );
};

export default UserProfile;
