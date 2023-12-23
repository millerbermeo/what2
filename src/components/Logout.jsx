import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Logout() {

  const salir = async () => {
    try {
      // URL de tu endpoint
      const endpointUrl = 'https://tu-api.com/tu-endpoint';


      // Realizar la petición POST con Axios
      const response = await axios.post(endpointUrl, data);

      // Puedes manejar la respuesta aquí, por ejemplo, redireccionar o mostrar un mensaje
      console.log('Respuesta del servidor:', response.data);

    } catch (error) {
      // Manejar errores aquí
      console.error('Error al realizar la petición POST:', error);
    }
  };

  return (
    <>
      <div className='text-2xl' onClick={salir}>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </div>
    </>
  );
}

export default Logout;
