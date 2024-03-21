import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../components/Sidebar';
import Logout2 from '../../components/modals/Logout2';
import axios from 'axios';
import baseURL from '../../components/BaseUrl';
import { saveAs } from 'file-saver'; 

function ReportesChatsBot() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const fecha1 = useRef();
    const fecha2 = useRef();
    const agente = useRef();

    const user = JSON.parse(sessionStorage.getItem('user2'));
    console.log(user);
    console.log(user.number_a);

    const fetchData = async () => {
        try {
            const formData = new FormData();
            formData.append('fecha_inicio', fecha1.current.value);
            formData.append('fecha_fin', fecha2.current.value);
            formData.append('status', agente.current.value);

            const response = await axios.post(`${baseURL}/chat_business2/Dashboard/Dashboard/api_reporte_chats.php`, formData);
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log("Error del servidor", error);
        }
    };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.table ? data.table.slice(indexOfFirstItem, indexOfLastItem) : [];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const downloadCSV = () => {
        const csvData = data.table.map(item => {
            return `${item.Id},${item.Whatsapp},${item.Mensaje},${item.Tipo},${item.Fecha}`;
        }).join('\n');

        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'reporte_agente-bot.csv');
    };

    return (
        <>
            <div className="flex">
                <div className='md:relative md:z-0'>
                    <Sidebar mostrar="hidden" ocultar="flex" />
                </div>
                <main className="flex-1 w-full pl-0 lg:pl-5 lg:p-2 pt-0 lg:pt-1 pb-0">
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
                        <Logout2 />
                    </div>

                    <div className='flex px-2 items-start flex-col gap-8 flex-wrap lg:flex-nowrap 2xl:gap-10 mt-5 2xl:px-10 py-5 bg-gray-100 mb-5 rounded-lg '>
                        <h1 className='text-3xl font-medium'>Reporte Chats</h1>
                        <div className="flex gap-4">
                            <div className='flex gap-2 items-center'>
                                <label>Fecha Inicio</label>
                                <input type="text" ref={fecha1} placeholder="20240318" className="px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div className='flex gap-2 items-center'>
                                <label>Fecha Final</label>
                                <input type="text" ref={fecha2} placeholder="20240319" className="px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div className='flex gap-2 items-center'>
                                <label htmlFor="agentSelect" className="mr-2">Agente</label>
                                <select id="agentSelect" ref={agente} className="px-3 py-2 border border-gray-300 rounded-lg">
                                    <option value="">Selecciona un agente</option>
                                    <option value="Agente">Agente</option>
                                    <option value="Bot">Bot</option>                        
                                </select>
                            </div>
                            <button onClick={fetchData} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Enviar</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto px-10 bg-gray-100 py-8 rounded-lg mb-10">
                        <h3 className='font-semibold text-2xl mb-5'>Datos Reportes</h3>
                        <table className="table-auto w-full">
                            <div className='flex justify-between border-b my-5 pb-2'>
                                <span className='text-xl'>
                                    Total de mensajes en rango de fechas:
                                </span>
                                <span>
                                    {data.total_mensajes_en_fechas}
                                </span>
                            </div>
                            <div className='flex justify-between border-b my-5 pb-2'>
                                <span className='text-xl'>
                                    Fecha Inicio
                                </span>
                                <span>
                                    {data.fecha_inicio}
                                </span>
                            </div>
                            <div className='flex justify-between border-b my-5 pb-2'>
                                <span className='text-xl'>
                                    Fecha Fin
                                </span>
                                <span>
                                    {data.fecha_fin}
                                </span>
                            </div>
                        </table>
                    </div>

                    <div className="overflow-x-auto rounded-lg overflow-hidden my-2">
            <button onClick={downloadCSV} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
              <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Download CSV</span>
            </button>
          </div>
                    <div className="overflow-x-auto border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Whatsapp
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mensaje
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tipo
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.Id}</td> 
                    <td className="px-6 py-4 whitespace-nowrap">{item.Whatsapp}</td> 
                    <td className="px-6 py-4 whitespace-wrap">{item.Mensaje}</td> 
                    <td className="px-6 py-4 whitespace-nowrap">{item.Tipo}</td> 
                    <td className="px-6 py-4 whitespace-nowrap">{item.Fecha}</td> 
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg
                  {currentPage === 1 ? 'pointer-events-none opacity-50' : ''}"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentItems.length < itemsPerPage}
                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${indexOfLastItem >= (data.table ? data.table.length : 0) ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    Siguiente
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Mostrando
                      <span className="font-medium">{` ${indexOfFirstItem + 1}`}</span>
                      a
                      <span className="font-medium">{` ${Math.min(indexOfLastItem, data.table ? data.table.length : 0)}`}</span>
                      de
                      <span className="font-medium">{` ${data.table ? data.table.length : 0}`}</span>
                      resultados
                    </p>
                  </div>
                  <div>
                  <nav className="relative z-0  rounded-md flex gap-2 shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                      >
                        <span className="">Anterior</span>
                   
                      </button>
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastItem >= (data.table ? data.table.length : 0)}
                        className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${indexOfLastItem >= (data.table ? data.table.length : 0) ? 'pointer-events-none opacity-50' : ''}`}
                      >
                        <span className="">Siguiente</span>
       
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
    </>
  );
  };
export default ReportesChatsBot