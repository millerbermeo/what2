import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../components/Sidebar';
import Logout2 from '../../components/modals/Logout2';
import axios from 'axios';
import baseURL from '../../components/BaseUrl';



function ReportesChats() {
  const user = JSON.parse(sessionStorage.getItem('user2'));
  console.log(user);

  const [data, setData] = useState([])

  const fecha1 = useRef()
  const fecha2 = useRef()
  const whatsapp = useRef()



  const fetchData = async () => {

    try {

      const formData = new FormData();

      formData.append('fecha_inicio', fecha1.current.value);
      formData.append('fecha_fin', fecha2.current.value);
      formData.append('numberw', whatsapp.current.value);

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      await axios.post(`${baseURL}/chat_business2/Dashboard/Dashboard/api_reporte_numero.php`).then((response) => {
        console.log(response.data)
        setData(response.data)
      })


    } catch (error) {
      console.log("error del servidor", error)
    }

  }

  // useEffect(() => {
  //     fetchData()
  // })




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

            <h1 className='text-3xl font-medium'>Reporte Número</h1>
            <div className="flex gap-4">

              <div className='flex gap-2 items-center'>
                <label>Fecha Inicio</label>
                <input type="text" ref={fecha1} placeholder="Fecha inicial" className="px-3 py-2 border border-gray-300 rounded-lg" />
              </div>

              <div className='flex gap-2 items-center'>
                <label>Fecha Final</label>
                <input type="text" ref={fecha2} placeholder="Fecha final" className="px-3 py-2 border border-gray-300 rounded-lg" />
              </div>


              <div className='flex gap-2 items-center'>
                <label>Whatsapp</label>
                <input type="number" ref={whatsapp} placeholder="Número" className="px-3 py-2 border border-gray-300 rounded-lg" />
              </div>


              <button onClick={fetchData} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Enviar</button>
            </div>
          </div>






          <div className="overflow-x-auto px-10 bg-gray-100 py-8 rounded-lg mb-10">
            <h3 className='font-semibold text-2xl mb-5'>Datos Reportes</h3>
            <table className="table-auto w-full">

              {data.table && data.table.map((item, index) => (
                <div key={index} className='flex justify-between border-b my-5 pb-2'>
                  <span className='text-xl'>
                    Reporte Tipo:
                  </span>
                  <span>
                    {data.Table[2]}
                  </span>
                </div>
              ))}



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
                {Array.isArray(data) && data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.whatsapp}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-wrap">
                      <div className="text-sm text-gray-900 break-all">{item.mensaje}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.tipo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.fecha}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>





        </main>
      </div>
    </>
  )
}

export default ReportesChats;
