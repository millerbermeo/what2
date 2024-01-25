import React, { useState, useRef } from 'react';
import { ReactMic } from 'react-mic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

function AudioRecorder() {
    const [isRecording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const audioRef = useRef(null);
    const [reproduciendo, setReproduciendo] = useState(false);

    const onStart = () => {
        try {
            setAudioBlob(null); 
            setRecording(true);
            console.log('Comenzando la grabación...');
        } catch (error) {
            console.log('no funcionó', error);
        }
    };

    const onStop = (recordedBlob) => {
        setRecording(false);
        console.log('Grabación completada:', recordedBlob);
        setAudioBlob(recordedBlob.blob);
    };

    const toggleRecording = () => {
        setAudioBlob(null); 
        if (isRecording) {
            // Si ya está grabando, detener la grabación
            setRecording(false);
        } else {
            // Si no está grabando, iniciar la grabación
            setRecording(true);
        }
    };

    const reproducirAudio = () => {
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

    return (
        <div className='relative'>
            <ReactMic
                record={isRecording}
                onStop={onStop}
                onData={(recordedBlob) => console.log('Datos de la grabación:', recordedBlob)}
                strokeColor="#4a5568"
                backgroundColor="transparent"
                className={`overflow-hidden w-max h-14 absolute md:left-12  2xl:left-60 -top-20 ${isRecording ? 'flex' : 'hidden'}`}
            />
            <button className={`mr-2 ${isRecording ? 'text-red-500' : 'text-gray-600'} focus:outline-none`} onClick={toggleRecording} type="button">
                <FontAwesomeIcon icon={faMicrophone} />
            </button>

            {audioBlob && (
                <audio
                    controls
                    className='-mt-40 left-40 absolute hidden'
                    ref={audioRef}
                    onEnded={() => setReproduciendo(false)} // Cambiar estado cuando el audio termina de reproducirse
                >
                    <source src={URL.createObjectURL(audioBlob)} />
                    Tu navegador no soporta la etiqueta de audio.
                </audio>
            )}
            <button onClick={reproducirAudio}>
                <FontAwesomeIcon icon={reproduciendo ? faPause : faPlay} />
            </button>
        </div>
    );
}

export default AudioRecorder;
