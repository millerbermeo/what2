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
                <div className="fixed inset-0 flex items-center justify-center w-full z-50 p-4 lg:p-0">
                    {/* <div className="absolute inset-0 bg-black opacity-50" onClick={toggleModal}></div> */}
                    <div className="absolute inset-0 bg-black opacity-50" onClick={toggleModal}></div>

                    <div className="bg-white w-[500px] p-6 rounded shadow-lg z-50">
                        <h2 className="text-3xl font-thin mb-6 text-center">Cambiar Contraseña</h2>

                        <form onSubmit={handleSubmit}>
                            {/* Contraseña Actual */}
                            <div className="mb-6 relative">
                                <label htmlFor="pass" className="mb-2 block text-gray-600 font-medium">Contraseña Actual</label>
                                <div className="relative">
                                    <input type="password" id="pass" name="pass" placeholder="Ingrese su contraseña actual" className="border p-3 pl-10 w-full rounded-lg" />
                                    <span className='absolute left-3 top-1 text-[20px] text-gray-500'>
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                </div>
                            </div>

                            {/* Nueva Contraseña */}
                            <div className="mb-6 relative">
                                <label htmlFor="pass2" className="mb-2 block text-gray-600 font-medium">Nueva Contraseña</label>
                                <div className="relative">
                                    <input type="password" id="pass2" name="pass2" placeholder="Ingrese su nueva contraseña" className="border p-3 pl-10 w-full rounded-lg" />
                                    <span className='absolute left-3 top-1 text-[20px] text-gray-500'>
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                </div>
                            </div>

                            {/* Repetir Contraseña */}
                            <div className="mb-6 relative">
                                <label htmlFor="pass3" className="mb-2 block text-gray-600 font-medium">Repetir Contraseña</label>
                                <div className="relative">
                                    <input type="password" id="pass3" name="pass3" placeholder="Repita su nueva contraseña" className="border p-3 pl-10 w-full rounded-lg" />
                                    <span className='absolute left-3 top-1 text-[20px] text-gray-500'>
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={toggleModal}
                                >
                                    Cerrar
                                </button>

                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>


                </div>
            )}
        </>
    );
}

export default ModalPassword;
