import { createContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const TokenContext = createContext()

function TokenProvider({ children }) {
    const [token, setToken] = useState({ role: "", name: "", token: "", user_id: "" })
    const navigate = useNavigate();
    const loginSuccess = (data) => {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('name', data.name);
        sessionStorage.setItem('role', data.role);
        sessionStorage.setItem('user_id', data.user_id);
        setToken({ role: data.role, name: data.name, token: data.token, user_id: data.user_id })
    }
    const logoutSuccess = () => {
        sessionStorage.clear();
        setToken({ role: "", name: "", token: "", user_id: "" })
        navigate("/")
    }
    const changeName = (name) => {
        sessionStorage.setItem('name', name);
        setToken(prevState => ({ ...prevState, name: name }))
    }

    const value = {
        token,
        loginSuccess,
        logoutSuccess,
        changeName
    }
    return (
        <TokenContext.Provider value={value}>
            {children}
        </TokenContext.Provider>
    )

}

export { TokenContext, TokenProvider }