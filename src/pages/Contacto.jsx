import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function Contacto() {
    return (
        <div>

            <div className="flex">
                <Sidebar />
                <main className="flex-1 w-full pl-0 lg:pl-6 lg:p-2 pt-0 lg:pt-1 pb-0">
                    <Navbar navbar="flex" />
                    <div className='flex justify-center mt-10 px-10'>


                        <h1>contacto</h1>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Contacto
