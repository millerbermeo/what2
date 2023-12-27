import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

function ModalPassword() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };



    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div>
                <button onClick={toggleModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded">
                    Cambiar Contraseña
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-end w-full z-50 p-4 lg:p-0">
                                {/* <div className="absolute inset-0 bg-black opacity-50" onClick={toggleModal}></div> */}
                    <div className="absolute inset-0 bg-black opacity-50" onClick={toggleModal}></div>

                    <div className="bg-white w-[500px] p-4 rounded shadow-lg z-50 mr-28">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Cambiar Contraseña</h2>


                        <form onSubmit={handleSubmit}>
                            <div className="mb-5 relative">
                                <label htmlFor="pass" className="mb-2 block  text-gray-500 font-medium">Contraseña Actual</label>
                                <input type="text" id="pass" name="pass" placeholder="password" className="border p-3 pl-9 w-full rounded-lg" />
                                {/* <p class="bg-red-500 text-white my-2 rounded-lg text-sm p-2 text-center">Error, debe ingresar el username</p> */}
                                <span className='absolute left-2 top-10 text-[20px] text-gray-500'>
                                <FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>

                            {/* Nueva Contraseña */}
                            <div className="mb-5 relative">
                                <label htmlFor="pass2" className="mb-2 block  text-gray-500 font-medium">Nueva Contraseña</label>
                                <input type="text" id="pass2" name="pass2" placeholder="password" className="border p-3 pl-9 w-full rounded-lg" />
                                <span className='absolute left-2 top-10 text-[20px] text-gray-500'>
                                <FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>

                            <div className="mb-5 relative">
                                <label htmlFor="pass3" className="mb-2 block  text-gray-500 font-medium">Repetir Contraseña</label>
                                <input type="text" id="pass3" name="pass3" placeholder="password" className="border p-3 pl-9 w-full rounded-lg" />
                                <span className='absolute left-2 top-10 text-[20px] text-gray-500'>
                                <FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>

                        </form>

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
                            >
                                Enviar
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
}

export default ModalPassword;
