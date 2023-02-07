import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import {TiHome} from 'react-icons/ti'

const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center bg-white sm:px8 px-4 py-4 border-b border-b[#e6ebf4}'>
        <Link to='/' className='w-28 object-contain flex items-center gap-1'><TiHome size='1.3rem'/>Home</Link>
        <Link to='/create' className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Create</Link>
    </div>
  )
}

function NavbarWrapper(){
    return(
      <>
      <Navbar />
      <div className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Outlet />
      </div>
      </>
    )
  }
  
export default NavbarWrapper;