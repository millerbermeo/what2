import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faImage } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

function Mensajes() {
    useEffect(() => {
        const endpoint = "";

        function previewImage(input, previewId) {
            const preview = document.getElementById(previewId);
            const file = input.files[0];

            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    console.log('Imagen cargada exitosamente.');
                    preview.innerHTML = `<img src="${e.target.result}" alt="Vista previa" class="placeholder">`;
                    // Cambiar el mensaje cuando se selecciona una imagen
                    document.querySelector('#imagenInput + .placeholder').textContent = 'Seleccionada';
                };

                reader.readAsDataURL(file);
            } else {
                console.log('No se seleccionó ninguna imagen.');
                preview.innerHTML = '';
            }
        }

        function previewDocument(input, previewId) {
            const preview = document.getElementById(previewId);
            const file = input.files[0];

            if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                console.log('Documento cargado exitosamente.');
                preview.textContent = file.name;
                // Cambiar el mensaje cuando se selecciona un documento
                document.querySelector('#documentoInput + .placeholder').textContent = 'Seleccionado';
            } else {
                console.log('No se seleccionó ningún documento válido.');
                preview.textContent = 'No se ha seleccionado ningún documento';
            }
        }

        function updateTextPreview(input, previewId) {
            const preview = document.getElementById(previewId);
            console.log('Texto actualizado:', input.value);
            preview.textContent = input.value;
        }

        function sendData() {
            const campana = document.getElementById('campana').value;
            const texto = document.getElementById('texto').value;

            if (campana.trim() === '' || texto.trim() === '') {
                console.log('Por favor, complete todos los campos antes de enviar.');
                return;
            }

            let contenido;
            if (document.getElementById('mostrar-imagen-doc').innerHTML !== '') {
                contenido = document.getElementById('mostrar-imagen-doc').innerHTML;
            } else if (document.getElementById('mostrar-documento').textContent !== 'No se ha seleccionado ningún documento') {
                contenido = document.getElementById('mostrar-documento').textContent;
            } else {
                contenido = 'No se ha seleccionado contenido';
            }

            const data = {
                campana,
                texto,
                contenido,
            };

            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(result => {
                    console.log('Solicitud exitosa:', result);
                })
                .catch(error => {
                    console.error('Error al enviar la solicitud:', error);
                });
        }

        const handleImageChange = function () {
            console.log('Cambio en el input de imagen.');
            document.getElementById('mostrar-documento').textContent = '';
            previewImage(this, 'mostrar-imagen-doc');
        };

        const handleDocumentChange = function () {
            console.log('Cambio en el input de documento.');
            document.getElementById('mostrar-imagen-doc').innerHTML = '';
            previewDocument(this, 'mostrar-documento');
        };

        const handleTextChange = function () {
            console.log('Cambio en el input de texto.');
            updateTextPreview(this, 'mostrar-texto');
        };

        const handleButtonClick = function () {
            console.log('Enviando datos al servidor...');
            sendData();
        };

        document.getElementById('imagenInput').addEventListener('change', handleImageChange);
        document.getElementById('documentoInput').addEventListener('change', handleDocumentChange);
        document.getElementById('texto').addEventListener('input', handleTextChange);
        document.getElementById('submit-button').addEventListener('click', handleButtonClick);

        // Cleanup event listeners when component unmounts
        // return () => {
        //     document.getElementById('imagenInput').removeEventListener('change', handleImageChange);
        //     document.getElementById('documentoInput').removeEventListener('change', handleDocumentChange);
        //     document.getElementById('texto').removeEventListener('input', handleTextChange);
        //     document.getElementById('submit-button').removeEventListener('click', handleButtonClick);
        // };


    }, []);

    return (
        <>
            <div className="flex">
            <div className='md:relative md:z-0'>
                <Sidebar />
                </div>
                <main className="flex-1 w-full pl-0 lg:pl-6 lg:p-2 pt-0 lg:pt-1 pb-0">
                    <Navbar navbar="flex" />
                    {/* <div className='w-full flex flex-col lg:flex-row overflow-hidden h-[88vh] md:h-auto rounded-lg mt-2 lg:mt-2 border gap-10 md:gap-0'>
              
                    </div> */}
                    <div className="flex justify-center flex-col md:flex-row items-start mt-10 h-[80vh] gap-6">
                        <div className="w-full max-w-2xl p-8 bg-gray-100 rounded-lg">
                            <div>
                                <label className="label-text font-medium" htmlFor="campana">Nombre Plantilla</label>
                                <input type="text" id="campana" className="text-input w-full p-2 border rounded" placeholder="Ingrese la Campaña" required />
                            </div>

                            <div className="mt-4">
                                <label htmlFor="texto" className="label-text font-medium">Nuevo Mensaje:</label>
                                <textarea id="texto" name="texto" placeholder="Escriba su mensaje aquí..." className="w-full p-2 border rounded"></textarea>
                            </div>

                            <div className="card-container flex mt-4 space-x-4 justify-center">
                                <label htmlFor="imagenInput" className='bg-gray-700 p-2 rounded w-44'>
                                    <div className="card flex flex-col items-center justify-center text-white">
                                        <FontAwesomeIcon icon={faImage} className="text-2xl text-white" />
                                        <div>Imagen</div>
                                        <input type="file" id="imagenInput" accept="image/*" />
                                        <div className="placeholder">No Selecionada</div>
                                    </div>
                                </label>

                                <label htmlFor="documentoInput" className='bg-gray-700 p-2 rounded w-44'>
                                    <div className="card flex flex-col items-center justify-center text-white">
                                        <FontAwesomeIcon icon={faFile} className="text-2xl text-white" />
                                        <div>Documento</div>
                                        <input type="file" id="documentoInput" accept=".pdf, .doc, .docx" />
                                        <div className="placeholder">No Seleccinado</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="w-full max-w-2xl p-8 bg-gray-100 rounded-lg mt-0">
                            <div id="mostrar-imagen-doc" className='w-64 overflow-hidden max-h-44 m-auto'></div>
                            <div id="mostrar-documento" className='bg-blue-300 rounded w-auto break-all'></div>
                            <span className="block mt-4 text-lg font-semibold">Mensaje:</span>
                            <div id="mostrar-texto" className="break-all p-2 rounded shadow mt-2 max-h-20 overflow-y-auto"></div>

                            <button id="submit-button" type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">Enviar</button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Mensajes;
