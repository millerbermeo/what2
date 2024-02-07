import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import React, { useEffect, useState, useRef } from 'react';
import ModalChat from '../modals/ModalChat';
import ModalAgenda from '../modals/ModalAgenda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faFlag } from '@fortawesome/free-solid-svg-icons';
import ModalLeft from '../modals/ModalLeft';
import ModalName from '../modals/ModalName';
import ModalBot from '../modals/ModalBot';
import ModalContact from '../modals/ModalContact';
import ModalGroup from '../modals/ModalGroup';
import AddAgente from '../modals/AddAgente';



const ChatSidebar = ({ onClicEnDiv }) => {

    const isSmallScreen = useMediaQuery({ minWidth: 769 });
    const newMessageSoundRef = useRef(new Audio('sonido1.mp3'));
    const [elementoSeleccionado, setElementoSeleccionado] = useState(null);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [divStyle, setDivStyle] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOptionFromModal, setSelectedOptionFromModal] = useState(null);
    const [numeroSeleccionado, setNumeroSeleccionado] = useState(null);
    const [nameSeleccionado, setNameSeleccionado] = useState('');
    const [mostrar, setMostrar] = useState(true)
    const [filtroActivo, setFiltroActivo] = useState('filtro1'); // Estado para el filtro activo
    const [filtroNoLeidos, setFiltroNoLeidos] = useState(false);


    const handleDivClick = () => {
        // Actualiza el estilo del div al hacer clic
        setDivStyle({
            display: isSmallScreen ? 'flex' : 'none',
            // Otros estilos...
        });

    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };


    


    const handleSelectedOption = (selectedOption, name1) => {
        // Realiza la lógica con el valor de selectedOption aquí
        // console.log('Valor seleccionado en el componente principal:', name1.name);
        // Actualiza el estado o realiza otras operaciones según tus necesidades
        setSelectedOptionFromModal(selectedOption);

        // Utiliza el valor directamente en handleClick
        handleClick(selectedOption, name1.name);
        onClicEnDiv(selectedOption, name1.name)
        setElementoSeleccionado(selectedOption)
    }



    const handleClick = (numberw, name) => {
        setNumeroSeleccionado(numberw);
        setNameSeleccionado(String(name));
    };


    const formatFecha = (fechaCompleta) => {
        const fecha = new Date(fechaCompleta);
        const hora = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        const ahora = new Date();

        // Establecer ambas fechas a medianoche para ignorar las horas
        fecha.setHours(0, 0, 0, 0);
        ahora.setHours(0, 0, 0, 0);

        const tiempoTranscurrido = ahora - fecha;

        if (tiempoTranscurrido < 24 * 60 * 60 * 1000) {
            // Menos de 24 horas, mostrar solo la hora
            return `${hora}:${minutos}`;
        } else if (tiempoTranscurrido < 48 * 60 * 60 * 1000) {
            // Entre 24 y 48 horas, mostrar "Ayer" sin la hora
            return 'Ayer';
        } else if (tiempoTranscurrido < 7 * 24 * 60 * 60 * 1000) {
            // Menos de una semana, mostrar el nombre del día
            const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            const nombreDia = diasSemana[fecha.getDay()];
            return nombreDia;
        } else {
            // Más de una semana, mostrar la fecha completa
            return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            try {

                const user = JSON.parse(localStorage.getItem('user'));
                const number_a = user && user.number_a;


                const formData = new FormData();
                formData.append('number_a', number_a);

                const response = await axios.post('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_chats_agente.php', formData);
                // Mapea los datos y formatea la fecha
                const formattedData = response.data.map(item => ({
                    ...item,
                    fecha: formatFecha(item.fecha),
                }));
                // console.log(data)
                setData(formattedData);
                const newMessages = formattedData.filter((item) => !data.some((existingItem) => existingItem.id === item.id));
                const uniqueNewMessages = newMessages.filter((item) => !data.some((existingItem) => existingItem.id === item.id));


                if (uniqueNewMessages.b1 = "1") {

                }
                if (uniqueNewMessages.length > 0) {

                    let b1Value = uniqueNewMessages[0].b1;


                    if (b1Value === "1") {
                        newMessageSoundRef.current.play();
                    }

                }

                setData((prevData) => {
                    // Filtra los nuevos mensajes para eliminar duplicados
                    const uniqueNewMessages = formattedData.filter(item => !prevData.some(existingItem => existingItem.id === item.id));
                
                    // Actualiza el estado agregando los nuevos mensajes únicos
                    return [...prevData, ...uniqueNewMessages];
                });
                
            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }
        };

        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);


    }, [data]);



    useEffect(() => {
        const fetchData2 = async () => {
            try {

                const user = JSON.parse(localStorage.getItem('user'));
                const number_a = user && user.number_a;

                const formData = new FormData();
                formData.append('number_a', number_a);

                const response = await axios.post('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_chats_grupo.php', formData);
                // Mapea los datos y formatea la fecha
                const formattedData = response.data.map(item => ({
                    ...item,
                    fecha: formatFecha(item.fecha),
                }));


                setData2((prevData) => {
                    // Filtra los nuevos mensajes para eliminar duplicados
                    const uniqueNewMessages = formattedData.filter(item => !prevData.some(existingItem => existingItem.id === item.id));
                
                    // Actualiza el estado agregando los nuevos mensajes únicos
                    return [...prevData, ...uniqueNewMessages];
                });
                
            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }
        };

        const intervalId = setInterval(fetchData2, 1000);

        return () => clearInterval(intervalId);



    }, [data2]);

   

    // Función para manejar el clic en "NO LEIDOS"
    const handleMostrarTodosClick = () => {
        setFiltroActivo('filtro1'); // Establece el filtro activo al primer filtro
        setFiltroNoLeidos(false); // Desactiva el filtro de "NO LEÍDOS"
        setMostrar(true);
    };
    
    // Función para manejar el clic en "NO LEIDOS"
    const handleNoLeidosClick = () => {
        setFiltroNoLeidos(true); // Cambia el estado de filtroNoLeidos
        setFiltroActivo('filtro1'); 
        setMostrar(true);
    };
    

    // Filtra los datos según los criterios
    const filteredData = data.filter((item) => {
        return (
            (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.numberw.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!filtroNoLeidos || item.b1 === "1")
        );
    });

    const filteredData2 = data2.filter((item) => {
        return (
            (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.numberw.toLowerCase().includes(searchTerm.toLowerCase()))

        //     (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        //     item.numberw.toLowerCase().includes(searchTerm.toLowerCase())) &&
        // (!filtroNoLeidos || item.b1 === "1")
        );
    });


    const datosFiltrados = filtroActivo === 'filtro1' ? filteredData : filteredData2;



    const handleCambiarEndopoint = () => {
 
        setFiltroActivo('filtro2');
        setMostrar(false)
    }


    return (
        <>
            <div style={divStyle} className="w-full lg:w-[680px] h-screen lg:h-[95vh] lg:z-10 bg-gray-200 mb-96 md:mb-0  border-r flex flex-col items-center border-gray-300 shadow-lg p-3">
                <div className='flex justify-start 2xl:justify-center gap-[20px] items-center w-full  md:-z-10'>
                    <div className='w-[45px]'>
                        <img className='bg-transparent' src="logologo.png" alt="" />
                    </div>
                    <div className='w-[50%]'>
                        <ModalAgenda onSelectedOption={handleSelectedOption} />
                    </div>
                    <div className='w-[50%]'>
                        <ModalContact />
                    </div>

                    <div className='w-[50%]'>
                        <ModalChat />
                    </div>
                </div>

                <div className='bg-[#fff] h-8 rounded my-2 md:-z-20 w-full'>

                    <div className="relative mb-3">
                        <input
                            type="search"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder-opacity-100 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
                            id="exampleSearch2"
                            placeholder="Buscar"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                </div>

                <div className='w-full h-10 flex justify-center gap-3 md:-z-20'>
                    <div className='w-[50%] bg-gray-800 hover:bg-gray-900 grid place-content-center font-bold text-white rounded cursor-pointer' onClick={handleMostrarTodosClick}>
                        <span>TODOS</span>
                    </div>
                    <div className='w-[50%] bg-slate-500 hover:bg-slate-800 grid place-content-center font-bold text-white rounded cursor-pointer' onClick={handleNoLeidosClick}>
                        <span className='uppercase'>NO LEíDOS</span>
                    </div>

                    <div className='w-[50%] bg-gray-800 hover:bg-gray-900 grid place-content-center font-bold text-white rounded cursor-pointer' onClick={handleCambiarEndopoint}>
                        <span className='uppercase'>Grupos</span>
                    </div>

                </div>



                <div className='w-full h-[60vh] md:h-[75%] 2xl:h-[90%] overflow-auto custom-scrollbar2 lg:-z-20 mt-3 bg-white rounded-xl pb-10 md:pb-2'>
                    {datosFiltrados.map((item, index) => (
                        <div
                            key={index}
                            className={`flex gap-2 w-full px-2 border-b border-gray-300 relative justify-center items-center hover:bg-gray-300 cursor-pointer ${elementoSeleccionado === item.numberw ? 'bg-gray-300' : ''}`}

                        >
                            <div onClick={() => {
                                handleDivClick()
                                handleClick(item.numberw, item.name);
                                onClicEnDiv(item.numberw, item.name);
                                setElementoSeleccionado(item.numberw);

                            }} className='flex items-center flex-row w-full h-[75px]'>
                                <div className='w-[50px]'>
                                    <img src="user.webp" alt="" />
                                </div>

                                <div className='w-full h-12 overflow-hidden relative pt-6 pl-2'>
                                    <span className='absolute top-1 tex-xs font-semibold h-6 w-44 overflow-hidden text-gray-800'>
                                        {item.name ? item.name : item.numberw}
                                    </span>
                                    <span className='text-[#5f6368] w-[60%] break-all overflow-hidden text-[13.5px]'>
                                        {item.men ? item.men : "Archivo Adjunto"}
                                    </span>
                                </div>
                            </div>

                            <div className={`absolute bg-[#005187] text-xs text-white text-center w-5 flex justify-center items-center rounded-full h-5 right-20 top-[7px] cuadrorojo ${item.b1 === "1" ? 'block' : 'hidden'}`}>
                                <FontAwesomeIcon icon={faFlag} />
                            </div>


                         
                                <div className={`grid grid-cols-2 mr-2 md:mr-0 md:mb-[14px] z-1 gap-x-3 gap-y-[6px]`}>
                                    <div className={`bg-gray-800 text-lg md:text-[15px] ${mostrar ? 'flex' : 'hidden'} hover:bg-black text-white font-bold w-7 h-7 md:w-[22px] md:h-[22px] flex justify-center items-center rounded-full`}>
                                        <ModalBot numero={item.numberw} />
                                    </div>
                                    <div className="bg-gray-800 text-lg md:text-[14.5px] hover:bg-black text-white font-bold w-7 h-7 md:w-[22px] md:h-[22px] flex justify-center items-center rounded-full">
                                        <ModalGroup numero={item.numberw} />
                                    </div>
                                    <div className='bg-green-500 text-lg md:text-[15px] hover:bg-green-600 text-white font-bold w-7 h-7 md:w-[22px] md:h-[22px] flex  justify-center items-center rounded-full'>
                                        <ModalName numero={item.numberw} />
                                    </div>
                                    <div className={`bg-blue-500 text-lg md:text-[15px] ${mostrar ? 'flex' : 'hidden'} hover:bg-blue-600 text-white font-bold w-7 h-7 md:w-[22px] md:h-[22px]  justify-center items-center rounded-full`}>
                                        <ModalLeft numero={item.numberw} />
                                    </div>
                                </div>

                            <span className='absolute right-2 bottom-0 text-[12px] hidden md:flex'>
                                {item.fecha}
                            </span>
                        </div>


                    ))}
                </div>
            </div>
        </>
    );
};

export default ChatSidebar;
