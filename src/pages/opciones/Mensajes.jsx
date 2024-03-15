import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import baseURL from '../../components/BaseUrl';

// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.css';

function Mensajes() {
    const campanaRef = useRef(null);
    const textoRef = useRef(null);

    const imagen = useRef(null);
    const docu = useRef(null);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [status, setStatus] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // const showAlert = (icon, text) => {
    //     Swal.fire({
    //         title: '¡Hola!',
    //         text: text,
    //         icon: icon,
    //         confirmButtonText: 'Aceptar'
    //     });
    // };


    useEffect(() => {

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
            preview.textContent = input.value;
        }

        // ... (código anterior)



        // ... (resto del código)


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
            updateTextPreview(this, 'mostrar-texto');
        };



        document.getElementById('imagenInput').addEventListener('change', handleImageChange);
        document.getElementById('documentoInput').addEventListener('change', handleDocumentChange);
        document.getElementById('texto').addEventListener('input', handleTextChange);

        // return () => {
        //     document.getElementById('imagenInput').removeEventListener('change', handleImageChange);
        //     document.getElementById('documentoInput').removeEventListener('change', handleDocumentChange);
        //     document.getElementById('texto').removeEventListener('input', handleTextChange);
        // };
    }, []);




    const sendData = async () => {
        const number_a = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).number_a : null;


        const campanaValue = campanaRef.current.value.trim();


        const textoValue = textoRef.current.value;




        if (!campanaValue) {
            console.error('Campos obligatorios vacíos');
            setLoading2(true);

        }


        if (!campanaValue) {
            console.error('Campos obligatorios vacíos');
            setLoading3(true);
            return
        }



        const formData = new FormData();
        formData.append('nombre_p', campanaRef.current.value);
        formData.append('contenido', textoRef.current.value);
        formData.append('number_a', number_a);


        const imagenInput = imagen.current.files[0];  // Cambio aquí
        const documentoInput = docu.current.files[0];  // Cambio aquí

        if (imagenInput) {
            formData.append('type_m', 'image');
            formData.append('document_w', imagenInput);
        } else if (documentoInput) {
            formData.append('type_m', 'document');
            formData.append('document_w', documentoInput);
        } else {
            formData.append('type_m', 'text');
            formData.append('document_w', ''); // Ajusta esto según tus necesidades o déjalo vacío si no necesitas un valor para contenido de texto
        }

        console.log("holamenudo-----------------------------------------------------")

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }
        console.log("holamenudo-----------------------------------------------------")
        setLoading(true);
        await axios.post(`${baseURL}/chat_business2/Dashboard/Dashboard/api_crear_p_masiva.php`, formData)
            .then(response => {
                console.log('Solicitud exitosa:', response.data);
                setShowModal(true)
                setModalMessage("Plantilla creada correctamente")
                setStatus(true)
                // Limpiar los campos después de enviar el formulario
                imagen.current.value = "";
                docu.current.value = "";
                textoRef.current.value = "";
                campanaRef.current.value = "";

                // También puedes limpiar las vistas previas de imagen y documento si es necesario
                document.getElementById('mostrar-imagen-doc').innerHTML = '';
                document.getElementById('mostrar-documento').textContent = '';
                setLoading(false);
                // showAlert('success', 'Plantilla Creada');
            })
            .catch(error => {
                setShowModal(true)
                setModalMessage("La plantilla masiva no se pudo crear")
                setLoading2(true);
                console.error('Error al enviar la solicitud:', error);
                imagen.current.value = "";
                docu.current.value = "";
                textoRef.current.value = "";
                campanaRef.current.value = "";
                setLoading(false);
                // showAlert('error', 'La plantilla no fue Creada');

            })
            .finally(() => {
                imagen.current.value = "";
                setLoading(false);
                // Ocultar loader al finalizar la solicitud, ya sea éxito o error
            });
    }



    return (
        <>
            <div className="flex">
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white w-96 rounded-lg shadow-lg">
                            <div className="p-8">
                                <p className="text-xl text-center">{modalMessage}</p>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="mt-4 w-full bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className='md:relative md:z-0'>
                    <Sidebar ocultar="hidden" />
                </div>
                <main className="flex-1 w-full pl-0 lg:pl-6 lg:p-2 pt-0 lg:pt-1 pb-0">
                    <Navbar navbar="flex" />
                    <h3 className='my-10 text-center text-2xl uppercase'>Crear Plantilla Masiva</h3>
                    <div className="flex justify-center flex-col md:flex-row items-start mt-1 md:mt-10 gap-14 2xl:gap-24 mb-14">

                        <div className="w-full max-w-2xl p-8 bg-gray-100 rounded-lg border">
                            <div>
                                <label className="label-text font-medium text-xl" htmlFor="campana">Nombre Plantilla:</label>
                                <input type="text" id="campana" ref={campanaRef} className="text-input w-full p-2 mt-2 border rounded" placeholder="Ingrese la plantilla" required />
                                {loading2 && (
                                    <div className="loader-container text-blue-500 mt-2 pl-1">
                                        {/* Agrega aquí el código para tu loader (puedes usar bibliotecas como react-loader-spinner, etc.) */}
                                        La Plantilla ya existe o Contiene espacios
                                    </div>
                                )}

                            </div>

                            <div className="mt-4">
                                <label htmlFor="texto" className="label-text font-medium text-xl">Nuevo Mensaje:</label>
                                <textarea id="texto" name="texto" ref={textoRef} placeholder="Escriba su mensaje aquí..." className="w-full p-2 mt-2 border rounded"></textarea>
                                {loading3 && (
                                    <div className="loader-container text-blue-500 mt-1 pl-1">
                                        {/* Agrega aquí el código para tu loader (puedes usar bibliotecas como react-loader-spinner, etc.) */}
                                        Campo Requerido
                                    </div>
                                )}
                            </div>

                            <div className="card-container flex mt-4 space-x-4 justify-center">
                                <label htmlFor="imagenInput" className='bg-gray-700 p-2 rounded w-full cursor-pointer'>
                                    <div className="card flex flex-col items-center justify-center text-white">
                                        <FontAwesomeIcon icon={faImage} className="text-2xl text-white" />
                                        <div>Imagen</div>
                                        <input type="file" id="imagenInput" ref={imagen} accept="image/*" />
                                        <div className="placeholder">No Seleccionada</div>
                                    </div>
                                </label>

                                <label htmlFor="documentoInput" className='bg-gray-700 p-2 rounded w-full cursor-pointer'>
                                    <div className="card flex flex-col items-center justify-center text-white">
                                        <FontAwesomeIcon icon={faFile} className="text-2xl text-white" />
                                        <div>Documento</div>
                                        <input type="file" id="documentoInput" ref={docu} accept=".pdf, .doc, .docx" />
                                        <div className="placeholder">No Seleccionado</div>
                                    </div>
                                </label>
                            </div>
                        </div>



                        <div className='flex-col flex w-full max-w-2xl relative'>
                            <div className="w-full max-w-2xl -z-10 relative p-8 bg-white rounded-lg mt-0 border border-gray-300 shadow-lg">
                                <div id="mostrar-imagen-doc" className='w-64 bg-white overflow-hidden max-h-44 m-auto'></div>
                                <div id="mostrar-documento" className='bg-blue-300 rounded w-auto break-all'></div>
                                <span className="block mt-4 text-xl font-semibold text-black">Mensaje:</span>
                                <div id="mostrar-texto" className="break-all bg-gray-200 p-4 rounded shadow mt-2 max-h-20 overflow-y-auto"></div>

                            </div>
                            <button id="submit-button" onClick={sendData} type="submit" className="mt-4 bg-gray-700 w-[85%] md:w-full mx-auto text-white px-4 py-2 rounded cursor-pointer">Enviar</button>
                            {loading && (
                                <div className="loader-container left-32 bottom-10">
                                    {/* Agrega aquí el código para tu loader (puedes usar bibliotecas como react-loader-spinner, etc.) */}
                                    Cargando...
                                </div>
                            )}

                            {/* {status && (
                                <div className='text-center my-10 text-4xl'>
                                    <p>su plantilla se creó con exito</p>
                                </div>)} */}
                        </div>
                    </div>
                </main>


            </div>
        </>
    );
}

export default Mensajes;
