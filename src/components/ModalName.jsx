import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ModalName = ({numero}) => {
  const [isOpen, setIsOpen] = useState(false);

  const nombre = useRef()


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const guardarNombre = (e) => {

    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const number_a = user && user.number_a;
  
    const formData = new FormData();
    formData.append('numberw', numero);
    formData.append('nombre', nombre.current.value);
    formData.append('number_a', number_a);

    console.log(formData)
  
    // Make the POST request
    axios.post('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_save_name.php', formData)
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

            <form action="" method="post">

              <div className="mb-4 text-black text-lg font-normal">

                <label htmlFor="">Ingrese el Nombre</label>
                <input
                  required
                  ref={nombre}
                  className="w-full p-2 border border-gray-300 rounded"
                />

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
