import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ModalPassword from '../components/ModalPassword';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function Perfil() {

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>

            <div className="flex">
                <div className='md:relative md:z-0'>
                    <Sidebar />
                </div>
                <main className="flex-1 w-full h-screen pl-0 lg:pl-6 lg:p-2 pt-0 lg:pt-1 pb-0 bg-[#fffdfd]">
                    <Navbar navbar="flex" />
                    <div className='flex justify-center mt-10 px-10'>


                        <div className='w-full flex justify-start'>
                            <div className='max-w-[500px] bg-[#f1f2f3] shadow-lg p-8 rounded-md'>
                                <div className='flex items-center space-x-6'>

                                    <div className='w-28 h-28 flex items-center flex-col rounded-full overflow-hidden'>
                                        <span className='text-8xl text-gray-700'>
                                            <FontAwesomeIcon icon={faCircleUser} />
                                        </span>
                                        <span className='text-gray-900 absolute -bottom-4 font-semibold w-full uppercase flex justify-center'>{user.email}</span>
                                    </div>

                                    <div className='flex flex-col'>
                                        <h2 className='text-xl font-bold uppercase mb-2'>{user.type}</h2>
                                        <span className='text-gray-600'>{user.name}</span>
                                        <span className='text-gray-600'>{user.number_a}</span>
                                        <ModalPassword />
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>

                </main>
            </div>

        </div>
    )
}

export default Perfil
