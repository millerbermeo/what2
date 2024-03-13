import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import baseURL from '../BaseUrl';


function ModalPassword() {
    const [isOpen, setIsOpen] = useState(false);
    const [Campo, setCampo] = useState(false)


    const passwordActual = useRef()
    const passwordNueva = useRef()
    const passworrepetir = useRef()

    const toggleModal = () => {
        setIsOpen(!isOpen);
        setCampo(false)
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
    const user2 = JSON.parse(localStorage.getItem('user2'));

        const displayUser = user.number_a ? user.number_a : user2.number_a;



        if (passwordNueva.current.value == passworrepetir.current.value) {
            console.log("las contraseñas coinciden")
            setCampo(false)
        } else {
            console.log("las contraselas no coinciden")
            setCampo(true)
            return ;
        }


        try {
            const formData = new FormData();
            formData.append('pass', passwordActual.current.value);
            formData.append('newpass', passwordNueva.current.value);
            formData.append('number_a', displayUser);


            const response = await axios.post(`${baseURL}/chat_business2/Dashboard/Dashboard/api_change_pass.php`, formData)

            setIsOpen(false);
            console.log(response.data);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);

        }



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
                                    <input type="password" id="pass" name="pass" ref={passwordActual} placeholder="Ingrese su contraseña actual" className="border p-3 pl-10 w-full rounded-lg" />
                                    <span className='absolute left-3 top-1 text-[20px] text-gray-500'>
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                </div>
                            </div>

                            {/* Nueva Contraseña */}
                            <div className="mb-6 relative">
                                <label htmlFor="pass2" className="mb-2 block text-gray-600 font-medium">Nueva Contraseña</label>
                                <div className="relative">
                                    <input type="password" id="pass2" name="pass2" ref={passwordNueva} placeholder="Ingrese su nueva contraseña" className="border p-3 pl-10 w-full rounded-lg" />
                                    <span className='absolute left-3 top-1 text-[20px] text-gray-500'>
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                </div>
                            </div>

                            {/* Repetir Contraseña */}
                            <div className="mb-6 relative">
                                <label htmlFor="pass3" className="mb-2 block text-gray-600 font-medium">Repetir Contraseña</label>
                                <div className="relative">
                                    <input type="password" id="pass3" ref={passworrepetir} name="pass3" placeholder="Repita su nueva contraseña" className="border p-3 pl-10 w-full rounded-lg" />
                                    <span className='absolute left-3 top-1 text-[20px] text-gray-500'>
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                </div>
                            </div>

                            {Campo && (
                <div className='text-lg font-normal w-full py-1 bg-red-500 p-2 my-2 rounded'>
                  Las contraseñas no coinciden
                </div>
              )}

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
