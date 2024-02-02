import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

function ModalGroup({ numero }) {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState([]);
  

  const log = () => {
    setShowModal(!showModal);
  };

  
  const showAlert = (icon, text) => {
    Swal.fire({
        title: '¡Hola!',
        text: text,
        icon: icon,
        confirmButtonText: 'Aceptar'
    });
};


  const fetchDta = async () => {
    try {
      const resultado = await axios.post('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_agentes.php');
      setData(resultado.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDta();
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedAgents((prevSelectedAgents) => [...prevSelectedAgents, value]);
    } else {
      setSelectedAgents((prevSelectedAgents) => prevSelectedAgents.filter((agent) => agent !== value));
    }
  };

  const transferirGrupo = async () => {
    try {

      if (selectedAgents.length === 0) {
        showAlert('warning', 'Debes seleccionar al menos un agente');
        return; // Evitar continuar con la operación si no hay agentes seleccionados
      }

      
      const formData = new FormData();
      formData.append('numberw', numero);
      selectedAgents.forEach((agentNumber) => {
        formData.append('numbers_agent', agentNumber);
      });

      // for (const pair of formData.entries()) {
      //   const [key, value] = pair;
      //   console.log(key, value);
      // }

      const response = await axios.post('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_transferir_grupo.php', formData);
      console.log('Respuesta del servidor:', response.data);

      showAlert('success', 'Operación exitosa');

    } catch (error) {
      // Manejar errores aquí
      console.error('Error al realizar la petición POST:', error);
      showAlert('error', 'Hubo un error en la operación');
    } finally {
      // Siempre ocultar el modal después de realizar la acción
      setShowModal(false);
    }
  };

  const renderCheckboxes = () => {
    return data.map((item, index) => (
      <div key={index} className='text-black font-normal flex gap-2'>
        <input
          type="checkbox"
          id={`checkbox-${index}`}
          value={item.number_a}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={`checkbox-${index}`}>{item.name}</label>
      </div>
    ));
  };

  return (
    <>
      <div className='' onClick={log}>
        <FontAwesomeIcon icon={faUserGroup} />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form className="bg-white p-12 m-5 rounded shadow-lg flex items-center flex-col relative">
            <div onClick={log} className='text-black absolute top-1 right-5 text-3xl'>x</div>
            <div className='grid grid-cols-3 place-items-start gap-2'>
              {renderCheckboxes()}
            </div>

            <button
              className="bg-blue-500 w-full text-white px-4 mt-5 py-2 rounded cursor-pointer"
              onClick={transferirGrupo}
            >
              Añadir al Grupo
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ModalGroup;
