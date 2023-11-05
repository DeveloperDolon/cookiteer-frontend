import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import app from "../firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const mainUrl = "http://localhost:5000";

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginWithEmailAndPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if(currentUser) {
                setUser(currentUser);

                axios.post(`${mainUrl}/api/v1/jwt`, {user: currentUser?.email}, 
                {withCredentials: true}
                ).then(res => console.log(res.data))
                .catch(err => console.log(err))

                setLoading(false);
            }
        });

        return () => {
            unSubscribe();
        }
    }, [])

    const contextData = {
        setUser,
        createUser,
        loading,
        user,
        loginWithEmailAndPassword,
        logOut,
        mainUrl
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}