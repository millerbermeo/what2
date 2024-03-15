import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseURL from '../BaseUrl';


function Logout2() {
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigate()

  const log = () => {
    setShowModal(true);
  }

  const salir = async () => {
    try {


      // Realizar la petición POST con Axios
      const response = await axios.post(`${baseURL}/chat_business2/Dashboard/Dashboard/api_logout.php`);

      // Puedes manejar la respuesta aquí, por ejemplo, redireccionar o mostrar un mensaje
      console.log('Respuesta del servidor:', response.data);

      sessionStorage.removeItem('user2');
      sessionStorage.removeItem('user');
      

      // Redireccionar a la vista raíz
      navigation("/")
      

    } catch (error) {
      // Manejar errores aquí
      console.error('Error al realizar la petición POST:', error);
    } finally {
      navigation("/")
      // Siempre ocultar el modal después de realizar la acción
      setShowModal(false);
    }
  };

  return (
    <>
      <div className='text-2xl cursor-pointer' onClick={log}>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black p-12 rounded shadow-lg flex items-center flex-col">
            <p className='text-xl text-black font-bold'>¿Seguro que quieres salir?</p>

            <div className='flex gap-4 mt-3'>
              <button className='text-lg' onClick={() => setShowModal(false)}>Cancelar</button>

              <button onClick={salir} className="relative text-lg inline-block px-4 py-2 font-medium group">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">Confirmar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Logout2;
