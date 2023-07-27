import { useEffect, useState } from "react";

const useMenu=()=>{
    const [menu,setMenu] = useState([]);
    const [loading,setLoading] =useState(true)
    useEffect(()=>{
        fetch('https://bistro-boss-server-omega.vercel.app/menu')
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            
            setMenu(data);
            setLoading(false);
        })
    },[])
    return [menu,loading]
}
export default useMenu;