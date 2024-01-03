import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useState, useEffect } from 'react';

function Contacto() {

  

    

    return (
        <div>

            <div className="flex">
                <div className='md:relative md:z-0'>
                    <Sidebar />
                </div>
                <main className="flex-1 w-full pl-0 lg:pl-6 lg:p-2 pt-0 lg:pt-1 pb-0">
                    <Navbar navbar="flex" />
                    <div className='flex flex-col items-center mt-10 px-10'>
                        <h1 className='font-bold text-3xl uppercase mb-4'>Contacto</h1>
                        <p className='text-lg text-center'>
                            Si necesita asistencia, no dude en ponerse en contacto con <span className='font-semibold'>VOZ IP BUSINESS OF TECHNOLOGY</span>.
                        </p>
                        <p className='text-lg text-center mt-2'>
                            <span className='font-bold'>Correo Electrónico:</span> <a href='mailto:soporte@vozipcolombia.net.co' className='text-blue-500 hover:underline'>soporte@vozipcolombia.net.co</a>
                        </p>
                        <p className='text-lg text-center'>
                            <span className='font-bold'>Teléfono:</span> (+57) 350-608-6936
                        </p>
                    </div>

                </main>
            </div>
        </div>
    )
}

export default Contacto
