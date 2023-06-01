
import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const handleGoogleSignIn = () => {
        const from = location.state?.from?.pathname || "/"
        googleSignIn()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                const saveUser = {name:loggedUser.displayName , email:loggedUser.email}
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(saveUser)

                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true })
                    })


                // navigate(from,{replace:true})
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <div className="divider"> </div>

            <div className='w-full text-center my-4'>
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline"> <FaGoogle></FaGoogle></button>
            </div>

        </div>
    );
};

export default SocialLogin;