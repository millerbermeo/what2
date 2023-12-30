import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Campanas() {
    const [campanasData, setCampanasData] = useState([]);
    const [expandedNumbers, setExpandedNumbers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_listar_c_masivas.php');
                setCampanasData(response.data);
                // Inicializar el estado de expansión con "false" para cada fila
                setExpandedNumbers(Array(response.data.length).fill(false));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const toggleExpand = (index) => {
        // Crear una copia del estado de expansión
        const newExpandedNumbers = [...expandedNumbers];
        // Cambiar el valor de expansión para el índice proporcionado
        newExpandedNumbers[index] = !newExpandedNumbers[index];
        // Actualizar el estado de expansión
        setExpandedNumbers(newExpandedNumbers);
    };

    return (
        <div>
            <div className="flex">
                <div className='md:relative md:z-0'>
                    <Sidebar />
                </div>
                <main className="flex-1 w-full pl-0 lg:pl-8 lg:p-2 pt-0 lg:pt-1 pb-0">
                    <Navbar navbar="flex" />
                    <div className='flex justify-start flex-col mt-10 pr-5'>
                        <h2 className='font-semibold text-2xl text-gray-900'>Total de Campañas Masivas</h2>
                        <div className="container mx-auto mt-5">
                            <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
                                <thead className="text-white">
                                    <tr>
                                        <th className="py-3 px-4 text-left">ID</th>
                                        <th className="py-3 px-4 text-left">Nombre</th>
                                        <th className="py-3 px-4 text-left">Numero</th>
                                        <th className="py-3 px-4 text-left">Agente</th>
                                        <th className="py-3 px-4 text-left">Estado</th>
                                        <th className="py-3 px-4 text-left">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-100 border'>
                                    {campanasData.map((campana, index) => (
                                        <React.Fragment key={campana.id}>
                                            <tr className='border border-b'>
                                                <td className="py-3 font-bold px-4">{campana.id}</td>
                                                <td className="py-3 px-4">{campana.nombre_p}</td>
                                                <td className="py-3 px-4">
                                                    <div>
                                                        <div className="w-52 flex max-h-30 overflow-auto break-all">
                                                            {expandedNumbers[index] ? campana.number_m : campana.number_m.slice(0, 40) + "..."}
                                                        </div>
                                                        <button
                                                            onClick={() => toggleExpand(index)}
                                                            className="text-gray-900 underline focus:outline-none mt-1"
                                                        >
                                                            {expandedNumbers[index] ? "Mostrar menos" : "Mostrar más"}
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">{campana.number_a}</td>
                                                <td className="py-3 px-4">{campana.estado}</td>
                                                <td className="py-3 px-4">{campana.fecha}</td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Campanas;
