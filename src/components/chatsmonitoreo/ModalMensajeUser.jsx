import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCommentDots } from '@fortawesome/free-solid-svg-icons';

const ModalMensajeUser = () => {
  const [showModal, setShowModal] = useState(false);

  const messages = [
    { text: 'Mensaje 1', position: 'right' },
    { text: 'Mensaje 2', position: 'left' },
    { text: 'Mensaje 3', position: 'right' },
    { text: 'Mensaje 4', position: 'left' },
    { text: 'Mensaje 5', position: 'right' },
    { text: 'Mensaje 6', position: 'left' },
    { text: 'Mensaje 7', position: 'right' },
    { text: 'Mensaje 8', position: 'left' },
    { text: 'Mensaje 9', position: 'right' },
    { text: 'Mensaje 10', position: 'left' },
    { text: 'Mensaje 11', position: 'right' },
    { text: 'Mensaje 12', position: 'left' },
    { text: 'Mensaje 13', position: 'right' },
    { text: 'Mensaje 14', position: 'left' },
    { text: 'Mensaje 15', position: 'right' },
    { text: 'Mensaje 16', position: 'left' },
    { text: 'Mensaje 17', position: 'right' },
    { text: 'Mensaje 18', position: 'left' },
    { text: 'Mensaje 19', position: 'right' },
    { text: 'Mensaje 20', position: 'left' },
  ];

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="text-blue-500 rounded">
      <FontAwesomeIcon icon={faCommentDots} />
      </button>
      <div onClick={() => setShowModal(false)} className={`modal ${showModal ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-50`}>
        <div className="modal-content bg-white w-full md:w-1/2 rounded-lg p-8 m-auto my-32">
          <span className="close absolute top-0 right-0 p-4" onClick={() => setShowModal(false)}>&times;</span>
          <div className="message-container max-h-64 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`message p-2 rounded-lg ${message.position === 'right' ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'}`}>
                {message.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMensajeUser;
