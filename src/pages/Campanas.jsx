import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

function Campanas() {
    const [campanasData, setCampanasData] = useState([]);
    const [expandedNumbers, setExpandedNumbers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 7; // Número de filas por página

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


    const filterCampanas = () => {
        return campanasData.filter(
            (campana) =>
                campana.nombre_p.toLowerCase().includes(searchTerm.toLowerCase()) ||
                campana.number_a.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };


    const totalPages = Math.ceil(filterCampanas().length / pageSize);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const paginatedCampanas = filterCampanas().slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div>
            <div className="flex">
                <div className='md:relative md:z-0'>
                    <Sidebar />
                </div>
                <main className="flex-1 w-full pl-0 lg:pl-6 lg:p-2 pt-0 lg:pt-1 pb-0">
                    <Navbar navbar="flex" />
                    <div className='flex justify-start flex-col mt-10 px-2 lg:px-0 lg:pr-5'>
                        <h2 className='font-semibold text-2xl text-gray-900 text-center'>Total de Campañas Masivas</h2>
                        <div className='flex gap-2 mt-10'>
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="px-2 py-1 border outline-none rounded mb-2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Link to="/send">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-[33px] px-4 rounded">
                                    Crear
                                </button>
                            </Link>

                        </div>

                        <div className="container mx-auto mt-2 overflow-x-auto">
                            <table className="min-w-full bg-gray-700 rounded-lg">
                                <thead className="text-white">
                                    <tr>
                                        <th className="py-3 px-4 border-r text-left">ID</th>
                                        <th className="py-3 px-4 border-r text-left">Nombre</th>
                                        <th className="py-3 px-4 border-r text-left">Numero</th>
                                        <th className="py-3 px-4 border-r text-left">Agente</th>
                                        <th className="py-3 px-4 border-r text-left">Estado</th>
                                        <th className="py-3 px-4 text-left">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody className='border'>
                                    {paginatedCampanas.map((campana, index) => (
                                        <React.Fragment key={campana.id}>
                                            <tr className={`border border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300'}`}>
                                                <td className="py-3 font-bold px-4">{campana.id}</td>
                                                <td className="py-3 px-4">{campana.nombre_p}</td>
                                                <td className="px-4">
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

                        <div className="flex justify-center w-full lg:justify-end gap-2 mt-4">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-[33px] px-4 rounded"
                                >
                                    Anterior
                                </button>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-[33px] px-4 rounded"
                                >
                                    Siguiente
                                </button>
                            </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Campanas;
