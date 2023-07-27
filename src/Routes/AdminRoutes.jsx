import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { ColorRing } from "react-loader-spinner";


const AdminRoutes = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const [isAdmin,isAdminLoading] = useAdmin()
    const location = useLocation();
    if(loading ||isAdminLoading ){
        return <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to="/" state={{from : location}} replace></Navigate>
};

export default AdminRoutes;