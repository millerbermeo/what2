import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


function ModalBot({ numero }) {
  const [showModal, setShowModal] = useState(false);

  //  

  const log = () => {
    setShowModal(true);
  }

  const mandarBot = async () => {
    try {

      const formData = new FormData();
      formData.append('numberw', numero);
      // Realizar la petición POST con Axios
      const response = await axios.post('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_mandar_bot.php', formData);

      console.log('Respuesta del servidor:', response.data);


    } catch (error) {
      // Manejar errores aquí
      console.error('Error al realizar la petición POST:', error);
    } finally {
      // Siempre ocultar el modal después de realizar la acción
      setShowModal(false);
    }
  };

  return (
    <>
      <div className='' onClick={log}>
        <FontAwesomeIcon icon={faRobot} />
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
         <div className="bg-white p-12 rounded shadow-lg flex items-center flex-col">
            <p className='text-black text-xl'>¿Seguro que quieres mandar el bot?</p>

            <div className='flex gap-4 mt-3'>
              <button className='text-black text-lg font-semibold' onClick={() => setShowModal(false)}>Cancelar</button>


              <button onClick={mandarBot} className="relative inline-block text-lg px-4 py-2 font-medium group">
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



export default ModalBot
