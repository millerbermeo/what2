import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function InfoUser({ numero, nombre }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
           
        <div className="relative">
            {/* Botón para abrir/cerrar el menú */}
            <div onClick={toggleMenu} className='cursor-pointer absolute bg-red-400 w-28 -top-8 h-10 opacity-0'>
 
                </div>

            {/* Menú lateral */}
            <div className={`fixed top-0 right-0 h-full bg-gray-800 w-80 transform transition-transform ease-in-out z-40 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Contenido del menú */}
                <div onClick={toggleMenu} className="flex items-center justify-between bg-gray-600 p-5">
                    <span className="text-white">x</span>
                    <p className="text-white">Información del contacto</p>
                    <span></span>
                </div>

                <div className="flex justify-center my-5">
                    <span className="rounded-full w-36 h-36 flex justify-center items-center bg-gray-200 text-8xl text-gray-800">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                </div>

                <ul className="flex flex-col items-center">
                    <li className="text-white uppercase mb-2">{nombre}</li>
                    <li className="text-white mb-2">{numero}</li>
                    {/* Otros elementos del menú */}
                </ul>
            </div>

            {/* Capa oscura de fondo */}
            {menuOpen && <div className="fixed top-0 right-0 h-full w-full bg-black opacity-50 z-30" onClick={toggleMenu}></div>}
        </div>
        </>
    );
}

export default InfoUser;
