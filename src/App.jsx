import React, { Children } from 'react'
import {createBrowserRouter, RouterProvider, Router, Outlet} from 'react-router-dom'
import NavbarWrapper from './components/Navbar'
import Main from './pages'
import CreatePost from './pages/CreatePost'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavbarWrapper />,
      children:[
      {
      path: '/',
      element: <Main />,
      errorElement: (
        <div>
          <h1>Not Found</h1>
        </div>
      )
    },
    {
      path: '/create',
      element: <CreatePost />
    },
      ]
    },
  ])
  return <RouterProvider router={router} />
}
export default App
