import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";


const MyCart = () => {
    const [cart,refetch] = useCart();
    console.log(cart)
    // javascript array reduce to get total
    //How to does reduce work
    const total = cart.reduce((sum, item) => item.price + sum, 0)
    const handleDelete = item=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
               fetch(`https://bistro-boss-server-omega.vercel.app/carts/${item._id}`,{
                method : 'DELETE',
                headers:{
                    'content-type' : 'applications/json',

                }
                
               })
               .then(res=>res.json())
               .then(data=>{
                if(data.deletedCount >0){
                    refetch()
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                }
               })
            }
          })
    }
    return (
        <div>
            <Helmet>
                <title>Bistro Boss || My Cart</title>

            </Helmet>
            <div className="font-bold flex justify-evenly h-10 ">
                <div className="text-xl">Total Items : {cart.length}</div>
                <div className="text-xl">Total Price :$ {total}</div>
                <Link to="/dashboard/payment">Pay</Link>
            </div>
            <div className="overflow-x-auto w-full h-[500px] overflow-y-scroll scroll-smooth">
                <table className="table w-full">
                    {/* head */}
                    <thead className="">
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Food</th>
                            <th>Item Name</th>
                            <th>Price </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            cart.map((item, index) => <tr
                                key={item._id}
                            >
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                  {item.name}
                                </td>
                                <td className="text-end"> ${item.price}</td>
                                <td>
                                    <button onClick={()=> handleDelete(item)} className="btn btn-ghost  text-white bg-red-600"><FaTrashAlt/></button>
                                </td>
                            </tr>)
                        }


                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyCart;