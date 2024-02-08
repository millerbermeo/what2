import React, { useState } from 'react';

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState('');

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        setAudioBlob(e.data);
      };

      recorder.onstop = () => {
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      recorder.start();
      setRecording(true);
      setMediaStream(stream);
      setMediaRecorder(recorder);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
      mediaStream.getTracks().forEach(track => track.stop());
    }
  };

  const downloadAudio = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = 'recording.mp3';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      {recording ? (
        <button onClick={stopRecording}>Stop</button>
      ) : (
        <button onClick={startRecording}>Start</button>
      )}
      <div className='absolute -translate-y-32'>
      {audioURL && <audio className='absolute -top-14' controls src={audioURL} />}
      {audioBlob && <button onClick={downloadAudio}>Download Audio</button>}
      </div>
    </div>
  );
}

export default AudioRecorder;
