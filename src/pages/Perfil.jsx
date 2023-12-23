import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ModalPassword from '../components/ModalPassword';

function Perfil() {
    return (
        <div>

            <div className="flex">
                <Sidebar />
                <main className="flex-1 w-full pl-0 lg:pl-6 lg:p-2 pt-0 lg:pt-1 pb-0">
                    <Navbar navbar="flex" />
                    <div className='flex justify-center mt-10 px-10'>


                        <div className='w-full flex justify-start'>
                            <div className='max-w-[500px] bg-white shadow-lg p-6 rounded-md'>
                                <div className='flex items-center space-x-6 w-full'>

                                    <div className='w-28 h-28 overflow-hidden rounded-full border'>
                                        <img className='object-cover w-full h-full' src="usuario.svg" alt="Usuario" />
                                    </div>

                                    <div className='flex flex-col'>
                                        <h2 className='text-xl font-bold mb-2'>AGENTE</h2>
                                        <span className='text-gray-600'>Miller Rivera</span>
                                       
                                       <ModalPassword/>
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
