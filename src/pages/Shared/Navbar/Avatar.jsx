
import { useContext } from "react";
import avatarImg from "../../../assets/person.jpg";
import { AuthContext } from '../../../provider/AuthProvider';

const Avatar = () => {
    const {user} = useContext(AuthContext);
    
    
    return (
        <div>
            <img className='rounded-full' 
            src={user && user.photoURL ? user.photoURL: avatarImg} 
            height="40" 
            width="40"
            alt="" />
        </div>
    );
};

export default Avatar;