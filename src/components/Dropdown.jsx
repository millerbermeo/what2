// import React, { useState } from 'react';
// import { Transition } from '@headlessui/react';

// function Dropdown() {
//     const [isOpen, setIsOpen] = useState(false);

//     const handleClick = () => {
//         alert("Elemento seleccionado");
//         setIsOpen(false); // Para cerrar la lista desplegable después de hacer clic en un elemento
//     };

//     return (
//         <div>
//             <div className="">
//                 <button
//                     onClick={() => setIsOpen(!isOpen)}
//                 >
//                     <div className='w-[35px] h-[35px] bg-slate-800 rounded-full text-white text-xl flex justify-center items-center'>
//                         <i className="fa-solid fa-user"></i>
//                     </div>

//                 </button>

//                 <Transition
//                     show={isOpen}
//                     enter="transition-transform duration-300 ease-out"
//                     enterFrom="transform scale-0"
//                     enterTo="transform scale-100"
//                     leave="transition-transform duration-300 ease-in"
//                     leaveFrom="transform scale-100"
//                     leaveTo="transform scale-0"
//                 >
//                     <div className="origin-top-right z-auto absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
//                         <div className="py-1">
//                             <a
//                                 href="#"
//                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                 onClick={handleClick}
//                             >
//                             Perfil
//                             </a>
//                             <a
//                                 href="#"
//                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                 onClick={handleClick}
//                             >
//                                 cuenta
//                             </a>
//                             <a
//                                 href="#"
//                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                 onClick={handleClick}
//                             >
//                                 Sing out
//                             </a>
//                         </div>
//                     </div>
//                 </Transition>
//             </div>
//         </div>
//     );
// }

// export default Dropdown;
