import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStop, faDownload, faFile, faMicrophone, faUserTie, faCloudArrowUp, faIcons, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Logout from '../modals/Logout';
import AudioRecorder from '../grabacion/AudioRecorder';
import InfoUser from '../othercomponents/InfoUser';



import { ReactMic } from 'react-mic';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import LineSound from '../grabacion/LineSound';
import RecorderSound from '../grabacion/RecorderSound';
import baseURL from '../BaseUrl';




function ChatMenssage({ numeroSeleccionado, nameSeleccionado }) {
  const [mensajes, setMensajes] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [scrollRef, setScrollRef] = useState(null);
  const [mostrarDiv, setMostrarDiv] = useState(false);
  const [mostrarPlantilla, setMostrarPlantilla] = useState(false);
  const [emojiSelected, setEmojiSelected] = useState(false);
  const tipoArchivoRef = useRef(null);
  const lastMessageRef = useRef(null);
  const [shouldScrollToLast, setShouldScrollToLast] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false); // Nuevo estado
  const [textoPorDefecto, setTextoPorDefecto] = useState('Texto por defecto');
  const [options, setOptions] = useState([]);
  const audioRef = useRef(null);

  // Función para obtener el valor del audio
  const obtenerValorAudio = () => {
    // Accede al elemento de audio a través de la referencia
    const audioElement = audioRef.current;

    // Verifica si el elemento de audio existe
    if (audioElement) {
      // Accede al atributo 'src' del elemento de audio para obtener la URL del audio
      const audioURL = audioElement.src;

      // Haz algo con la URL del audio
      console.log('URL del audio:', audioURL);
    }
  };


  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'src/components/chatss/app.js'; // Reemplaza esto con la ruta correcta hacia tu archivo app.js
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // console.log("----------------");
  // console.log(nameSeleccionado);
  // console.log("----------------");



  const formatFecha = (fechaCompleta) => {
    const fecha = new Date(fechaCompleta);
    let hora = fecha.getHours();
    const minutos = fecha.getMinutes().toString().padStart(2, '0');

    // Determinar si es AM o PM
    const ampm = hora >= 12 ? 'p. m.' : 'a. m.';

    // Convertir a formato de 12 horas
    hora = hora % 12 || 12;

    return `${hora}:${minutos} ${ampm}`;
  };






  const handleEmojiClick = (emoji) => {
    // Agregar el emoji seleccionado al texto del input
    const input = mensajeInputRef.current;
    const cursorPosition = input.selectionStart;
    const textBeforeCursor = input.value.substring(0, cursorPosition);
    const textAfterCursor = input.value.substring(cursorPosition);
    const newText = textBeforeCursor + emoji.native + textAfterCursor;

    // Actualizar el estado del input
    mensajeInputRef.current.value = newText;

    // Mover el cursor después del emoji insertado
    const newCursorPosition = cursorPosition + emoji.native.length;
    mensajeInputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
    mensajeInputRef.current.focus();
    setEmojiSelected(true);
  };

  const toggleDiv = () => {
    setMostrarDiv(!mostrarDiv);
  };

  const mensajeInputRef = useRef(null);
  const archivoInputRef = useRef(null);
  const mensajePlantilla = useRef(null);
  const audio123 = useRef();

  useEffect(() => {
    // Realiza la solicitud utilizando Axios
    axios.get('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_plantillas_saludo.php')
      .then(response => {
        // Actualiza el estado con las opciones del select
        setOptions(response.data);
      })
      .catch(error => {
        // Maneja errores aquí
        console.error('Error al realizar la solicitud:', error);
      });
  }, []);


  const enviarMensajePlantilla = async () => {
    const menPlant = mensajePlantilla.current?.value;

    const user = JSON.parse(localStorage.getItem('user'));
    const number_a = user && user.number_a;

    // Validación para permitir continuar con el código
    // if (menPlant === null || menPlant === undefined) {
    //   console.warn('menPlant es null o undefined. El mensaje se enviará sin menPlant.');
    // }

    const formData = new FormData();
    formData.append('numberw', numeroSeleccionado);
    formData.append('nombre_p', menPlant);
    formData.append('number_a', number_a);

    // Realiza la solicitud POST utilizando Axios
    axios.post(`${baseURL}/chat_business2/Dashboard/Dashboard/api_send_tamplate_s.php`, formData)
      .then(response => {
        // Maneja la respuesta del servidor aquí
        console.log(response.data);
      })
      .catch(error => {
        // Maneja errores aquí
        console.error('Error al realizar la solicitud:', error);
      });

    setMostrarPlantilla(!mostrarPlantilla);

  }


  const cerarPlantilla = () => {
    setMostrarPlantilla(false);
  }


  const enviarMensaje = async () => {
    try {
      setLoading(true);
      setMostrarDiv(false);



      const selectedFile = archivoInputRef.current.files[0];
      const type_file = selectedFile ? 'document' : 'text';

      const user = JSON.parse(localStorage.getItem('user'));
      const number_a = user && user.number_a;

      if (numeroSeleccionado === null || numeroSeleccionado === undefined) {
        console.error('El número seleccionado no puede ser null');
        setLoading(false);
        return;
      }

      const formData2 = new FormData();
      formData2.append('numberw', numeroSeleccionado);
      formData2.append('number_a', number_a);

      const trimmedMessage = mensajeInputRef.current.value.trim();
      if (trimmedMessage || selectedFile) {
        formData2.append('message', trimmedMessage);
      } else {
        // Both message and file input are empty, do not send the message
        setLoading(false);
        return;
      }


      formData2.append('type_m', type_file);

      // Agrega el archivo al FormData solo si se selecciona uno
      if (selectedFile && type_file === 'document') {
        formData2.append('document_w', selectedFile);
        setLoading(true);
        setIsFileUploaded(true);
      } else {
        setLoading(false);
      }

      mensajeInputRef.current.value = '';
      archivoInputRef.current.value = '';

      const response = await axios.post(`${baseURL}/chat_business2/Dashboard/Dashboard/api_validar_mensaje.php`, formData2);
      console.log(response);

      console.log('Datos de la respuesta:', response.data);

      if (response.data.trim() === 'Mensaje') {
        setMostrarPlantilla(false);
        await Promise.all([
          enviarMensajeEnSegundoPlano(formData2),
          cargarArchivo(selectedFile),
        ]);
      }



      if (response.data.trim() === 'Plantilla') {
        setMostrarPlantilla(!mostrarPlantilla);
      }


      setShouldScrollToLast(true);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    } finally {
      setLoading(false);
      setIsFileUploaded(false);
      setEmojiSelected(false);

    }
  };


  // Función para cargar el archivo
  const cargarArchivo = async (file) => {
    try {
      if (file) {
        // Puedes realizar operaciones adicionales relacionadas con la carga del archivo aquí
        console.log('Cargando archivo:', file.name);
      }
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
    }
  };


  // Función para enviar mensajes en segundo plano
  const enviarMensajeEnSegundoPlano = async (formData) => {
    try {
      // Realizar la operación asíncrona
      await axios.post(
        `${baseURL}/chat_business2/Dashboard/Dashboard/api_send_message.php`,
        formData
      );

      // Puedes realizar otras acciones después de enviar el mensaje en segundo plano
    } catch (error) {
      console.error('Error al enviar el mensaje en segundo plano:', error);
    }
  };


  const handleFileInputChange = () => {
    setIsFileUploaded(archivoInputRef.current.files.length > 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Evitar el salto de línea
      enviarMensaje();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!numeroSeleccionado) {
          return;
        }



        const formData = new FormData();
        formData.append('numberw', numeroSeleccionado);


        const response = await axios.post(
          'http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/chats_principal.php',
          formData
        );
        ///
        // PROPUESTA
        // const reversedMessages = response.data.slice(0, 80).reverse();
        // setMensajes(reversedMessages);
        //

        // Invertir el orden de los mensajes antes de establecerlos en el estado
        const reversedMessages = response.data.reverse();
        setMensajes(reversedMessages);


        const prevMessagesLength = mensajes.length;

        // Obtener el último mensaje
        // const ultimoMensaje = reversedMessages[0];


        // if (ultimoMensaje.b1 === "1") {
        //   console.log("hola", ultimoMensaje.men)
        // }

        // Enfocar el último mensaje
        if (lastMessageRef.current && shouldScrollToLast) {
          lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
          setShouldScrollToLast(false); // Desactivar el scroll automático después de la carga inicial
        }

        if (reversedMessages.length > prevMessagesLength) {
          setShouldScrollToLast(true);
        }




      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [numeroSeleccionado, scrollRef, mensajes, nameSeleccionado]);



  const renderMedia = (mensaje) => {

    const horaStyle = {
      position: 'absolute',
      bottom: '-4px',
      fontSize: '11px',
      color: "#fff",
      fontWeight: "normal"
    };

    if (mensaje.tipo_media === 'image') {
      return (
        <div className="relative">
          <img
            src={mensaje.url}
            alt="Imagen"
            className="max-w-[200px] h-[200px] relative  object-contain cursor-pointer"
            onClick={() => setFullscreenImage(mensaje.url)}
            style={mensaje.b1 === '1' ? { right: '-16px' } : { left: '-16px' }}
          />
          <div className="absolute bottom-2" style={mensaje.b1 === '1' ? { right: '-10px' } : { left: '-10px' }}>
            <a target='_blank' href={mensaje.url} download>
              <button className="bg-[#005187] hover:bg-[#005187]/80 text-white font-bold px-2 py-1 rounded">
                <FontAwesomeIcon icon={faDownload} />
              </button>
            </a>
          </div>
        </div>
      );
    } else if (mensaje.tipo_media === 'document') {
      return (
        <a target='_blank' href={mensaje.url} download>
          <button className="w-[120px] relative h-[40px] text-black px-4 py-2 rounded">
            <span className='break-all overflow-y-hidden flex flex-wrap h-5 overflow-ellipsis'>
              {mensaje.men}
            </span>
            <span className='absolute top-0' style={mensaje.b1 === '1' ? { right: '-20px' } : { left: '-20px' }}>
              <FontAwesomeIcon icon={faFile} className="text-3xl text-white" />
            </span>
          </button>
        </a>

      );
    } else if (mensaje.tipo_media === 'video') {
      return (
        <div className='relative'>
          <video controls className="w-[200px] h-auto relative object-contain cursor-pointer" style={mensaje.b1 === '1' ? { right: '-16px' } : { left: '-16px' }}>
            <source src={mensaje.url} type="video/mp4" />
            <source src={mensaje.url} type="video/webm" />
            <source src={mensaje.url} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (mensaje.tipo_media === 'voice') {
      return (
        <div className='relative'>
          <audio controls className="cursor-pointer relative w-[200px]" style={mensaje.b1 === '1' ? { right: '-16px' } : { left: '-16px' }}>
            <source src={mensaje.url} type="audio/mp3" />
            Your browser does not support the audio tag.
          </audio>
        </div>
      );
    } else if (mensaje.tipo_media === 'sticker') {
      // Handle sticker rendering (ajusta el código según tu implementación de stickers)
      return (
        <div className='relative'>
          <img
            src={mensaje.url}
            alt="Sticker"
            className="max-w-[100px] relative h-auto object-contain cursor-pointer"
            onClick={() => setFullscreenImage(mensaje.url)}
            style={mensaje.b1 === '1' ? { right: '-16px' } : { left: '-16px' }}
          />
        </div>
      );
    } else {

      return (
        <div className='relative pb-1 break-words px-2'>
          {mensaje.men} <span className='translate-y-[4px] ' style={mensaje.b1 === '1' ? { ...horaStyle, right: '-32px ' } : { ...horaStyle, left: '-32px ' }}>{formatFecha(mensaje.fecha)}</span>
        </div>
      );
    }
  };

  const esMismoDia = (fecha1, fecha2) => {
    const date1 = new Date(fecha1);
    const date2 = new Date(fecha2);
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const formatFecha2 = (fechaCompleta) => {
    const fechaMensaje = new Date(fechaCompleta);
    const fechaActual = new Date();

    if (esMismoDia(fechaActual, fechaMensaje)) {
      // Si es el mismo día, devuelve "Hoy"
      return 'Hoy';
    }

    // Crear una copia de la fecha actual para evitar modificaciones no deseadas
    const fechaAyer = new Date(fechaActual);
    fechaAyer.setDate(fechaAyer.getDate() - 1);

    if (esMismoDia(fechaAyer, fechaMensaje)) {
      // Si es el día anterior, devuelve "Ayer"
      return 'Ayer';
    }

    // Para días anteriores, devuelve la fecha completa
    return fechaMensaje.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getTextoFecha = (fechaCompleta) => {
    const fechaMensaje = new Date(fechaCompleta);
    const fechaActual = new Date();

    // Establecer ambas fechas a medianoche para ignorar las horas
    fechaMensaje.setHours(0, 0, 0, 0);
    fechaActual.setHours(0, 0, 0, 0);

    const diffDias = Math.floor(Math.abs((fechaActual - fechaMensaje) / 864e5)); // Redondear hacia abajo para obtener días enteros
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (diffDias === 0) {
      // Si la diferencia es cero, devuelve "Hoy"
      return 'Hoy';
    } else if (diffDias === 1) {
      // Si la diferencia es uno, devuelve "Ayer"
      return 'Ayer';
    } else if (diffDias > 1 && diffDias <= 7) {
      // Si han pasado más de 1 día y menos de 7 días, devuelve el día de la semana en formato local
      return fechaMensaje.toLocaleDateString('es-ES', { weekday: 'long', timeZone: timeZone });
    } else {
      // Si han pasado más de 7 días, devuelve la fecha completa en formato local
      return formatFecha2(fechaCompleta);
    }
  };


  const userAgente = JSON.parse(localStorage.getItem('user'));

  const primerNombre = userAgente && userAgente.name ? userAgente.name.split(' ')[0] : '';


  const [selectedTemplateContent, setSelectedTemplateContent] = useState(null);

  // ... (resto del código)

  const handleTemplateSelect = (event) => {
    const selectedTemplateName = event.target.value;
    const selectedTemplate = options.find((option) => option.nombre === selectedTemplateName);

    // Actualiza el estado con el contenido de la plantilla seleccionada
    setSelectedTemplateContent(selectedTemplate ? selectedTemplate.contenido : null);
  };


  const handleReloadPage = () => {
    window.location.reload();
  };

  function cambiarNombreAleatorioYAccederPropiedades(audioBlob) {
    // Generar un nombre aleatorio
    const nombreAleatorio = 'audio_' + Math.random().toString(36).substring(7) + '.mp3';

    // Crear un nuevo blob con el mismo contenido pero con el nombre aleatorio
    const nuevoBlob = new Blob([audioBlob], { type: audioBlob.type });

    // Asignar el nombre aleatorio al nuevo blob
    nuevoBlob.name = nombreAleatorio;

    // Acceder a las propiedades del blob
    console.log("Nombre del archivo: ", nuevoBlob.name);
    console.log("Tipo de archivo: ", nuevoBlob.type);
    console.log("Tamaño del archivo: ", nuevoBlob.size, "bytes");

    // Devolver el nuevo blob con el nombre cambiado
    return nuevoBlob;
  }



  const enviarMensajeEnSegundoPlano2 = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const number_a = user && user.number_a;

      // Generar un nombre aleatorio para el archivo de audio
      const nombreAleatorio = Math.random().toString(36).substring(7);

      // Crear un nuevo objeto FormData
      const formData2 = new FormData();
      formData2.append('numberw', numeroSeleccionado);
      formData2.append('message', 'hola466666');
      formData2.append('number_a', number_a);
      formData2.append('type_m', 'voice');

      // Obtener el Blob de audio
      const nuevoBlob = cambiarNombreAleatorioYAccederPropiedades(audioBlob);

      console.log(nuevoBlob)
      // Adjuntar el blob de audio al FormData con el nombre aleatorio
      formData2.append('document_w', nuevoBlob);

      // Envía la solicitud POST con el FormData que incluye el archivo de audio WAV
      const response = await axios.post(
        `${baseURL}/chat_business2/Dashboard/Dashboard/api_send_message.php`,
        formData2
      );

      setAudioBlob('')
      console.log(response.data);
    } catch (error) {
      console.error('Error al enviar el mensaje en segundo plano:', error);
    }
  };



  function limpiarAudio() {
    setAudioBlob('');
  }

  // const intervaloLimpiarAudio = setInterval(limpiarAudio, 25000); 


  const [isRecording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);





  const [reproduciendo, setReproduciendo] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false); // Nuevo estado para controlar la visibilidad de RecorderSound

  // useEffect(() => {
  //     if (audioBlob) {
  //         // Descargar el archivo una vez que se haya completado la grabación
  //         downloadAudio();
  //     }
  // }, [audioBlob]);

  const onStart = () => {
    try {
      setAudioBlob(null);
      setRecording(true);
      setShowRecorder(true); // Mostrar RecorderSound al comenzar a grabar
      console.log('Comenzando la grabación...');
    } catch (error) {
      console.log('no funcionó', error);
    }
  };

  const onStop = (recordedBlob) => {
    setRecording(false);
    setShowRecorder(false); // Ocultar RecorderSound al terminar de grabar
    console.log('Grabación completada:', recordedBlob);
    setAudioBlob(recordedBlob.blob);
  };

  const toggleRecording = () => {
    setAudioBlob(null);
    setReproduciendo(false)
    if (isRecording) {
      // Si ya está grabando, detener la grabación
      setRecording(false);
      setShowRecorder(false);
    } else {
      // Si no está grabando, iniciar la grabación
      setRecording(true);
      setShowRecorder(true);
    }
  };

  const reproducirAudio = () => {
    setRecording(false);
    setShowRecorder(false);

    if (audioRef.current) {
      if (reproduciendo) {
        audioRef.current.pause();
        setReproduciendo(false);
      } else {
        audioRef.current.play();
        setRecording(false); // Detener grabación al reproducir
        setReproduciendo(true);
      }
    }
  };

  // const downloadAudio = () => {
  //     const url = URL.createObjectURL(audioBlob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'grabacion_audio.mp3'); // Nombre del archivo a descargar
  //     document.body.appendChild(link);
  //     link.click();
  // };


  // style={{ backgroundImage: "url('background2.png')", backgroundSize: "cover" }}

  return (
    <>
      <div className='w-full md:w-[95%] h-[85vh]  md:h-[95vh] shadow-lg relative z-auto flex flex-col bg-gray-100 lg:bg-gray-200'>
        {/* ... (resto del código) */}
        <div className='absolute top-0 w-full hidden lg:flex h-12 justify-between items-center px-5'>
          <div>
            <div className='flex gap-2 items-end relative'>
              <InfoUser numero={numeroSeleccionado} nombre={nameSeleccionado} />
              <img className='w-[30px] rounded-full' src="negociemos.jpg" alt="" />
              <span className='font-normal'>{nameSeleccionado ? nameSeleccionado : numeroSeleccionado ? numeroSeleccionado : "Distribuidora Negociemos"}</span>
            </div>
          </div>

          <div className='flex gap-5 mt-2 items-center text-sm'>
            <span>{primerNombre}</span>
            <Logout />
          </div>


        </div>
        <div className="w-full mt-5 lg:mt-14 pb-[15px] h-[100%] overflow-y-scroll custom-scrollbar3 px-4 md:px-12 bg-gray-100" ref={(ref) => setScrollRef(ref)}>
          {mostrarPlantilla ?
            <div className='fixed w-full h-screen flex items-center justify-center left-0 top-0 z-10 bg-black/50'>
              <div>
                <div className="max-w-md w-96 mx-auto p-4 bg-white rounded-md shadow-md mb-4">
                  {/* Otros elementos del formulario */}
                  <label htmlFor="inputTexto" className="block my-2 text-base font-normal text-gray-600">
                    Seleccionar Plantilla
                  </label>
                  {/* Cambia el input a un select */}
                  <select
                    id="inputTexto"
                    name="inputTexto"
                    ref={mensajePlantilla}
                    onChange={handleTemplateSelect}

                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option value="">
                      Selecciona una opción
                    </option>
                    {/* Mapea las opciones del estado para llenar el select */}
                    {options.map(option => (
                      <option key={option.id} value={option.nombre}>
                        {option.nombre}
                      </option>
                    ))}
                  </select>

                  <div className='my-3 shadow p-2 bg-gray-100'>
                    {selectedTemplateContent}
                  </div>

                  <div className='flex gap-2 justify-end'>
                    <button
                      onClick={cerarPlantilla}
                      className="mt-4 bg-gray-500 w-[90px] text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      Cerrar
                    </button>

                    {/* Botón de envío */}
                    <button
                      onClick={enviarMensajePlantilla}
                      type="submit"
                      className="mt-4 bg-blue-500 w-[90px] text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </div> : ''
          }

          <div className='absolute bottom-16 left-[40px] flex items-center flex-col z-50'>
            {mostrarDiv ?
              <Picker data={data} onEmojiSelect={handleEmojiClick} /> : ''}
          </div>

          <ul className="mb-16 md:mb-0">
            {mensajes.map((mensaje, index) => (
              <React.Fragment key={index}>
                {index === 0 || !esMismoDia(mensaje.fecha, mensajes[index - 1].fecha) ? (
                  <div key={`fecha-${index}`} className="text-center mt-5 mb-2 rounded w-full flex justify-center text-gray-600">
                    <span className='bg-gray-200 font-medium px-1 rounded'>
                      {getTextoFecha(mensaje.fecha)}
                    </span>
                  </div>
                ) : null}

                <li
                  key={`mensaje-${index}`}
                  className={`flex items-end justify-${mensaje.b1 === '2' ? 'end' : 'start'} py-2 gap-2`}
                  ref={index === mensajes.length - 1 ? lastMessageRef : null}
                >
                  {mensaje.b1 === '2' ? (
                    <>
                      <div key={`media-${index}`} className="text-black break-all text-[15px] shadow bg-[#84b6f4]  flex-wrap flex max-w-[65%] rounded-lg p-[7px] pl-10 text-left">
                        {renderMedia(mensaje)}
                      </div>
                      <div key={`icono-usuario-${index}`} className='border border-[#84b6f4] text-2xl w-10 h-10 grid place-items-center text-[#84b6f4] bg-gray-200 rounded-full'>
                        <FontAwesomeIcon icon={faUserTie} className="" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div key={`icono-usuario-${index}`} className='border border-gray-300 text-2xl w-10 h-10 grid place-items-center text-gray-400 bg-gray-200 rounded-full'>
                        <FontAwesomeIcon icon={faUser} className="" />
                      </div>
                      <div key={`media-${index}`} className="text-black text-[15px] min-w-[20px]  rounded-lg break-all shadow bg-gray-300 flex-wrap flex max-w-[65%] p-[7px] pr-10">{renderMedia(mensaje)}</div>
                    </>
                  )}
                </li>
              </React.Fragment>
            ))}

            {fullscreenImage && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90  z-50 flex items-center justify-center" onClick={() => setFullscreenImage(null)}>
                <img
                  src={fullscreenImage}
                  alt="Imagen a pantalla completa"
                  className="w-auto max-w-[70%] h-auto max-h-[90%]"
                />
              </div>
            )}
          </ul>
          {loading && (
            <div className="text-blue-600 absolute bottom-14 lg:bottom-20 right-20 lg:right-72 gap-2 items-center flex"><span className='text-lg'>
              Enviando... </span> {loading && (
                <div className="animate-spin text-4xl text-blue-500">&#9696;</div>
              )}</div>
          )}
        </div>
        <div className='w-full flex items-center justify-center fixed md:static h-14 bg-gray-200 bottom-0 scale-x-110 2xl:scale-y-[1.02]'>
          <div className="w-[90%] mx-auto p-2 gap-2 flex">
            <button onClick={handleReloadPage} className='flex md:hidden' type='submit'>
              <div className='w-[40px] h-[40px] bg-[#000] rounded-[25px] text-white flex justify-center items-center text-2xl'>
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
            </button>
            <div className="relative w-full text-gray-600">
              <div className='ml-10 absolute -left-8 top-2'>
                <input
                  ref={archivoInputRef}
                  id="fileInput"
                  type="file"
                  accept=".pdf, .jpg, .jpeg, .png, .gif, .mp4, .webm, .ogg"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
                <label htmlFor="fileInput" className={`file-input-label ${isFileUploaded ? 'file-uploaded' : ''}`}>
                  <FontAwesomeIcon icon={faCloudArrowUp} />
                </label>
              </div>
              <div className='ml-10 absolute -left-2 top-2'>
                <button onClick={toggleDiv}>
                  <FontAwesomeIcon icon={faIcons} />
                </button>

                {audioBlob && (
                  <div className={` absolute -top-28 -left-14 md:left-5`}>
                    <button onClick={enviarMensajeEnSegundoPlano2} className='bg-blue-500 text-white font-bold py-2 px-8 cursor-pointer rounded'>Enviar Audio</button>
                    <span onClick={limpiarAudio} className='absolute cursor-pointer hover:bg-gray-200 hover:text-black text-lg text-white -top-3 -right-2 h-6 w-6 flex justify-center items-center bg-gray-600 rounded-full'>x</span>
                  </div>
                )}
              </div>

              <div className='absolute left-14 top-2'>
                <div className='relative flex'>
                  <ReactMic
                    record={isRecording}
                    onStop={onStop}
                    onData={(recordedBlob) => console.log('Datos de la grabación:', recordedBlob)}
                    strokeColor="#000"
                    backgroundColor="transparent"
                    className={`overflow-hidden w-max h-14 absolute  md:left-12  2xl:left-60 -top-20 ${isRecording ? 'hidden' : 'hidden'}`}
                  />
                  {showRecorder && <RecorderSound />} {/* Mostrar RecorderSound cuando se está grabando */}

                  <div className={`mr-2 ${isRecording ? 'text-blue-500' : 'text-gray-600'} focus:outline-none`} onClick={toggleRecording}>
                    <FontAwesomeIcon icon={faMicrophone} />
                  </div>

                  {reproduciendo && <LineSound />} {/* Muestra la animación de línea de sonido si se está reproduciendo */}

                  {audioBlob && (
                    <>
                      <audio
                        controls
                        className='-mt-40 left-40 absolute hidden'
                        ref={audioRef}
                        onEnded={() => setReproduciendo(false)} // Cambiar estado cuando el audio termina de reproducirse
                      >
                        <source src={URL.createObjectURL(audioBlob)} />
                        Tu navegador no soporta la etiqueta de audio.
                      </audio>
                    </>
                  )}


                  <div onClick={reproducirAudio}>
                    <FontAwesomeIcon icon={reproduciendo ? faPause : faPlay} className={`${audioBlob ? 'text-blue-500' : 'text-gray-600'} focus:outline-none`} />
                  </div>
                </div>
              </div>

              <input
                ref={mensajeInputRef}
                onKeyDown={handleKeyDown}
                className="w-full border-2 border-gray-300 bg-white h-10 px-8 pl-28 pr-4 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Escribe algo..."
              />
            </div>
            <button type='submit' onClick={enviarMensaje}>
              <div className='w-[35px] h-[35px] bg-green-500 rounded-[25px] text-white flex justify-center items-center text-2xl'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatMenssage;
