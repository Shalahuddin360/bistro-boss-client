import axios from "axios";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
const auth = getAuth(app)
export const AuthContext = createContext(null);
const googleAuthProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)
    const googleSignIn =()=>{
        setLoading(true)
       return signInWithPopup(auth,googleAuthProvider)
    }
    const signIn =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    //createUser
    const createUser =(email,password)=>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password)
    }
    //signOut
    const logOut =()=>{
        setLoading(true)
      return signOut(auth)
    }
    //update user profile
    const updateUserProfile=(name,photo)=>{
        setLoading(true)
        return updateProfile(auth.currentUser , {
            displayName : name , photoURL : photo

        })
    }
    useEffect(()=>{
     const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            console.log('current user',currentUser);
            //GET AND SAVE JWT or token
            if(currentUser){
                axios.post('https://bistro-boss-server-omega.vercel.app/jwt',{
                email:currentUser.email })
                .then(data=>{
                    // console.log(data)
                    console.log(data.data.token)
                    localStorage.setItem('access-token',data.data.token)
                    setLoading(false)

                })
            }
            else{
                localStorage.removeItem('access-token')
            }
            // setLoading(false)

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