import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatSidebar from '../components/ChatSidebar';
import Navbar from '../components/Navbar';
import ChatMenssage from '../components/ChatMenssage';

function Home() {
    const [numeroSeleccionado, setNumeroSeleccionado] = React.useState(null);
    const [nameSeleccionado, setNameSeleccionado] = React.useState(null);

    const handleClick = (numberw, name) => {
      setNumeroSeleccionado(numberw);
      setNameSeleccionado(name);
    };
  //   console.log("------22222222----------");
  // console.log(nameSeleccionado);
  // console.log("-------222222222---------");
    
  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 w-full pl-0 lg:pl-6 lg:p-2 pt-0 lg:pt-1 pb-0">
          <Navbar navbar="hidden" />
          <div className='w-full flex flex-col lg:flex-row overflow-hidden h-[83vh] md:h-auto rounded-lg mt-2 lg:mt-2 border gap-10 md:gap-0'>
            <ChatSidebar onClicEnDiv={handleClick}/>
            <ChatMenssage numeroSeleccionado={numeroSeleccionado} nameSeleccionado={nameSeleccionado} />
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
