import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import baseURL from '../BaseUrl';

const ModalMensajeUser = ({ numeroSeleccionado }) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const lastMessageRef = useRef(null);
  const [shouldScrollToLast, setShouldScrollToLast] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!numeroSeleccionado) {
          return;
        }

        const formData = new FormData();
        formData.append('numberw', numeroSeleccionado);

        const response = await axios.post(
          `${baseURL}/chat_business2/Dashboard/Dashboard/chats_principal.php`,
          formData
        );

        const modifiedData = response.data.map((message) => ({
          ...message,
          position: message.b1 === '1' ? 'right' : 'left', // Cambiar la posición del mensaje
        })).reverse(); // Cambiar el orden de los mensajes

        setData(modifiedData);

        const prevMessagesLength = modifiedData.length;

        if (lastMessageRef.current && shouldScrollToLast) {
          lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
          setShouldScrollToLast(false); // Desactivar el scroll automático después de la carga inicial
        }

        if (modifiedData.length > prevMessagesLength) {
          setShouldScrollToLast(true);
        }

      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    };

    fetchData();

  }, [numeroSeleccionado, shouldScrollToLast]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showModal && !event.target.closest('.modal-content')) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="text-blue-500 rounded">
        <FontAwesomeIcon icon={faCommentDots} />
      </button>
      {showModal && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-50">
          <div className="modal-content bg-white w-[700px] rounded-lg p-8 m-auto my-32">
            <span className="close absolute top-0 right-0 p-4" onClick={() => setShowModal(false)}>&times;</span>
            <button className="close-btn bg-gray-200  -translate-y-5 w-8 h-8  rounded-full p-1" onClick={() => setShowModal(false)}><FontAwesomeIcon icon={faXmark} /></button>
            <div className="message-container max-h-64 overflow-y-auto overflow-x-hidden flex flex-col gap-y-5">
              {data.map((message, index) => (
                <div key={message.id} ref={index === data.length - 1 ? lastMessageRef : null} className={`message break-all flex-wrap p-2 w-44 rounded-lg ${message.position === 'left' ? 'bg-gray-200 self-start' : 'bg-blue-200 self-end'}`}>
                  {message.men}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalMensajeUser;
