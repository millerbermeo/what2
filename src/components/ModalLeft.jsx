import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ModalLeft = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');


  const staticOptions = [
    { value: 'opcion1', label: 'Opción 1' },
    { value: 'opcion2', label: 'Opción 2' },
    { value: 'opcion3', label: 'Opción 3' },
  ];

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
      >

        <FontAwesomeIcon icon={faPaperPlane} />
      </button>

      {isOpen && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
         <div className="bg-white w-96 p-4 rounded shadow-lg z-50">
              <h2 className="text-2xl text-black font-semibold mb-4 text-center">Transferir</h2>

              <form action="" method="post">

                <div className="mb-4 text-black text-lg font-normal">
                  <select
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    {staticOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
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
                    type="submit"
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
