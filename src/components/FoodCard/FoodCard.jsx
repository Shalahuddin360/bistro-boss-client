import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../provider/AuthProvider";

const FoodCard = ({item}) => {
    const {name,recipe,image,price,_id} = item;
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    console.log(navigate)
    const location = useLocation()
    console.log(location)
    const [,refetch] = useCart()

    const handleAddToCart = ()=>{
        //   console.log(item)
        if(user && user?.email){
            const cartItem = {
                menuItemId : _id,
                name,
                image,
                price,
                email:user?.email

            }
            console.log(cartItem)
            fetch('https://bistro-boss-server-omega.vercel.app/carts',{
                method: 'POST',
                headers:{
                    "content-type" : "application/json",
                   
                },
                body:JSON.stringify(cartItem)
            })
            .then(res=>res.json())
            .then(data=>{

                console.log(data)
                if(data.insertedId){
                    refetch() // refetch cart to updatte the number of items in the cart 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Food added on the cart',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
     
            })
        }
        else{
            Swal.fire({
                title: 'Please login to order the food',
                // text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now!'
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state : {from:location}})
                }
              })
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4">$ {price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={()=>handleAddToCart(item)} className="btn btn-outline border-0 mt-4 border-b-4 bg-slate-600 border-orange-500">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;