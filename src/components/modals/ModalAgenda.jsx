import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';

function ModalAgenda({ onSelectedOption, onSelectedOptionName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const nombreUser = useRef(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const submitDatos = (e) => {
    e.preventDefault();
    let name1 = nombreUser.current;
    onSelectedOption(selectedOption, name1);
    toggleModal();
  };

  useEffect(() => {
    // Obtener el valor de number_a del localStorage
    const number_a = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).number_a : null;

    const fetchData = async () => {
      const formData = new FormData();
      formData.append('number_a', number_a);

      try {
        const response = await axios.post('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_agenda.php', formData);
        setOptions(response.data);
      } catch (error) {
        console.error('Error al realizar la solicitud POST:', error);
      }
    };

    // Realiza la primera carga de datos
    fetchData();

    // Establece la repetición cada 3 segundos
    const intervalId = setInterval(() => {
      fetchData();
    }, 3000);

    // Limpieza del intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [isOpen]); // Dependencia isOpen para reiniciar el intervalo cuando se abre/cierra el modal

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const selectedObject = options.find(option => option.numberw === selectedValue);
    nombreUser.current = selectedObject;
    setSelectedOption(selectedValue);
  };

  return (
    <>
      <div>
        <button
          onClick={toggleModal}
          className="w-full gap-2 md:gap-5 bg-[#005187] text-sm text-[#ccc] hover:bg-[#005187]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg py-2.5 2xl:py-3 text-center flex justify-center items-center dark:hover:bg-blue-500 dark:focus:ring-blue-500/40"
        >
          <span>
            Agenda
          </span>
          <FontAwesomeIcon icon={faCommentMedical} />
        </button>
      </div>

      <Transition
        show={isOpen}
        enter="lg:transition-opacity lg:duration-300 lg:ease-out"
        enterFrom="lg:opacity-0"
        enterTo="lg:opacity-100"
        leave="lg:transition-opacity lg:duration-300 lg:ease-in"
        leaveFrom="lg:opacity-100"
        leaveTo="lg:opacity-0"
      >
        {() => (
          <div className="fixed inset-0 flex items-center justify-center w-full z-50 p-4 lg:p-0">
            <div className="absolute inset-0 bg-black opacity-50" onClick={toggleModal}></div>

            <div className="bg-white w-96 p-4 rounded shadow-lg z-50">
              <h2 className="text-2xl font-semibold mb-4 text-center">Agenda</h2>

              <div>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  ref={nombreUser}
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {options.map((option, index) => (
                    <option key={index} value={option.numberw}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end mt-4 gap-3">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={toggleModal}
                >
                  Cerrar
                </button>

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  type="submit"
                  onClick={submitDatos}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
}

export default ModalAgenda;
