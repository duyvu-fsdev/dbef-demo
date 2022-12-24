import {
    confirmPasswordReset,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    FacebookAuthProvider,
    deleteUser,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utils/Auth/firebase/firebaseConfig';

const AuthContext = createContext({
    uid: null,
    currentUser: null,
    login: () => Promise,
    logout: () => Promise,
    register: () => Promise,
    resetPassword: () => Promise,
    forgotPassword: () => Promise,
    signInWithGoogle: () => Promise,
    signInWithFaceBook: () => Promise,
    deleteAccont: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    let uid;
    if (currentUser) uid = currentUser.uid;
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user ? user : null);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        // console.log('The user is', currentUser);
    }, [currentUser]);

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function register(email, password, name) {
        return createUserWithEmailAndPassword(auth, email, password, name);
    }

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    function resetPassword(oobCode, newPassword) {
        return confirmPasswordReset(auth, oobCode, newPassword);
    }

    function logout() {
        return signOut(auth);
    }

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    function signInWithFaceBook() {
        const provider = new FacebookAuthProvider();
        return signInWithPopup(auth, provider);
    }

    function deleteAccont() {
        return deleteUser(auth.currentUser);
    }

    const value = {
        uid,
        currentUser,
        signInWithFaceBook,
        signInWithGoogle,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        deleteAccont,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
