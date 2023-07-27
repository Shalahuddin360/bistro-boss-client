import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useAdmin = () => {

     const {user} = useContext(AuthContext);
     const [axiosSecure] = useAxiosSecure();
    //  const {data:custom name = default value , isLoading:custom loading name , error ,refetch} = useQuery
    //TODO: useAxiosSecure not use in useCart.jsx components

    //use axios secure with react query
     const {data:isAdmin , isLoading:isAdminLoading} = useQuery({
        queryKey : ['isAdmin' , user ?.email],
        queryFn : async ()=>{
               const res = await axiosSecure.get((`/users/admin/${user?.email}`))
               console.log('is admin response',res);
               return res.data.admin;
        }
     })
   return [isAdmin,isAdminLoading]
}
export default useAdmin;