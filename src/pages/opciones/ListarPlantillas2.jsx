import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../components/BaseUrl';
import EliminarSaludos from '../../components/modals/EliminarSaludos';


function ListarPlantillas2() {
    const [campanasData, setCampanasData] = useState([]);
    const [expandedNumbers, setExpandedNumbers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState('10')
    const pageSize = inputValue; // Número de filas por página

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/chat_business2/Dashboard/Dashboard/api_plantillas_saludo.php`);
                setCampanasData(response.data);
                // Inicializar el estado de expansión con "false" para cada fila
                setExpandedNumbers(Array(response.data.length).fill(false));

                console.log("xxxxxxxxx", response.data)

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
                campana.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const handleInputOnchange = (event) => {
        setInputValue(event.target.value)
        if (event.target.value <= 0) {
            setInputValue('1')
        }
    }


    const totalPages = Math.ceil(filterCampanas().length / pageSize);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const paginatedCampanas = filterCampanas().slice((currentPage - 1) * pageSize, currentPage * pageSize);



  



    return (
        <div>
  
                    <div className='flex justify-start flex-col mt-10 px-2 lg:px-0 lg:pr-5'>
                        <h2 className='font-semibold text-2xl text-gray-900 text-center'>Plantillas Saludo</h2>
                        <div className='flex justify-start 2xl:ml-36 gap-2 mt-10'>
                            <div className='flex gap-2'>
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="px-2 py-1 border outline-none rounded mb-2"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <input type="number" value={inputValue} onChange={handleInputOnchange} className='w-14 h-[34px] mx-auto pl-4 border rounded outline-none border-gray-600' />

                            </div>
                            {/* <Link to="/send">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-[33px] px-4 rounded">
                                    Crear
                                </button>
                            </Link> */}

                        </div>

                        <div className="container mx-auto mt-2 overflow-x-auto">
                            <table className="min-w-full bg-gray-700 rounded-lg">
                                <thead className="text-white">
                                    <tr>
                                        <th className="py-3 px-4 border-r text-left">ID</th>
                                        <th className="py-3 px-4 border-r text-left">Nombre</th>
                                        <th className="py-3 px-4 border-r text-left">Contenido</th>
                                        <th className="py-3 px-4 border-r text-left">Url</th>
                                        <th className="py-3 px-4 border-r text-left">tipo</th>
                                        {/* <th className="py-3 px-4 text-left">estado</th> */}
                                        <th className="py-3 px-4 text-left">Acciones</th>   
                                    </tr>
                                </thead>
                                <tbody className='border'>
                                    {paginatedCampanas.map((campana, index) => (
                                        <React.Fragment key={campana.id}>
                                            <tr className={`border border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300'}`}>
                                                <td className="py-3 font-bold px-4">{campana.id}</td>
                                                <td className="py-3 px-4">{campana.nombre}</td>
                                                <td className="px-4">
                                                    {campana.contenido}
                                                </td>

                                                <td className="py-3 px-4"><a href={campana.url}>{campana.url}</a></td>
                                                <td className="py-3 px-4">{campana.tipo}</td>
                                                {/* <td className="py-3 px-4">{campana.estado}</td> */}
                                                <td className="py-3 px-4 text-center">
                                                    {campana.estado === '1' && <EliminarSaludos id={campana.id}/>}
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>




                        </div>

                        <div className="flex justify-center w-full lg:justify-end gap-2 mt-4 2xl:pr-36">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white text-gray-800 font-bold py-2 px-4 rounded-l"
                            >
                                Anterior
                            </button>


                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="bg-gray-300 cursor-pointer hover:bg-gray-400 hover:text-white text-gray-800 font-bold py-2 px-4 rounded-r"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
        </div>
    )
}



export default ListarPlantillas2