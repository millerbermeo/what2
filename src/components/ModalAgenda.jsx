import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';


function ModalAgenda() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const submitDatos = (e) => {
    e.preventDefault();

    // Verifica si los campos de inputText y selectedOption están llenos
    if (inputText.trim() !== '' && selectedOption.trim() !== '') {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Los datos se han procesado con éxito.',
      });

      toggleModal();
    } else {
      // Muestra una alerta o realiza alguna acción en caso de campos vacíos
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Complete los campos requeridos',
      });
    }
  };

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const options = [
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' },
  ];

  return (
    <>
      <div>
        <button
          onClick={toggleModal}
          className="w-full text-white gap-5 bg-[#005187] hover:bg-[#005187]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm py-2.5 2xl:py-3 text-center flex justify-center items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40"
        >
          Agenda
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
        {(ref) => (
          <div ref={ref} className="fixed inset-0 flex items-center justify-center w-full z-50 p-4 lg:p-0">
            <div className="absolute inset-0 bg-black opacity-50" onClick={toggleModal}></div>

            <div className="bg-white w-96 p-4 rounded shadow-lg z-50">
              <h2 className="text-2xl font-semibold mb-4 text-center">Añadir Agenda</h2>

              <div className="mb-4">
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  placeholder="Ingresa texto"
                  value={inputText}
                  onChange={handleTextChange}
                />
              </div>

              <div className="mb-4">
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedOption}
                  onChange={handleSelectChange}
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
