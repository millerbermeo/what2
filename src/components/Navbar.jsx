import React from 'react'
import { Link } from 'react-router-dom';
import Logout from './logout';


function Navbar({ navbar }) {


  return (

    <>
      <nav className={`w-full lg:z-0 relative mt-2 md:mt-0 flex px-2 lg:${navbar} top-0 h-16 bg-gray-200 rounded-lg justify-between items-center pr-3`}>
        {/* Logo */}
        <div className='ml-3 md:hidden text-xl font-bold text-gray-800'>
          <img className='w-52 ' src="negociemoss.png" alt="" />
        </div>



        {/* Menu Items */}
        <div className='hidden md:flex items-center space-x-0 font-semibold'>
          <Link to="/home">
            <span className='text-gray-700 hover:bg-red-500 py-5 px-2 hover:text-gray-900'>
              Chat
            </span>
          </Link>
          <span className='text-gray-700 hover:bg-red-500 py-5 px-2 hover:text-gray-900'>
            Campañas
          </span>
          <span className='text-gray-700 hover:bg-red-500 py-5 px-2 hover:text-gray-900'>
            Perfil
          </span>
          <Link to="/contacto">
            <span className='text-gray-700 hover:bg-red-500 py-5 px-2 hover:text-gray-900'>
              Contacto
            </span>
          </Link>

        </div>

        {/* User Icon */}
        <div className='pr-14 lg:pr-0'>
          <Logout />
        </div>

      </nav>
    </>

  )
}

export default Navbar
