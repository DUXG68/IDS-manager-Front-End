import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import { Fragment, React, useContext } from 'react';
import './App.css';
import Alert from './pages/Alert.js';
import Login from './pages/Login.js';
import InApp from './layout/inAppLayout.js'
import Error from './pages/Error.js';
import RulePage from "./pages/Rule"
import Agent from "./pages/Agent";
import User from './pages/User.js';
import UserProfile from './pages/UserProfile.js';
import { TokenContext } from './globalState/tokenProvider.js'
import Dashboard from './pages/Dashboard.js';
import RuleCreator from './pages/RuleCreator.js';
// import { useContext } from 'react'
// import { TokenContext} from "../globalState/tokenProvider"; các hàm global được truyền
// const context = useContext(TokenContext) đây là đối tượng context được dùng để lấy giá trị và gọi hàm

function App() {
  const context = useContext(TokenContext)
  var role
  if (sessionStorage.getItem('role')) {
    role = sessionStorage.getItem('role')
  } else {
    role = context.token.role
  }

  return (
    <div className="flex">
      <div className="w-full ">
        <Routes>
          <Route index element={<Login />} />
          {role === "admin" ?
            <Route path='/' element={<InApp />}>
              <Route path="dashboard/:type?" element={<Dashboard />} />
              <Route path="alert/:pageAlert?" element={<Alert />} />
              <Route path="rule/:indexAgent?" element={<RulePage />} />
              <Route path="ruleLab" element={<RuleCreator />} />
              <Route path="agent" element={<Agent />} />
              <Route path="user" element={<User />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>
            : <Fragment></Fragment>}

          {role === "viewer" ?
            <Route path='/' element={<InApp />}>
              <Route path="dashboard/:type?" element={<Dashboard />} />
              <Route path="ruleLab" element={<RuleCreator />} />
              <Route path="alert/:pageAlert?" element={<Alert />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>
            : <Fragment></Fragment>}

          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </div>

  );
}
export default App;


