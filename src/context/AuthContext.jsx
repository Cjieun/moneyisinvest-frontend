import {createContext, useState, useEffect} from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setIsLoggedIn(token !== null);
    }, []);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        sessionStorage.clear();
        setIsLoggedIn(false);
    };

    return(
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };