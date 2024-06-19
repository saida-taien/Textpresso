import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
const auth = getAuth(app);
export const AuthContext = createContext(null);
import PropTypes from 'prop-types';
import axios from "axios";
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //create User

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //user Sign in
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    //user sign out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    //update user profile
    const updateUserProfile = (updatedUser) => {
        setUser(updatedUser);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            setUser(currentUser);
           
            setLoading(false);
            
            if (currentUser) {
                axios.post('https://textpresso-server.vercel.app/jwt', loggedUser, { withCredentials: true })
                    .then(() => { })
            }
            else {
                axios.post('https://textpresso-server.vercel.app/logout', loggedUser, {
                    withCredentials: true
                })
                    .then(() => {
                    })
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [])


    const authInfo = {
        user, loading, createUser, signInUser, logOut, updateUserProfile, setUser, auth
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider;