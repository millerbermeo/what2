import React, { useState } from 'react';

const MuteButton = () => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    // Verifica si el navegador es compatible con AudioContext
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();

      // Crea un nodo de ganancia
      const gainNode = audioContext.createGain();

      // Silencia el nodo de ganancia
      gainNode.gain.value = isMuted ? 1 : 0;

      // Conecta el nodo de ganancia al contexto de audio
      gainNode.connect(audioContext.destination);
    } else {
      console.log('AudioContext no es compatible con este navegador.');
    }

    // Actualiza el estado de silencio
    setIsMuted(!isMuted);
  };

  return (
    <button className={`absolute opacity-20 bg-red-200 rounded p-2 top-0.5 hover:opacity-100 right-20 ${isMuted ? 'bg-green-200' : 'bg-red-200'}`} onClick={toggleMute}>{isMuted ? 'Activar Sonido' : 'Silenciar'}</button>
  );
};

export default MuteButton;
