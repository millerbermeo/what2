import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';

function ModalPassword() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        // Realiza la lógica para cambiar la contraseña, por ejemplo, enviar los datos al servidor
        // y manejar la respuesta.

        // Limpia los campos después de enviar el formulario
        setCurrentPassword('');
        setNewPassword('');
        setRepeatNewPassword('');
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
                    <div className="absolute inset-0 bg-black opacity-50" onClick={toggleModal}></div>

                    <div className="bg-white w-96 p-4 rounded shadow-lg z-50">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Cambiar Password</h2>


                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="currentPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                    Contraseña Actual
                                </label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            {/* Nueva Contraseña */}
                            <div className="mb-4">
                                <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                    Nueva Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            {/* Repetir Nueva Contraseña */}
                            <div className="mb-6">
                                <label htmlFor="repeatNewPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                    Repetir Nueva Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="repeatNewPassword"
                                    name="repeatNewPassword"
                                    value={repeatNewPassword}
                                    onChange={(e) => setRepeatNewPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
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
