import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function SendCampana() {
    return (
        <div>

            <div className="flex">
            <div className='md:relative md:z-0'>
                <Sidebar />
                </div>
                <main className="flex-1 w-full pl-0 lg:pl-6 lg:p-2 pt-0 lg:pt-1 pb-0">
                    <Navbar navbar="flex" />
                    <div className='flex justify-center mt-10 px-10'>

                        <div className='w-full flex justify-start'>
                                        <h1>ENVIAR CAMPANA</h1>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}


export default SendCampana
