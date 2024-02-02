import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ModalContact = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [Campo, setCampo] = useState(false)
    const [Campo2, setCampo2] = useState(false)

    const nombre = useRef()
    const numero = useRef()


    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setCampo(false);
        setCampo2(false);
    };

    const guardarNombre = (e) => {

        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const number_a = user && user.number_a;

        const nombreValue = nombre.current.value.trim(); // Trim removes leading and trailing whitespaces
        const numeroValue = numero.current.value;

        // Check if the user has written something
        if (!nombreValue) {
            // Optionally, you can show an error message or handle it as needed
            console.error('Please enter a name before saving.');
            setCampo(true);
            return;
        } else {
            setCampo(false);
        }

        if (!numeroValue) {
            // Optionally, you can show an error message or handle it as needed
            console.error('Please enter a name before saving.');
            setCampo2(true);
            return;
        } else {
            setCampo(false);
        }

        const formData = new FormData();
        formData.append('numberw', numeroValue);
        formData.append('nombre', nombreValue);
        formData.append('number_a', number_a);

        console.log(formData)

        // Make the POST request
        axios.post('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_save_name.php', formData)
            .then(response => {
                // Handle the response
                console.log('Response:', response.data);
                setIsOpen(false);
                setCampo2(false);
                setCampo(false);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
                setIsOpen(false);
                setCampo2(false);
                setCampo(false);
            });

    }



    return (
        <div>

            <div>
                <button
                    onClick={openModal}
                    className="w-full gap-2 md:gap-5 bg-[#005187] text-sm text-[#ccc] hover:bg-[#005187]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg py-2.5 2xl:py-3 text-center flex justify-center items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40"
                >
                    <span>
                        Contacto
                    </span>
                    <FontAwesomeIcon icon={faAddressBook} />
                </button>
            </div>

            {isOpen && (
                <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 md:p-0">
                    <div className="bg-white w-96 p-4 rounded shadow-lg z-50">
                        <h2 className="text-2xl text-black font-semibold mb-4 text-center">Guardar Contacto</h2>

                        <form action="" method="post">

                            <div className="mb-4 text-black text-lg font-normal">

                                <label htmlFor="nombre">Ingrese el Nombre</label>
                                <input
                                    type='text'
                                    placeholder='Nombre'
                                    required
                                    id='nombre'
                                    ref={nombre}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                                />

                            </div>

                            {Campo && (
                                <div className='text-lg font-normal absolut w-full text-white bg-red-500 py-1 px-2 rounded my-2'>
                                    Campo Requerido
                                </div>
                            )}

                            <div className="mb-4 text-black text-lg font-normal">

                                <label htmlFor="numero">Ingrese el Número</label>
                                <input
                                    type='number'
                                    placeholder='Numero'
                                    required
                                    id='numero'
                                    ref={numero}
                                    className="w-full p-2 border mt-1 border-gray-300 rounded"
                                />

                            </div>
                            {Campo2 && (
                                <div className='text-lg font-normal absolut w-full text-white bg-red-500 py-1 px-2 rounded my-2'>
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



export default ModalContact



