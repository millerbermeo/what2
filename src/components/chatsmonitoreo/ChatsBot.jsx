import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import baseURL from '../BaseUrl';

function ChatsBot() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/chat_business2/Dashboard/Dashboard/chats_bot.php`);
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

    return (
        <div className='w-[90%] 2xl:w-[480PX] h-[500px] 2xl:h-[700px] border rounded-lg overflow-hidden shadow-2xl shadow-gray-200'>

        <div className='w-full h-10 flex justify-center items-center bg-blue-900 text-white'>
            <h3 className='text-xl font-medium'>Chats de WhatsApp</h3>
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
                            <p className='text-sm 2xl:text-base h-10 2xl:h-12 overflow-hidden text-gray-500 break-all mb-1'>{chat.men ? chat.men : 'No hay mensaje'}</p>

                        </div>
    
                        <span className='absolute right-0 -bottom-1 text-[11px] font-semibold text-gray-500 -z-10'>{chat.fecha}</span>
                        <div className='border-b w-full h-1 absolute -bottom-1 -z-10'></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatsBot;
