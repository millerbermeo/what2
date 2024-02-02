import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function ChatsBot({api}) {

    const [data, setData] = useState([])

    useEffect(() => {
        try {
            axios.get('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/chats_bot.php').then((response) => {
                setData(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.log("error en la peticion", error)
            })
        } catch (error) {
            console.log("error cliente", error)
        }
    }, [])



    return (
        <div className='w-full 2xl:w-[450px] h-[500px] 2xl:h-[700px] border rounded-lg overflow-hidden shadow-2xl shadow-gray-200'>
        <div className='w-full h-10 flex justify-center items-center bg-blue-900 text-white'>
            <h3 className='text-xl font-medium'>Chats de WhatsApp</h3>
        </div>
    
        <div className='w-full px-2 2xl:px-5 pt-2 h-[100%] overflow-y-auto'>
            {data.map((chat) => (
                <div key={chat.id} className='flex relative items-center justify-between h-20'>
                    <div className='flex items-start gap-3'>
                        <span className='text-4xl text-gray-900'>
                            <FontAwesomeIcon icon={faCircleUser} />
                        </span>
                        <div className='-z-10'>
                            <h4 className='font-semibold'>{chat.numberw}</h4>
                            <p className='text-sm h-10 overflow-hidden text-gray-500 break-all mb-1'>{chat.men ? chat.men : 'No hay mensaje'}</p>
                        </div>
                    </div>


                    <span className='absolute right-0 -bottom-1 text-[11px] font-semibold text-gray-500 -z-10'>{chat.fecha}</span>
                    <div className='border-b w-full h-1 absolute -bottom-1 -z-10'></div>
                </div>
            ))}
        </div>
    </div>
    
    )
}

export default ChatsBot