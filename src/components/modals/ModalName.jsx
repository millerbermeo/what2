import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import baseURL from '../BaseUrl';


const ModalName = ({ numero }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [Campo, setCampo] = useState(false);
  const nombre = useRef();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCampo(false);
  };

  const guardarNombre = (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const number_a = user && user.number_a;
    const nombreValue = nombre.current.value.trim();

    if (!nombreValue) {
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

    axios.post(`${baseURL}/chat_business2/Dashboard/Dashboard/api_save_name.php`, formData)
      .then(response => {
        console.log('Response:', response.data);
        setIsOpen(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsOpen(false);
      });
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      guardarNombre(e);
    }
  };

  return (
    <div>
      <button onClick={openModal}>
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
                  onKeyDown={handleKeyPress}
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
