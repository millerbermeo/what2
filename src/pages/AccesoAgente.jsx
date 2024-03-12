import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import Logout2 from '../components/modals/Logout2';
import baseURL from '../components/BaseUrl';

function AccesoAgente() {
  const [agentes, setAgentes] = useState([]);
  const agente = useRef();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false); // Nuevo estado para controlar si el iframe ha cargado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/chat_business2/Dashboard/Dashboard/api_agentes.php`);
        setAgentes(response.data);
        console.log("agentes",response.data)
      } catch (error) {
        console.error('Error al obtener la lista de agentes:', error);
      }
    };

    fetchData();
  }, []);

  const user2 = JSON.parse(localStorage.getItem('user2'));
  console.log(user2);

  const iniciarSession = (e) => {
    e.preventDefault();
    let agenteInput = agente.current.value;
    console.log(agenteInput);

    const formData = new FormData();
    formData.append('number_a', agenteInput);
    formData.append('hash', 'djrDRGdrg3234DRGDRGg88');

    console.log(formData);

    axios.post(`${baseURL}/chat_business2/Dashboard/Dashboard/api_agente_login.php`, formData)
      .then(response => {
        console.log('Response:', response.data);
        setData(response.data);

        const userData = {
          ...response.data,
          number_a: agenteInput
        };
      
        const loginIframe = document.getElementById('loginIframe');
        if (loginIframe) {
          const dataQueryString = encodeURIComponent(JSON.stringify(userData));
          localStorage.setItem('user', JSON.stringify(userData));
          loginIframe.src = `/home?data=${dataQueryString}`;
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleIframeLoad = () => {
    setIframeLoaded(true); // Cuando el iframe ha cargado, actualiza el estado
  }


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
                  {user2.name}
                </h2>
                <p className='absolute -bottom-4 text-sm text-blaxk opacity-80'>{user2.type}</p>
              </div>
            </div>


            <Logout2/>
          </div>
          <div className='flex 2xl:items-start items-start 2xl:h-[100%] justify-center w-full flex-col gap-3 2xl:gap-10 mt-5 2xl:px-0 '>

            <div className="mb-4 text-black text-lg font-normal flex gap-3 px-10">
              <select
              ref={agente}
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
              <button onClick={iniciarSession} className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </div>

            <div className='w-full flex justify-center'>
              {!iframeLoaded && <p className='text-4xl m-auto'>Cargando...</p>} {/* Mostrar el mensaje de "Cargando" si el iframe aún no ha cargado */}
              <iframe
                id="loginIframe"
                title="Login Component"
                src="/"
                width="95%"
                height="900"
                allow="fullscreen"
                onLoad={handleIframeLoad} // Cuando el iframe carga, ejecuta la función handleIframeLoad
                style={{ display: iframeLoaded ? 'block' : 'none' }} 
              ></iframe>
            </div>
          </div>

        </main>
      </div>
    </>
  )
}


export default AccesoAgente