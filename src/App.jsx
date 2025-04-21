import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from "./layout/RootLayout"
import AuthLayout from './layout/AuthLayout';
import SignIn from './component/signin';
import Home from './component/home';
import Signup from './component/Signup';
import Discover from './component/Discover'
import Login from './component/Login'
import Detail from './component/Detail'
import Profile from './component/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children:[
      {
        element:<AuthLayout/>,
        children:[{
          path: "signin",
          element: <SignIn/>
        },{
          path:'signup',
          element: <Signup/>
        }]
      },{
        path: 'admins',
        element:<Home/>
      }
      ,{
        path: '/',
        element:<Discover/>
      }
      ,{
        path: 'login',
        element:<Login/>
      }
      ,{
        path: 'detail/:slug',
        element:<Detail/>
      }
      ,{
        path: 'profile',
        element:<Profile/>
      }
    ]
  }
])

function App() {
  const [count, setCount] = useState(0)

  return <RouterProvider router={router}/>
}

export default App
