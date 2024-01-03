import React from 'react'
import { Link } from 'react-router-dom';
import Logout from './Logout';


function Navbar({ navbar }) {


  return (

    <>
      <nav className={`w-full lg:z-0 overflow-hidden relative mt-2 md:mt-0 flex px-0 lg:${navbar} top-0 h-16 bg-gray-200 rounded-lg justify-between items-center pr-3`}>
        {/* Logo */}
        <div className='ml-3 md:hidden text-xl font-bold text-gray-800'>
          <img className='w-52 ' src="negociemoss.png" alt="" />
        </div>



        {/* Menu Items */}
        <div className='hidden md:flex items-center space-x-0 font-normal text-xl'>
          <Link to="/home">
            <span className='text-white bg-blue-600 hover:text-white py-[22px] px-5'>
              Chat
            </span>
          </Link>
         <Link to="/send">
         <span className='text-gray-700 hover:bg-blue-500 hover:text-white py-[22px] px-5'>
            Campañas
          </span>
         </Link>
         <Link to="/perfil">
         
         <span className='text-gray-700 hover:bg-blue-500 hover:text-white py-[22px] px-5'>
            Perfil
          </span>
         </Link>


          <Link to="/contacto">
            <span className='text-gray-700 hover:bg-blue-500 py-[22px] px-5 hover:text-white'>
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
