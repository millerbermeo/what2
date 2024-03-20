import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import ModalLeft from '../modals/ModalLeft';
import baseURL from '../BaseUrl';
import ModalMensajeUser from './ModalMensajeUser';

function ChatsNoRespondidos() {
    const [data, setData] = useState([]);


        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/chat_business2/Dashboard/Dashboard/chats_no_respondidos.php`);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("error en la petición", error);
            }
        };

        fetchData(); // Ejecutar la primera vez al montar el componente


        const interval = setInterval(fetchData, 60000); // Realizar la petición cada minuto

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const currentDate = new Date();
        const difference = (currentDate - date) / 1000; // Diferencia en segundos
    
        const minutes = Math.floor(difference / 60);
        const hours = Math.floor(minutes / 60);
    
        if (minutes < 60) {
            return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
        } else {
            return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
        }
    };
    

    return (
        <div className='w-[90%]  2xl:w-[480px] h-[500px] 2xl:h-[700px] border rounded-lg overflow-hidden shadow-2xl shadow-gray-200'>
            <div className='w-full h-10 flex justify-center items-center bg-blue-900 text-white'>
                <h3 className='text-xl font-medium'>Chats No Respondidos</h3>
            </div>

            <div className='w-full px-2 2xl:px-5 pt-2 h-[100%] overflow-y-auto custom-scrollbar3 pb-14'>
                {data.map((chat) => (
                    <div key={chat.id} className='flex relative items-center justify-between h-20 pt-2'>
                        <div className='flex items-start gap-3'>
                            <span className='text-4xl text-gray-900 hidden 2xl:flex'>
                                <FontAwesomeIcon icon={faCircleUser} />
                            </span>
                            <div className=''>

                                <h4 className='font-semibold'>{chat.name ? chat.name : chat.numberw}</h4>

                                <p className='text-sm 2xl:text-base h-10 2xl:h-12  overflow-hidden text-gray-500 break-all mb-1'>{chat.men ? chat.men : 'No hay mensaje'}</p>
                            </div>
                        </div>
                        <div className='rounded-full  top-[8px] w-6 h-6 flex justify-center items-center absolute right-0 bg-blue-600 text-white'>
                            <ModalLeft numero={chat.numberw}/>
                         
                        </div>

                        <ModalMensajeUser/>
                        <span className='absolute right-0 bottom-0 text-[11px] font-semibold text-gray-500'>{chat.fecha}</span>


                        {/* Formatea la fecha utilizando JavaScript puro */}
                        <span className='absolute right-0 bg-blue-200 p-0.5 rounded-lg bottom-0 text-[11px] px-1 font-semibold text-black'>
                            {formatDate(chat.fecha)}
                        </span>

                        <div className='border-b w-full h-1 absolute -bottom-1 -z-10'></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatsNoRespondidos;
