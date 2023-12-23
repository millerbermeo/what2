import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigate()

  const log = () => {
    setShowModal(true);
  }

  const salir = async () => {
    try {
     

      // Realizar la petición POST con Axios
      const response = await axios.post('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_logout.php');

      // Puedes manejar la respuesta aquí, por ejemplo, redireccionar o mostrar un mensaje
      console.log('Respuesta del servidor:', response.data);

      // Limpiar el localStorage
      localStorage.removeItem('user');

      // Redireccionar a la vista raíz
      navigation("/")

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
      <div className='text-2xl' onClick={log}>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <p>¿Seguro que quieres salir?</p>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
            <button onClick={salir}>Confirmar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Logout;
