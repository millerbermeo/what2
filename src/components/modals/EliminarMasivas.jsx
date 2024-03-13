import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import baseURL from '../BaseUrl';


function EliminarMasivas({id}) {
    const [showModal, setShowModal] = useState(false);


    const log = () => {
        setShowModal(true);
    }

    const salir = async () => {

        try {

            const formData = new FormData();
            formData.append('id', id);


            // Realizar la solicitud POST con Axios
            axios.post(`${baseURL}/chat_business2/Dashboard/Dashboard/api_delete_p_masiva.php`, formData)
                .then(response => {
                    console.log(response.data)

                })
                .catch(error => {
                    // Manejar errores
                    console.error('Error al hacer la solicitud:', error);

                });
   
            setShowModal(false);

        } catch (error) {
            console.error('Error al realizar la petición POST:', error);
            setShowModal(false);
        }

    };

    return (
        <>
            <div className='text-2xl cursor-pointer hover:text-red-600' onClick={log}>
            <FontAwesomeIcon icon={faTrash} />
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white text-black p-12 rounded shadow-lg flex items-center flex-col">
                        <p className='text-xl text-black font-bold'>¿Seguro que Desactivar La plantilla?</p>

                        <div className='flex gap-4 mt-3'>
                            <button className='text-lg' onClick={() => setShowModal(false)}>Cancelar</button>

                            <button onClick={salir} className="relative text-lg inline-block px-4 py-2 font-medium group">
                                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                <span className="relative text-black group-hover:text-white">Confirmar</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}


export default EliminarMasivas