import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './Routes/Routes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './provider/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='max-w-7xl mx-auto'>

    <React.StrictMode>
      <AuthProvider>
        <HelmetProvider>

          <QueryClientProvider client={queryClient}>

            <RouterProvider router={router}></RouterProvider>

          </QueryClientProvider> 


        </HelmetProvider>
      </AuthProvider>

    </React.StrictMode>

  </div>
)
