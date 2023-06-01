
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import { Link } from "react-router-dom";

const SignUp = () => {
    const { register, handleSubmit, reset,  formState: { errors } } = useForm();
    const {createUser ,updateUserProfile} = useContext(AuthContext)
    const onSubmit = data => {
        // console.log(data)                       //data is a object
        createUser(data.email,data.password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser)

            updateUserProfile(data.name,data.photoURL)  //return kore .then(res) er madhome bujte partesi 
            .then(()=>{
                // console.log('user profile info updated') database users save 
                const saveUser = {name : data.name,email:data.email}
                console.log(saveUser)
                fetch('http://localhost:5000/users',{
                    method : 'POST',
                    headers : {
                        "content-type" : "application/json"
                    },
                    body:JSON.stringify(saveUser)

                })
                .then(res=>res.json())
                .then(data=>{
                    if(data.insertedId){
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'user created successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
       
            })
            .catch(error=>console.log(error))
        })
        .catch(error=>console.log(error))
    }
    // console.log(watch("example")); // watch input value by passing the name of it
    const {user} = useContext(AuthContext)
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card  w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"  name="name" {...register("name",{required : true ,maxLength: 20})} placeholder="email" className="input input-bordered" />
                            {errors.name  && <span className="text-red-600" > Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text"  name="photo" {...register("photo", {required: "photo url address is required" })} 
                             aria-invalid={errors.photo ? "true" : "false" } 
                             placeholder="email"  className="input input-bordered" />
                            {errors.photo  && <p role="alert">{errors.photo?.message}</p> }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input defaultValue={user?.email} type="text" name="email" {...register("email" , {required:true})} placeholder="email" className="input input-bordered"/>
                            {errors.email  && <span className="text-red-600" >Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" name="password" {...register("password" , {
                                required:true,
                                 minLength:6, 
                                 maxLength:20,
                                 pattern :/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/

                                 })} placeholder="password" className="input input-bordered" />
                            
                            {errors.password?.type === 'required' && <span className="text-red-600" >password must be min 6 and max 20 characters required</span>}

                            {errors.password?.type === 'minLength' && <span className="text-red-600" >password must be min 6 characters required</span>}

                            {errors.password?.type === 'maxLength' && <span className="text-red-600" >password must be less than 20 characters required</span>}

                            {errors.password?.type === 'pattern' && <span className="text-red-600" >password must have one uppercase , one lowercase , one number and one special characters less than 20 characters required</span>}

                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-primary" value="Sign Up"/>
                        </div>
                    </form >
                    <p>Already Have an Account? Please <Link className="font-bold" to="/login">Login </Link> </p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default SignUp;