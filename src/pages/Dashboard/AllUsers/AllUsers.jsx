import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        // const res = await fetch('https://bistro-boss-server-omega.vercel.app/users');
        // const res = await axiosSecure.get('https://bistro-boss-server-omega.vercel.app/users');
        const res = await axiosSecure.get('/users');
        // return res.json()
        return res.data;
    })
    //id = user._id
    const handleMakeAdmin =user=>{
      fetch(`https://bistro-boss-server-omega.vercel.app/users/admin/${user._id}`,{
        method : 'PATCH'
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.modifiedCount){
            refetch()
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${user.name} is an Admin Now`,
                showConfirmButton: false,
                timer: 1500
              })
        }
      })
    }
    const handleDelete = user =>{
    console.log(user)
    }
    return (
        <div className="w-full">
            <Helmet>
                <title>Bistro Boss ||All Users</title>

            </Helmet>
            <h2 className="text-3xl font-semibold my-4">Total Users : {users.length}</h2>
            <div className="overflow-x-auto w-full h-[500px] overflow-y-scroll scroll-smooth">
                <table className="table table-zebra">
                   
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                           {
                            users.map((user,index)=><tr
                                key={user._id}
                                >
                                <td>{index+1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}t</td>
                                <td>{user.role === 'admin'? "admin" :  <button onClick={()=> handleMakeAdmin(user)} className="btn btn-ghost  text-white bg-orange-600"><FaUserShield/></button>}</td>
                                <td>
                                    <button onClick={()=> handleDelete(user)} className="btn btn-ghost  text-white bg-red-600"><FaTrashAlt/></button>
                                </td>
                            </tr>)
                           }
                        
              
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;