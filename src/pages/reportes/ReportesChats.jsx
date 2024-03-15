import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../components/Sidebar';
import Logout2 from '../../components/modals/Logout2';

function ReportesChats() {
  const user = JSON.parse(sessionStorage.getItem('user2'));
  console.log(user);

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




          <div className='flex items-start flex-col gap-8 flex-wrap lg:flex-nowrap 2xl:gap-10 mt-5 2xl:px-10 py-5 bg-gray-100 mb-5 rounded-lg '>

            <h1 className='text-3xl font-medium'>Reporte Número</h1>
            <div className="flex gap-4">

              <div className='flex gap-2 items-center'>
                <label>Fecha Inicio</label>
                <input type="date" placeholder="Fecha inicial" className="px-3 py-2 border border-gray-300 rounded-lg" />
              </div>


              <div className='flex gap-2 items-center'>
                <label>Fecha Final</label>
                <input type="date" placeholder="Fecha final" className="px-3 py-2 border border-gray-300 rounded-lg" />
              </div>

              <div className='flex gap-2 items-center'>
                <label>Whatsapp</label>
                <input type="number" placeholder="Número" className="px-3 py-2 border border-gray-300 rounded-lg" />
              </div>


              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Enviar</button>
            </div>
          </div>






          <div className="overflow-x-auto px-10 bg-gray-100 py-8 rounded-lg mb-10">
            <h3 className='font-semibold text-2xl mb-5'>Datos Reportes</h3>
            <table className="table-auto w-full">

              <div className='flex justify-between border-b my-5 pb-2'>
              <span className='text-xl'>
                  Reporte Tipo:
                </span>
                <span>
                  Agente
                </span>
              </div>

              <div className='flex justify-between border-b my-5 pb-2'>
              <span className='text-xl'>
                  Total de mensajes en rango de fechas:
                </span>
                <span>
                  Agente
                </span>
              </div>


              <div className='flex justify-between border-b my-5 pb-2'>
              <span className='text-xl'>
                 Fecha Inicio
                </span>
                <span>
                28/02/2024
                </span>
              </div>

              <div className='flex justify-between border-b my-5 pb-2'>
              <span className='text-xl'>
                Fecha Fin
                </span>
                <span>
                28/02/2024
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
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">1</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">123456</div>
        </td>
        <td className="px-6 py-4 whitespace-wrap">
          <div className="text-sm text-gray-900 break-all">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">2</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">28/02/2024</div>
        </td>
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">2</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">789012</div>
        </td>
        <td className="px-6 py-4 whitespace-wrap">
          <div className="text-sm text-gray-900 break-all">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">2</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">28/02/2024</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>




        </main>
      </div>
    </>
  )
}

export default ReportesChats;
