import React, { useState, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import baseURL from '../BaseUrl';


function ModalChat() {
  const [isOpen, setIsOpen] = useState(true);
  const [inputText, setInputText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [mostrarPlantilla, setMostrarPlantilla] = useState(false);
  const mensajePlantilla = useRef(null);
  const [options, setOptions] = useState([]);
  const [Campo, setCampo] = useState(false)
  const [Campo2, setCampo2] = useState(false)

  let numbero_enviar = useRef()

  const toggleModal = () => {
    setIsOpen(true); // Cambiar isOpen
    setMostrarPlantilla(true);
  };

  useEffect(() => {
    // Realiza la solicitud utilizando Axios
    axios.get(`${baseURL}/chat_business2/Dashboard/Dashboard/api_plantillas_saludo.php`)
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

    const user = JSON.parse(sessionStorage.getItem('user'));
    const number_a = user && user.number_a;
    

    // Validación para permitir continuar con el código
    // if (menPlant === null || menPlant === undefined) {
    //   console.warn('menPlant es null o undefined. El mensaje se enviará sin menPlant.');
    // }

    const numeroEnviar = numbero_enviar.current.value;

    if (!numeroEnviar) {
      console.warn('El número de envío es obligatorio. El mensaje no se enviará.');
      setCampo(true)
      setCampo2(false)
      return;
    }

    if (numeroEnviar.length < 8) {
      console.warn('El número de envío es obligatorio. El mensaje no se enviará.');
      setCampo2(true)
      setCampo(false)
      return;
    }



    const formData = new FormData();
    formData.append('numberw', numeroEnviar);
    formData.append('nombre_p', menPlant);
    formData.append('number_a', number_a);

    // Realiza la solicitud POST utilizando Axios
    axios.post(`${baseURL}/chat_business2/Dashboard/Dashboard/api_send_tamplate_s.php`, formData)
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

  const [selectedTemplateContent, setSelectedTemplateContent] = useState(null);

  // ... (resto del código)

  const handleTemplateSelect = (event) => {
    const selectedTemplateName = event.target.value;
    const selectedTemplate = options.find((option) => option.nombre === selectedTemplateName);

    // Actualiza el estado con el contenido de la plantilla seleccionada
    setSelectedTemplateContent(selectedTemplate ? selectedTemplate.contenido : null);
  };


  return (
    <>

      <div>
        <button
          onClick={toggleModal}
          className="w-full gap-1 bg-gray-800 text-[#ccc] text-sm  hover:bg-[#005187]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg py-2.5 2xl:py-3 text-center flex justify-center items-center dark:hover:bg-blue-500 dark:focus:ring-blue-500/40"
        >
          Nuevo <span className='hidden md:flex'>Chat</span>
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
              <div className="max-w-md mx-auto w-[370px] m-2 p-4 bg-white rounded-md shadow-md mb-4">

                <div>

                  <label htmlFor="" className='text-lg text-gray-600'>Ingresa un Número</label>
                  <input className="p-2 border mt-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300" type="number" ref={numbero_enviar} placeholder='Ingresar número' />
                </div>

                {Campo && (
                  <div className='text-lg font-normal pl-2 w-full bg-red-500 py-1 my-2 rounded text-white'>
                    Número Requerido
                  </div>
                )}

                {Campo2 && (
                  <div className='text-lg font-normal pl-2 bg-red-500 py-1 my-2 rounded text-white'>
                    Número Invalido
                  </div>
                )}

                {/* Otros elementos del formulario */}
                <div>
                  <label htmlFor="inputTexto" className="block text-lg mt-2 text-gray-600">
                    Selecciona una Plantilla
                  </label>
                  {/* Cambia el input a un select */}
         {/* Cambia el input a un select */}
<select
  id="inputTexto"
  name="inputTexto"
  ref={mensajePlantilla}
  onChange={handleTemplateSelect}
  className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
>
  <option value="">
    Selecciona una opción
  </option>

  {/* Mapea las opciones del estado para llenar el select */}
  {options.map(option => (
    // Utiliza una condición para mostrar solo las opciones con estado igual a 1
    option.estado == 1 &&
      <option key={option.id} value={option.nombre}>
        {option.nombre}
      </option>
  ))}
</select>


                </div>

                <div className='my-3 shadow p-2 bg-gray-100'>
                {selectedTemplateContent}
              </div>

                {/* Botón de envío */}
                <div className='flex gap-2 justify-end'>


                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setMostrarPlantilla(false);
                      setCampo(false)
                      setCampo2(false)
                    }}
                    className="mt-4 bg-gray-500 w-[90px] text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-gray-300"
                  >
                    Cerrar
                  </button>

                  <button
                    onClick={enviarMensajePlantilla}
                    type="submit"
                    className="mt-4 bg-blue-500 w-[90px] text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
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
