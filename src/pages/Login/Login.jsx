
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
const Login = () => {
    // const captchaRef = useRef(null)
    // console.log(captchaRef)
    const [disabled,setDisabled] =useState(true)
    const {signIn} = useContext(AuthContext)
     const navigate = useNavigate();
     const location = useLocation();
     const from = location.state?.from?.pathname || "/"
    //  console.log(from);
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])    

    const handleLogin =(event)=>{

    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email,password)
    signIn(email,password)
    .then(result=>{
        const loggedUser = result.user;
        console.log(loggedUser);
        Swal.fire({
            title: 'user login successful',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          navigate(from, {replace: true})
    })
    .catch(error=>{
        console.error(error)
    })
    }
//    const handleValidateCaptcha =()=>{
//     const user_captcha_value = captchaRef.current.value;
//     // console.log(value)
//     if(validateCaptcha(user_captcha_value)){
//         setDisabled(false)
//     }
//     else{
//         setDisabled(true)
//     }
//    }

   const handleValidateCaptcha =(e)=>{
    const user_captcha_value = e.target.value;

    if(validateCaptcha(user_captcha_value)){
        setDisabled(false)
    }
    else{
        setDisabled(true)
    }
   }

 
          
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col md:flex-row">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card  md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name="email" defaultValue={"app2@gmail.com"} placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" name="password" defaultValue={123456} placeholder="password" className="input input-bordered" />
                         
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                            < LoadCanvasTemplate />
                            </label>
                            
                            {/* <input  type="text" ref={captchaRef} name="captcha" placeholder="type the text above" className="input input-bordered" />

                            <button onClick={handleValidateCaptcha} className="btn btn-outline btn-xs">Validated</button> */}
                            
                             <input onBlur={handleValidateCaptcha}  type="text"  name="captcha" placeholder="type the text above" className="input input-bordered" />

                       
                        </div>
                        {/* TODO: make button disable for captcha */}
                        <div className="form-control mt-6">
                            {/* onClick={()=>setDisabled(!disabled)} */}
                               <input disabled={false}  type="submit" className="btn btn-primary"  value="Login" />
                        </div>
                       
                    </form>
                    <p>New To Visit Please ? <Link to="/register">Register</Link> </p>
                          
                           <SocialLogin ></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;