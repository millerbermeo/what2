import React, { useState, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ModalChat() {
  const [isOpen, setIsOpen] = useState(true);
  const [inputText, setInputText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [mostrarPlantilla, setMostrarPlantilla] = useState(false);
  const mensajePlantilla = useRef(null);
  const [options, setOptions] = useState([]);

  let numbero_enviar = useRef()

  const toggleModal = () => {
    setIsOpen(true); // Cambiar isOpen
    setMostrarPlantilla(true);
  };

  useEffect(() => {
    // Realiza la solicitud utilizando Axios
    axios.get('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_plantillas_saludo.php')
      .then(response => {
        // Actualiza el estado con las opciones del select
        setOptions(response.data);
      })
      .catch(error => {
        // Maneja errores aquí
        console.error('Error al realizar la solicitud:', error);
      });
  }, []);

  const enviarMensajePlantilla = async () => {
    const menPlant = mensajePlantilla.current?.value;

    const user = JSON.parse(localStorage.getItem('user'));
    const number_a = user && user.number_a;

    // Validación para permitir continuar con el código
    // if (menPlant === null || menPlant === undefined) {
    //   console.warn('menPlant es null o undefined. El mensaje se enviará sin menPlant.');
    // }

    if (numbero_enviar.current.value === null || numbero_enviar.current.value === undefined) {
      console.warn('numeroSeleccionado es null o undefined. El mensaje no se enviará.');
      return;
    }

    const formData = new FormData();
    formData.append('numberw', numbero_enviar.current.value);
    formData.append('nombre_p', menPlant);
    formData.append('number_a', number_a);

    // Realiza la solicitud POST utilizando Axios
    axios.post('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_send_tamplate_s.php', formData)
      .then(response => {
        // Maneja la respuesta del servidor aquí
        console.log(response.data);
      })
      .catch(error => {
        // Maneja errores aquí
        console.error('Error al realizar la solicitud:', error);
      });

    setIsOpen(false)
    setMostrarPlantilla(false)
  }


  return (
    <>

      <div>
        <button
          onClick={toggleModal}
          className="w-full gap-5 bg-gray-800 text-[#ccc] text-sm  hover:bg-[#005187]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg py-2.5 2xl:py-3 text-center flex justify-center items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40"
        >
          Nuevo Chat
          <FontAwesomeIcon icon={faBook} />
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
        {mostrarPlantilla ?
          <div className='fixed w-full h-screen flex items-center justify-center left-0 top-0 z-10 bg-black/50'>

            <div>
              <div className="max-w-md mx-auto w-96 p-4 bg-white rounded-md shadow-md mb-4">


                <label htmlFor="" className='font-semibold text-gray-600'>Ingresa un Numero</label>
                <input className="p-2 border mt-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300" type="text" ref={numbero_enviar} placeholder='ingresa un numero' />



                {/* Otros elementos del formulario */}
                <label htmlFor="inputTexto" className="block mt-2 font-medium text-gray-600">
                  Selecciona Plantilla
                </label>
                {/* Cambia el input a un select */}
                <select
                  id="inputTexto"
                  name="inputTexto"
                  ref={mensajePlantilla}
                  className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                >
                  {/* Mapea las opciones del estado para llenar el select */}
                  {options.map(option => (
                    <option key={option.id} value={option.nombre}>
                      {option.nombre}
                    </option>
                  ))}
                </select>

                {/* Botón de envío */}
                <div className='flex gap-2'>


                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setMostrarPlantilla(false);
                    }}
                    className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300"
                  >
                    Cerrar
                  </button>

                  <button
                    onClick={enviarMensajePlantilla}
                    type="submit"
                    className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div> : ''
        }
      </Transition>
    </>
  );
}

export default ModalChat;
