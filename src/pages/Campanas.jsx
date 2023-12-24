import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function Campanas() {
    return (
        <div>

            <div className="flex">
            <div className='md:relative md:z-0'>
                <Sidebar />
                </div>
                <main className="flex-1 w-full pl-0 lg:pl-6 lg:p-2 pt-0 lg:pt-1 pb-0">
                    <Navbar navbar="flex" />
                    <div className='flex justify-start flex-col mt-10 px-10'>

                        <h2 className='font-semibold text-2xl text-gray-900'>Total de Campañas</h2>

                        <div className="container mx-auto mt-5">
                            <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
                                <thead className="text-white">
                                    <tr>
                                        <th className="py-3 px-4 text-left">ID</th>
                                        <th className="py-3 px-4 text-left">Nombre</th>
                                        <th className="py-3 px-4 text-left">Mensaje</th>
                                        <th className="py-3 px-4 text-left">URL</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-100'>
                   
                                    <tr className=''>
                                        <td className="py-3 px-4">#1</td>
                                        <td className="py-3 px-4">Juan Pérez</td>
                                        <td className="py-3 px-4">Hola, ¿cómo estás?</td>
                                        <td className="py-3 px-4">
                                            <a href="https://www.ejemplo.com" className="text-blue-400 hover:underline">Enlace</a>
                                        </td>
                                    </tr>
                        
                                    <tr>
                                        <td className="py-3 px-4">#2</td>
                                        <td className="py-3 px-4">María López</td>
                                        <td className="py-3 px-4">¡Todo bien por aquí!</td>
                                        <td className="py-3 px-4">
                                            <a href="https://www.otroejemplo.com" className="text-blue-400 hover:underline">Enlace 2</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}

export default Campanas
