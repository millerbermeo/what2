import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDownload, faFile, faRightFromBracket, faUserTie, faCloudArrowUp, faIcons, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function ChatMenssage({ numeroSeleccionado }) {
  const [mensajes, setMensajes] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [scrollRef, setScrollRef] = useState(null);
  const [mostrarDiv, setMostrarDiv] = useState(false);
  const [emojiSelected, setEmojiSelected] = useState(false);
  const tipoArchivoRef = useRef(null);
  const lastMessageRef = useRef(null);
  const [shouldScrollToLast, setShouldScrollToLast] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false); // Nuevo estado




  const formatFecha = (fechaCompleta) => {
    const fecha = new Date(fechaCompleta);
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `${hora}:${minutos}`;
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



  const enviarMensaje = async () => {
    try {
      setLoading(true);
      setMostrarDiv(false);

      // Accede al valor del input de archivo utilizando la referencia correcta
      const selectedFile = archivoInputRef.current.files[0];

      // Accede al tipo de archivo usando la referencia correcta
      const type_file = selectedFile ? 'document' : 'text';

      const formData2 = new FormData();
      formData2.append('numberw', numeroSeleccionado);

      // Incluso si el mensaje está vacío, agrégalo al FormData
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

        // Update loading state while uploading the document
        setLoading(true);
        setIsFileUploaded(true);
      } else {
        // If it's not a document, reset the loading state
        setLoading(false);

      }

      mensajeInputRef.current.value = '';
      archivoInputRef.current.value = '';
      // Enviar el mensaje y cargar el archivo en paralelo
      await Promise.all([
        enviarMensajeEnSegundoPlano(formData2),
        cargarArchivo(selectedFile),
      ]);

      // Limpiar y permitir enviar más mensajes
      setShouldScrollToLast(true);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    } finally {
      // Clear loading state after the upload is complete or in case of an error
      setLoading(false);
      setIsFileUploaded(false);

      // Restablecer valores
      // También puedes restablecer el estado de otros elementos si es necesario
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
        'http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_send_message.php',
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

        // Invertir el orden de los mensajes antes de establecerlos en el estado
        const reversedMessages = response.data.reverse();
        setMensajes(reversedMessages);
        const prevMessagesLength = mensajes.length;

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
  }, [numeroSeleccionado, scrollRef, mensajes]);

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
            className="max-w-[200px] relative  h-auto object-contain cursor-pointer"
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
        <div className='relative flex break-words'>
          {mensaje.men} <span style={mensaje.b1 === '1' ? { ...horaStyle, right: '-32px' } : { ...horaStyle, left: '-32px' }}>{formatFecha(mensaje.fecha)}</span>
        </div>
      );
    }
  };

  const handleReloadPage = () => {
    window.location.reload();
  };

  // style={{ backgroundImage: "url('background2.png')", backgroundSize: "cover" }}

  return (
    <>
      <div className='w-full md:w-[95%] h-[87vh] md:h-[95vh] shadow-lg relative z-auto flex flex-col bg-gray-100 lg:bg-gray-200'>
        {/* ... (resto del código) */}
        <div className='absolute top-0 w-full hidden lg:flex h-12 justify-between items-center px-5'>
          <div>
            <div className='flex gap-2 items-end'>
              <img className='w-[30px] rounded-full' src="negociemos.jpg" alt="" />
              <span>Distribuidora Negociemos</span>
            </div>
          </div>
          <div className='text-2xl'>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
        </div>
        <div className="w-full mt-5 lg:mt-14 pb-[15px] h-[100%] overflow-y-scroll custom-scrollbar3 px-4 md:px-12 bg-gray-100" ref={(ref) => setScrollRef(ref)}>
          <div className='absolute bottom-16 left-[40px] flex items-center flex-col z-50'>
            {mostrarDiv ?
              <Picker data={data} onEmojiSelect={handleEmojiClick} /> : ''}
          </div>
          <ul className="">
            {mensajes.map((mensaje, index) => (
              <li
                key={index}
                className={`flex items-end justify-${mensaje.b1 === '2' ? 'end' : 'start'} py-2 gap-2`}
                ref={index === mensajes.length - 1 ? lastMessageRef : null}
              >
                {mensaje.b1 === '2' ? (
                  <>
                    <div className="text-black break-all text-[15px] shadow bg-[#84b6f4] flex-wrap flex max-w-[65%] rounded-lg p-[7px] pl-10 text-left">
                      {renderMedia(mensaje)}
                    </div>
                    <div className='border border-[#84b6f4] text-2xl w-10 h-10 grid place-items-center text-[#84b6f4] bg-gray-200 rounded-full'>
                      <FontAwesomeIcon icon={faUserTie} className="" />
                    </div>

                  </>
                ) : (
                  <>
                    <div className='border border-gray-300 text-2xl w-10 h-10 grid place-items-center text-gray-400 bg-gray-200 rounded-full'>
                      <FontAwesomeIcon icon={faUser} className="" />
                    </div>
                    <div className="text-black text-[15px] rounded-lg break-all shadow bg-gray-300 flex-wrap flex max-w-[65%] p-[7px] pr-10">{renderMedia(mensaje)}</div>
                  </>
                )}
              </li>
            ))}
            {fullscreenImage && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90  z-50 flex items-center justify-center" onClick={() => setFullscreenImage(null)}>
                <img
                  src={fullscreenImage}
                  alt="Imagen a pantalla completa"
                  className="w-[40%] h-auto max-h-[90%]"
                />
              </div>
            )}
          </ul>
          {loading && (
            <div className="text-red-600 absolute bottom-14 lg:bottom-20 right-20 lg:right-72">Cargando...</div>
          )}
        </div>
        <div className='w-full flex items-center justify-center h-14 bg-gray-200 bottom-0'>
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
              </div>
              <input
                ref={mensajeInputRef}
                onKeyDown={handleKeyDown}
                className="w-full border-2 border-gray-300 bg-white h-10 px-8 pl-14 pr-16 rounded-lg text-sm focus:outline-none focus:border-blue-500"
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
