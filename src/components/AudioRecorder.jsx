import React, { useState, useRef, useEffect } from 'react';
import { ReactMic } from 'react-mic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import LineSound from './LineSound';
import RecorderSound from './RecorderSound';

function AudioRecorder() {
    const [isRecording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const audioRef = useRef(null);
    const [reproduciendo, setReproduciendo] = useState(false);
    const [showRecorder, setShowRecorder] = useState(false); // Nuevo estado para controlar la visibilidad de RecorderSound

    useEffect(() => {
        if (audioBlob) {
            // Descargar el archivo una vez que se haya completado la grabación
            downloadAudio();
        }
    }, [audioBlob]);

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

    const downloadAudio = () => {
        const url = URL.createObjectURL(audioBlob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'grabacion_audio.mp3'); // Nombre del archivo a descargar
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className='relative'>
            <ReactMic
                record={isRecording}
                onStop={onStop}
                onData={(recordedBlob) => console.log('Datos de la grabación:', recordedBlob)}
                strokeColor="#000"
                backgroundColor="transparent"
                className={`overflow-hidden w-max h-14 absolute md:left-12  2xl:left-60 -top-20 ${isRecording ? 'hidden' : 'hidden'}`}
            />
            {showRecorder && <RecorderSound />} {/* Mostrar RecorderSound cuando se está grabando */}

            <button className={`mr-2 ${isRecording ? 'text-blue-500' : 'text-gray-600'} focus:outline-none`} onClick={toggleRecording} type="button">
                <FontAwesomeIcon icon={faMicrophone} />
            </button>

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
            <button onClick={reproducirAudio}>
                <FontAwesomeIcon icon={reproduciendo ? faPause : faPlay} className={`${audioBlob ? 'text-blue-500' : 'text-gray-600'} focus:outline-none`} />
            </button>
        </div>
    );
}

export default AudioRecorder;
