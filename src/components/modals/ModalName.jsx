import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import baseURL from '../BaseUrl';


const ModalName = ({ numero }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [Campo, setCampo] = useState(false)

  const nombre = useRef()


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCampo(false);
  };

  const guardarNombre = (e) => {

    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const number_a = user && user.number_a;

    const nombreValue = nombre.current.value.trim(); // Trim removes leading and trailing whitespaces

    // Check if the user has written something
    if (!nombreValue) {
      // Optionally, you can show an error message or handle it as needed
      console.error('Please enter a name before saving.');
      setCampo(true);
      return;
    } else {
      setCampo(false);
    }

    const formData = new FormData();
    formData.append('numberw', numero);
    formData.append('nombre', nombreValue);
    formData.append('number_a', number_a);

    console.log(formData)

    // Make the POST request
    axios.post(`${baseURL}/chat_business2/Dashboard/Dashboard/api_transferir.php`, formData)
      .then(response => {
        // Handle the response
        console.log('Response:', response.data);
        setIsOpen(false);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
        setIsOpen(false);
      });

  }



  return (
    <div>
      <button
        onClick={openModal}
      >

        <FontAwesomeIcon icon={faAddressBook} />
      </button>

      {isOpen && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 md:p-0">
          <div className="bg-white w-96 p-4 rounded shadow-lg z-50">
            <h2 className="text-2xl text-black font-semibold mb-4 text-center">Guardar Nombre</h2>

            <form>

              <div className="mb-4 text-black text-lg font-normal">

                <label htmlFor="nombre">Ingrese el Nombre</label>
                <input
                id='nombre'
                  required
                  ref={nombre}
                  placeholder='Nombre'
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />

              </div>
              {Campo && (
                <div className='text-lg font-normal w-full py-1 bg-red-500 p-2 my-2 rounded'>
                  Campo Requerido
                </div>
              )}

              <div className="flex justify-end gap-3 text-[16px] font-normal">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  type="submit"
                  onClick={guardarNombre}
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

export default ModalName;
