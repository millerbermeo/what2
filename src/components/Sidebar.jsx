import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronRight, faHouse, faGear, faCommentDots, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatOpen2, setIsChatOpen2] = useState(false);

  const [isDown, setIsDown] = useState(false);
  const [isDown2, setIsDown2] = useState(false);
  const [isDown3, setIsDown3] = useState("240px");
  const [isDown4, setIsDown4] = useState(true);




  const toggleSidebar = () => {

    setIsChatOpen(false);
    setIsChatOpen2(false);
    setIsDown(false);
    setIsDown2(false);

    setIsOpen(!isOpen);
    setIsDown3(!isDown3)
    setIsDown4(!isDown4)


  };

  const toggleChatMenu = () => {
    setIsChatOpen(!isChatOpen);
    setIsDown(!isDown);

  };

  const toggleChatMenu2 = () => {

    setIsChatOpen2(!isChatOpen2);
    setIsDown2(!isDown2);

  };

  // f1f3f4

  return (
    <>

      <div className={`${isDown3 ? 'lg:mr-[240px]' : 'lg:mr-[50px]'} duration-700 ease-in-out`}>
        <div className={`absolute right-0 top-0 md:-top-2 lg:hidden ${isOpen ? 'z-50' : 'z-10'}`} onClick={toggleSidebar}> <div className='text-black bg-white text-3xl mt-[22.5px] -translate-x-4 bg-red px-2 rounded'>   <FontAwesomeIcon icon={faBars} className="text-black" />
        </div></div>

        <div className={`h-screen ml-[50px] right-0 md:w-0  ${isDown4 ? 'w-0' : 'w-full'}  z-10 ${isDown4 ? 'bg-transparent' : 'bg-[#0000009b]'} fixed duration-2000 lg:bg-transparent`}>
          <div
            className={`bg-[#f1f2f3] h-screen w-[250px] ${isOpen ? 'translate-x-[0]' : 'translate-x-[-100%]'
              } flex justify-start overflow-hidden flex-col duration-700 ease-in-out fixed top-0 left-0 z-10 lg:translate-x-0 pt-3  ${isOpen ? 'lg:w-[62px]' : 'w-[250px]'
              }`}
          >
            <div className="p-3 flex justify-start gap-5 w-[250px] pb-10">
              <div className="w-[35px] h-[35px] bg-[#000] p-1 flex rounded-full justify-center items-center cursor-pointer" onClick={toggleSidebar}>
                {/* <img src="logo.png" alt="" onClick={toggleSidebar}/> */}

                <FontAwesomeIcon icon={faBars} className="text-white" />


              </div>
              <img className='w-40' src="negociemoss.png" alt="" />
            </div>


            <div className='h-[75%] overflow-auto custom-scrollbar'>
              <ul className="text-[#5f6368] p-3 overflow-hidden w-[250px] flex flex-col gap-2 h-auto">
                <div
                  className="flex justify-start items-center gap-5 cursor-pointer hover:text-black"
                  onClick={toggleChatMenu}
                >
                  <div className='text-xl bg-black text-white rounded-full w-[35px] h-[35px] flex justify-center items-center'>
                    <FontAwesomeIcon
                      icon={faHouse}
                    />
                  </div>


                  <li className='flex w-[150px] justify-between'>
                    <p className='text-lg'>
                      Chat
                    </p>
                    <FontAwesomeIcon icon={isDown ? faChevronDown : faChevronRight} className='' />
                  </li>
                </div>
                <div
                  className="sub-menu overflow-hidden duration-300"
                  style={{ height: isChatOpen ? '90px' : '0' }}
                >
                  <ul className="p-2 pl-14">
                    <Link to="/home">
                    <li className='flex items-center gap-2'><i className="fas fa-circle text-[6px]"></i> Panel Chat</li>
                    </Link>
                    <li className='flex items-center gap-2'><i className="fas fa-circle text-[6px]"></i> Masivos</li>
                    <li className='flex items-center gap-2'><i className="fas fa-circle text-[6px]"></i> Reportes</li>
                  </ul>
                </div>
                <div
                  className="flex justify-start items-center gap-5 cursor-pointer hover:text-black"
                  onClick={toggleChatMenu2}
                ><div className="text-xl fa-solid bg-black text-white rounded-full w-[35px] h-[35px] flex justify-center items-center">
                    <FontAwesomeIcon icon={faGear} />
                  </div>


                  <li className='flex w-[150px] justify-between'>
                    <p className='text-lg'>
                      Opciones
                    </p>
                    <FontAwesomeIcon icon={isDown2 ? faChevronDown : faChevronRight} className='' />
                  </li>
                </div>
                <div
                  className="sub-menu overflow-hidden duration-300"
                  style={{ height: isChatOpen2 ? '90px' : '0' }}
                >
                  <ul className="p-2 pl-12">
                    <Link to="/mensajes">
                    <li className='flex items-center gap-2'><i className="fas fa-circle text-[6px]"></i>Crear Campaña</li>
                    </Link>
                    <Link to="/campanas">
                    <li className='flex items-center gap-2'><i className="fas fa-circle text-[6px]"></i>Listar Campaña</li>
                    </Link>
                    <li className='flex items-center gap-2'><i className="fas fa-circle text-[6px]"></i>Enviar Campaña</li>
                  </ul>
                </div>
                <Link to="/perfil">
                <div className="flex justify-start items-center gap-5 cursor-pointer hover:text-black">

                  <div className="text-xl  bg-white rounded-full w-[35px] h-[35px] flex justify-center items-center">
                  <FontAwesomeIcon icon={faAddressCard} />

                  </div>
               
                  <li className='text-lg'>Perfil</li>
                
                </div>
                </Link>
                
                <Link to="/contacto">
                <div className="flex justify-start items-center gap-5 cursor-pointer hover:text-black">

<div className="text-xl  bg-white rounded-full w-[35px] h-[35px] flex justify-center items-center">
  <FontAwesomeIcon icon={faCommentDots} />

</div>
<li className='text-lg'>Contacto</li>
</div>
                </Link>

              </ul>
            </div>

            <div className="p-4 w-[250px] flex items-end left-0 absolute bottom-0">
              <h3 className="text-[#5f6368] text-lg flex items-center"><span className='font-bold text-4xl mr-4'>©</span>copyright DevMiller</h3>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Sidebar;
