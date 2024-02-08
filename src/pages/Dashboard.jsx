import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ChatsBot from '../components/chatsmonitoreo/ChatsBot'
import ChatsNoRespondidos from '../components/chatsmonitoreo/ChatsNoRespondidos'
import ChatsRespondidos from '../components/chatsmonitoreo/ChatsRespondidos'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import Logout2 from '../components/modals/Logout2'




function Dashboard() {


  const user = JSON.parse(localStorage.getItem('user2'));
  console.log(user)

  return (
    <>
      <div className="flex">
        <div className='md:relative md:z-0'>
          <Sidebar mostrar="hidden" ocultar="flex" />
          
        </div>
        <main className="flex-1 w-full pl-0 lg:pl-5 lg:p-2 pt-0 lg:pt-1 pb-0">
          {/* <Navbar/> */}
          <div className='w-full h-16 bg-gray-300 flex justify-between items-center rounded-lg px-5'>
            <div className='flex gap-4 justify-center items-start'>
            <span className='text-3xl p-1 text-blue-900 bg-white w-10 h-10 flex justify-center items-center rounded-full'>
              <FontAwesomeIcon icon={faUserSecret} />
            </span>

            <div className='relative'>
            <h2 className='text-lg uppercase text-black font-semibold'>
              {user.name}
            </h2>
            <p className='absolute -bottom-4 text-sm text-blaxk opacity-80'>{user.type}</p>
            </div>
            </div>


           <Logout2/>
          </div>
          <div className='flex 2xl:items-center items-start 2xl:h-[100%] justify-center gap-8 flex-wrap lg:flex-nowrap 2xl:gap-10 mt-5 2xl:px-10'>

            <ChatsBot />
            <ChatsNoRespondidos />
            <ChatsRespondidos />
          </div>

        </main>
      </div>
    </>
  )
}

export default Dashboard