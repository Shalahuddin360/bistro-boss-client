import {
    createBrowserRouter,

  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import SignUp from "../pages/Register/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/Shared/Secret/Secret";
import Dashboard from "../Layouts/Dashboard";
import MyCart from "../pages/Dashboard/MyCart/MyCart";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/menu',
          element:<Menu></Menu>
        },
        {
          // path:'/order/:title',
          path:'/order/:category',
          element:<Order></Order>

        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/register',
          element:<Register></Register>
        },
        {
          path:'/signup',
          element:<SignUp></SignUp>
        },
        {
          path :'/secret',
          element:<PrivateRoute> <Secret></Secret> </PrivateRoute>
        }
        
      ],
      
    },
    {
      path:'/dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path:'myCart',
          element:<MyCart></MyCart>
        }
      ]
    }
  ]);
  export default router;