import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function Logout() {

    const salir = ()=> {
        alert()
      }

      
  return (
    <>
        <div className='text-2xl' onClick={salir}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
    </>
  )
}

export default Logout
