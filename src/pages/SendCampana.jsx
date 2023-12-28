import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function SendCampana() {
  const [agendaItems, setAgendaItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    // Función para hacer la petición GET
    const fetchAgendaItems = async () => {
      try {
        const response = await axios.get('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_agenda_total.php');
        setAgendaItems(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    // Llamada a la función para cargar los datos cuando el componente se monta
    fetchAgendaItems();
  }, []);

  return (
    <div>
      <div className="flex">
        <div className="md:relative md:z-0">
          <Sidebar />
        </div>
        <main className="flex-1 w-full pl-0 lg:pl-6 lg:p-2 pt-0 lg:pt-1 pb-0">
          <Navbar navbar="flex" />
          <div className="flex justify-center mt-10 px-10">
            <div className="w-full flex justify-start">
              <h1>ENVIAR CAMPANA</h1>
            </div>
          </div>
          <div className="flex justify-center mt-4">
          <label htmlFor="agendaSelect" className="mr-2 font-semibold">
              Selecciona un elemento de la agenda:
            </label>
            <select
              id="agendaSelect"
              name="agendaSelect"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Selecciona...</option>
              {agendaItems.map((item) => (
                <option key={item.numberw} value={item.numberw}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SendCampana;
