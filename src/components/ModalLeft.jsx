import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ModalLeft = ({numero}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [agentes, setAgentes] = useState([]);
  const [selectedAgente, setSelectedAgente] = useState('');

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
  }, []); // El segundo argumento vacío asegura que useEffect solo se ejecute una vez al montar el componente

  const handleSelectChange = (event) => {
    setSelectedAgente(event.target.value);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleEnviarClick = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const number_a = user && user.number_a;

      const formData = new FormData();
      formData.append('numberw', numero);
      formData.append('number_a', selectedAgente);

      const response = await axios.post('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_transferir.php', formData);

      // Manejar la respuesta según tus necesidades
      console.log('Respuesta del servidor:', response.data);

      // Cerrar el modal después de la transferencia
      closeModal();
    } catch (error) {
      // Manejar errores
      console.error('Error en la transferencia:', error);
    }
  };

  return (
    <div>
      <button onClick={openModal}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>

      {isOpen && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 md:p-0">
          <div className="bg-white w-96 p-4 rounded shadow-lg z-50">
            <h2 className="text-2xl text-black font-semibold mb-4 text-center">Transferir</h2>

            <form action="" method="post">
              <div className="mb-4 text-black text-lg font-normal">
                <select
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedAgente}
                  onChange={handleSelectChange}
                >
                  <option value="" disabled>
                    Selecciona un agente
                  </option>
                  {agentes.map((agente) => (
                    <option key={agente.number_a} value={agente.number_a}>
                      {agente.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 text-[16px] font-normal">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  type="button"
                  onClick={handleEnviarClick}
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalLeft;
