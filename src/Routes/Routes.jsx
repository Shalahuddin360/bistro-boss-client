import {
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import Main from "../Layouts/Main";
import AddItem from "../pages/Dashboard/AddItem/AddItem";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import Payment from "../pages/Dashboard/Payment/Payment";

import ErrorPage from "../pages/Home/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Register from "../pages/Register/Register";
import SignUp from "../pages/Register/SignUp/SignUp";
import Secret from "../pages/Shared/Secret/Secret";
import AdminRoutes from "./AdminRoutes";
import PrivateRoute from "./PrivateRoute";

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
        },
        {
         path:'payment',
         element:<Payment></Payment>
        },
        //admin routes
        {
          path:'allUsers',
          element:<AdminRoutes><AllUsers></AllUsers></AdminRoutes>
        },
        {
          path:'addItem',
          element:<AdminRoutes><AddItem></AddItem> </AdminRoutes>
        }

      ]
    },
    {
      path:'*',
      element:<ErrorPage></ErrorPage>
    }

  ]);
  export default router;