import { createContext } from "react";
import PropTypes from "prop-types";
import app from "../firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const auth = getAuth(app);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const contextData = {
        createUser
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