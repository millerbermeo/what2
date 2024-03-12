import React from 'react'
import ListarPlantillas from './ListarPlantillas'
import ListarPlantillas2 from './ListarPlantillas2'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'


function PlantillasTablas() {
  return (
    <>
      <div className="flex">
        <div className='md:relative md:z-0'>
          <Sidebar ocultar="hidden" />
        </div>
        <main className="flex-1 w-full pl-0 lg:pl-6 lg:p-2 pt-0 lg:pt-1 pb-0">
          <Navbar navbar="flex" />

          <ListarPlantillas />
          <ListarPlantillas2 />

        </main></div>

    </>
  )
}

export default PlantillasTablas