import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Register = () => {
    const {createUser,updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate()
    const handleRegister =(event)=>{
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email =form.email.value;
        const password = form.password.value;
        console.log(name,photo,email,password)
        createUser(email,password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser)
            updateUserProfile(name,photo)
            .then(()=>{
                console.log('user profile info updated')
                form.reset()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'user update properly successfully',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/');
            })
            .catch(error=>console.log(error))
            
        })
        .catch(error=>console.error(error))
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left w-1/2">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card  w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Enter Your Name :" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">photo url</span>
                            </label>
                            <input type="text" name="photo" placeholder="Enter Your Photo URL" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name="email" placeholder="choose your email :" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" name="password" placeholder="enter your password :" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>

                        </div>
                        <div className="form-control mt-6">
                         
                            <input className="btn btn-primary" type="submit" value="Register" />
                        </div>
                        <p>Already Have An Account ? Please <Link to="/login"> Login</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;