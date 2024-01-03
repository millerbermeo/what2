import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function SendCampana() {
  const [agendaItems, setAgendaItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [Campo, setCampo] = useState(false)



  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    function groupByAgent(data) {
      const groupedData = {};
      data.forEach((item) => {
        if (!groupedData[item.agente]) {
          groupedData[item.agente] = { checkboxes: [] };
        }
        groupedData[item.agente].checkboxes.push({
          id: item.id,
          numberw: item.numberw,
          name: item.name,
          checked: false,
        });
      });
      return groupedData;
    }

    axios.get('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_agenda_total.php')
      .then(response => {
        const groupedData = groupByAgent(response.data);
        setGroupedData(groupedData);
        const initialSelectAllState = Object.keys(groupedData).reduce((acc, agente) => {
          acc[agente] = false;
          return acc;
        }, {});
        setSelectAll(initialSelectAllState);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSelectAll = (agente) => {
    setGroupedData((prevGroupedData) => {
      const updatedCheckboxes = prevGroupedData[agente].checkboxes.map((checkbox) => ({
        ...checkbox,
        checked: !prevGroupedData[agente].selectAll,
      }));
      return {
        ...prevGroupedData,
        [agente]: {
          ...prevGroupedData[agente],
          checkboxes: updatedCheckboxes,
          selectAll: !prevGroupedData[agente].selectAll,
        },
      };
    });
  };

  const handleCheckboxChange = (agente, id) => {
    setGroupedData(prevGroupedData => {
      const updatedCheckboxes = prevGroupedData[agente].checkboxes.map(checkbox => {
        if (checkbox.id === id) {
          return { ...checkbox, checked: !checkbox.checked };
        }
        return checkbox;
      });
      return {
        ...prevGroupedData,
        [agente]: {
          ...prevGroupedData[agente],
          checkboxes: updatedCheckboxes,
        },
      };
    });
  };

  const [showDiv, setShowDiv] = useState(false);

  // Función para cambiar el estado de showDiv
  const toggleShowDiv = (agente) => {
    setShowDiv((prevShowDiv) => ({
      ...prevShowDiv,
      [agente]: !prevShowDiv[agente],
    }));
  };

  const resultHTML = (
    <div className='w-full flex flex-col p-5 md:p-0 mt-5 lg:-z-0 relative'>
      {Object.keys(groupedData).map(agente => (
        <div key={agente} className='mb-10 m-auto relative flex flex-col justify-start w-full'>
          <h3 className='font-bold flex'>
            <span className='w-36 break-all text-lg'>
            {agente}
            </span>
            <button
              onClick={() => toggleShowDiv(agente)}
              className="ml-3 bg-blue-500 text-white px-2 rounded cursor-pointer"
            >
              Desplegar
            </button>
          </h3>

          {showDiv[agente] && (
            <div className='mostrarDiv flex flex-col'>
              <button
                onClick={() => handleSelectAll(agente)}
                className="bg-blue-500 text-white px-4 mt-5 py-2 rounded cursor-pointer"
              >
                {selectAll[agente] ? 'Deseleccionar Todos' : 'Seleccionar Todos'}
              </button>

              <div className='grid grid-cols-1 lg:grid-cols-3 w-full mt-5 shadow-lg border-gray-300 border p-5'>
                {groupedData[agente].checkboxes.map(item => (
                  <div className='flex gap-2 items-center p-1' key={item.id}>
                    <input
                      type="checkbox"
                      value={item.numberw}
                      id={item.id}
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(agente, item.id)}
                    />
                    <label htmlFor={item.id}>
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );









  useEffect(() => {
    // Función para hacer la petición GET
    const fetchAgendaItems = async () => {
      try {
        const response = await axios.get('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_plantillas_masivas.php');
        setAgendaItems(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    // Llamada a la función para cargar los datos cuando el componente se monta
    fetchAgendaItems();
  }, []);

  // Actualiza los datos de la plantilla seleccionada cuando cambia selectedItem
  useEffect(() => {
    const template = agendaItems.find((item) => item.nombre === selectedItem);
    setSelectedTemplate(template);
  }, [agendaItems, selectedItem]);



  const validateFields = () => {
    // Validar que se haya seleccionado un elemento de la agenda
    if (!selectedItem) {
      setCampo(true);
      return false;
    }

    // Validar que al menos un checkbox esté seleccionado
    const atLeastOneCheckboxSelected = Object.keys(groupedData).some((agente) => {
      return groupedData[agente].checkboxes.some((checkbox) => checkbox.checked);
    });

    if (!atLeastOneCheckboxSelected) {
      setCampo(true);
      return false;
    }

    // Puedes agregar más validaciones según tus requerimientos

    return true;
  };




  const handleClick = () => {

    if (validateFields()) {


      const user = JSON.parse(localStorage.getItem('user'));
      const number_a = user && user.number_a;

      // Crear un objeto FormData y agregar los datos necesarios
      const formData = new FormData();
      formData.append('number_a', number_a);
      formData.append('nombre_p', selectedItem); // Utilizar el valor seleccionado del primer select

      // Obtener la lista de number_w de los checkboxes seleccionados
      const selectedNumbers = [];
      Object.keys(groupedData).forEach((agente) => {
        groupedData[agente].checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            selectedNumbers.push(checkbox.numberw);
          }
        });
      });



      // Convertir la lista de numbers a una cadena y agregarla a FormData
      const lista = selectedNumbers.join(','); // Puedes ajustar el delimitador según tus necesidades
      formData.append('number_m', lista);


      // Realizar la solicitud POST con Axios
      axios.post('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_crear_c_masiva.php', formData)
        .then(response => {
          // Manejar la respuesta exitosa
          console.log('Respuesta del servidor:', response.data);

          setSelectedItem(''); // Restablecer el valor del select
        })
        .catch(error => {
          // Manejar errores
          console.error('Error al hacer la solicitud:', error);
        });
      setShowModal(false);
      setCampo(false);

    }
  };



  //  

  const log = () => {
    setShowModal(true);
  }


  return (
    <div>
      <div className="flex">
        <div className="md:relative md:z-0">
          <Sidebar />
        </div>
        <main className="flex-1 w-full pl-0 lg:pl-6 lg:p-2 pt-0 lg:pt-1 pb-0 mb-10">
          <Navbar navbar="flex" />
          <div className="flex justify-center mt-10 my-5 pl-1">
            <div className="w-full flex justify-center lg:justify-start">
              <h1 className='font-bold'>ENVIAR CAMPAÑA</h1>
            </div>
          </div>


          <section className='w-full bg-gray-100 border border-gray-300 rounded-lg p-5 flex flex-wrap justify-center gap-5 px-10 '>
            <div className="flex justify-start flex-col mt-4 w-full md:w-[50%]">
              <label htmlFor="agendaSelect" className="p-1 font-semibold">
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
                  <option key={item.id} value={item.nombre}>
                    {item.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className='w-full lg:w-96 flex justify-center bg-white text-black shadow-lg p-2'>
              {selectedTemplate && (
                <div>
                  <h2 className="uppercase font-bold">{selectedTemplate.nombre}</h2>
                  <p className="mb-2">{selectedTemplate.contenido}</p>
                  <img src={selectedTemplate.url} alt="Plantilla" className="w-40 h-40 object-cover" />
                </div>
              )}
            </div>

           
          </section>

          <div className='w-full'>
              {resultHTML}
            </div>

          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-12 rounded shadow-lg flex items-center flex-col">
                <p className='text-black text-xl'>¿Seguro que quieres enviar Campañas?</p>

                <div className='flex gap-4 mt-3'>
                  <button className='text-black text-lg font-semibold' onClick={() => setShowModal(false)}>Cancelar</button>
                  <button onClick={handleClick} className="relative inline-block text-lg px-4 py-2 font-medium group">
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                    <span className="relative text-black group-hover:text-white">Confirmar</span>
                  </button>
                </div>

                <div className='w-full h-5'>
                {Campo && (
                <div className='text-lg font-normal mt-2 text-center text-black border-b border-black'>
                  Campos Requeridos
                </div>
              )}
                </div>

              </div>
              
            </div>
          )}

          <div className='px-5 md:px-0'>
            <button
              onClick={log}
              className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Enviar Campaña
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}

export default SendCampana;
