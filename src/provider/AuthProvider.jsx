import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
const auth = getAuth(app)
export const AuthContext = createContext(null);
const googleAuthProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)
    const googleSignIn =()=>{
       return signInWithPopup(auth,googleAuthProvider)
    }
    const signIn =(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    //createUser
    const createUser =(email,password)=>{
       return createUserWithEmailAndPassword(auth,email,password)
    }
    //signOut
    const logOut =()=>{
       signOut(auth)
    }
    //update user profile
    const updateUserProfile=(name,photo)=>{
        return updateProfile(auth.currentUser , {
            displayName : name , photoURL : photo
        })
    }
    useEffect(()=>{
     const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            console.log('current user',currentUser);
            setLoading(false)

        })
        return ()=>{
            return unsubscribe()
        }

    },[])
    const authInfo ={
        user,
        loading,
        googleSignIn,
        signIn,
        createUser,
        updateUserProfile,
        logOut
    }
    return (
    <AuthContext.Provider value={authInfo}>
            {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;