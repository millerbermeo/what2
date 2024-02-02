import React, {useState, useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import Logout from '../components/modals/Logout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';


function AccesoAgente() {

    const [agentes, setAgentes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_agentes.php');
            // Extraer la información relevante del response (por ejemplo, response.data)
            // En este caso, asumiré que el response.data es un array de agentes con propiedades 'number_a' y 'name'
            setAgentes(response.data);
          } catch (error) {
            console.error('Error al obtener la lista de agentes:', error);
          }
        };
    
        fetchData();
      }, []);

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)

  return (
    <>
      <div className="flex">
        <div className='md:relative md:z-0'>
          <Sidebar mostrar="hidden" ocultar="flex" />
        </div>
        <main className="flex-1 w-full pl-0 md:ml-3 lg:p-2 pt-0 lg:pt-0 pb-0 2xl:px-0">
          {/* <Navbar/> */}
          <div className='w-full h-16 bg-gray-300 flex justify-between items-center px-5'>
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


            <Logout/>
          </div>
          <div className='flex 2xl:items-start items-start 2xl:h-[100%] justify-center w-full flex-col gap-3 2xl:gap-10 mt-5 2xl:px-10'>

          <div className="mb-4 text-black text-lg font-normal flex gap-3">
                <select
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">
                    Selecciona un agente
                  </option>
                  {agentes.map((agente) => (
                    <option key={agente.number_a} value={agente.number_a}>
                      {agente.name}
                    </option>
                  ))}
                </select>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      Enviar
    </button>
              </div>

              <div className='w-full flex justify-center'>
                <img className='w-fulll' src="loginplantilla.png" alt="" />
              </div>
          </div>

        </main>
      </div>
    </>
  )
}


export default AccesoAgente