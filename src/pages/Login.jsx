import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  return (
    <div className='w-[100%] h-screen grid place-items-center' style={{ backgroundImage: "url('background2.png')", backgroundSize:"cover" }}>
      <div>
        <div className="m-auto bg-white w-[350px]  lg:w-96">
          <div
            className="border-t-4 border-blue-600 overflow-hidden rounded shadow-lg"
          >
            <h3 className="text-xl text-center mt-8 mb-2">Bienvenido a</h3>
            <img className='w-56 mb-5 mx-auto' src="negociemoss.png" alt="" />
            
            <div className="px-4 mb-4">
              <div className={`relative ${emailFocused || emailValue ? 'focus' : ''}`}>
                <FontAwesomeIcon icon={faEnvelope} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${emailFocused || emailValue ? 'text-blue-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  className={`border border-gray rounded w-full p-3 pl-10 outline-none focus:border-blue-500`}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  onChange={handleEmailChange}
                />
                <label
                  className={`absolute left-10 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.8rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${emailFocused || emailValue ? 'transform -translate-y-[0.9rem] scale-[0.8] text-blue-500' : ''}`}
                >
                  Email
                </label>
              </div>
            </div>
            <div className="px-4 mb-4">
              <div className={`relative ${passwordFocused || passwordValue ? 'focus' : ''}`}>
                <FontAwesomeIcon icon={faLock} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${passwordFocused || passwordValue ? 'text-blue-500' : 'text-gray-400'}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  className={`border border-gray rounded w-full p-3 pl-10 outline-none focus:border-blue-500`}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  onChange={handlePasswordChange}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer ${passwordFocused || passwordValue ? 'text-blue-500' : ''}`}
                  onClick={togglePasswordVisibility}
                />
                <label
                  className={`absolute left-10 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.8rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${passwordFocused || passwordValue ? 'transform -translate-y-[0.9rem] scale-[0.8] text-blue-500' : ''}`}
                >
                  Contraseña
                </label>
              </div>
            </div>
            <Link to="/home">
              <div className="px-4 mb-6">
                <button
                  className="border border-blue-500 bg-blue-600 rounded w-full px-4 py-3 text-white font-semibold"
                >
                  Ingresar
                </button>
              </div>
            </Link>
            {/* <div className="bg-gray-100 text-center text-gray-700 py-5">
              Crear Cuenta?
              <a href="#" className="font-semibold no-underline text-black"> Signup</a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
