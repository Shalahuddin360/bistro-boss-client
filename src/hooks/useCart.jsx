import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'
const useCart = ()=>{
const {user} = useContext(AuthContext);

const { refetch, data : cart=[] } = useQuery({
    queryKey: ['carts',user?.email],
    queryFn: async ()=>{
        const res = fetch(`http://localhost:5000/carts?email=${user?.email}`)
        return (await res).json()
    
    
    }

  })
  return [cart,refetch]


}
export default useCart