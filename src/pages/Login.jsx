import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigation = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [Campo, setCampo] = useState(false)
  const [errorMsg, setErrorMsg] = useState('');


  const emailRef = useRef();
  const passwordRef = useRef();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin(event);
    }
  };


  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handleEmailBlur = () => {
    if (!emailRef.current.value.trim()) {
      setEmailFocused(false);
    }
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    if (!passwordRef.current.value.trim()) {
      setPasswordFocused(false);
    }
  };




  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', emailRef.current.value);
    formData.append('password', passwordRef.current.value);

    try {
      const response = await axios.post('http://181.143.234.138:5001/chat_business2/Dashboard/Dashboard/api_login.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming the API returns a token or some indication of a successful login
      console.log(response.data);
      if (response.status === 200 && response.data && response.data.name && response.data.email && response.data.type && response.data.number_a) {
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log('Login successful');
        window.location.reload();
        setCampo(false)
      } else {
        setCampo(true)
        setErrorMsg(response.data);

      }



    } catch (error) {
      // Handle errors (e.g., network issues, server errors)
      console.error('Login error:', error);

    }
  };

  useEffect(() => {
    // Verificar si hay información de usuario en localStorage
    const user = JSON.parse(localStorage.getItem('user'));
  
    // Si hay información de usuario y el tipo es 'agente', redirigir a la página '/home'
    if (user && user.type === 'agente') {
      navigation('/home');
    }

    if (user && user.type === 'admin') {
      navigation('/dashboard');
    }
  }, [navigation]);
  



  return (
    <div className='w-[100%] h-screen grid place-items-center' style={{ backgroundImage: "url('background2.png')", backgroundSize: "cover" }}>
      <div>
        <div className="m-auto bg-white w-[350px]  lg:w-96">

          <form onSubmit={handleFormSubmit}>
            <div className="border-t-4 border-blue-600 overflow-hidden rounded shadow-lg">
              <h3 className="text-xl text-center mt-8 mb-2">Bienvenido a</h3>
              <img className='w-56 mb-5 mx-auto' src="negociemoss.png" alt="" />

              <div className="px-4 mb-4">
                <div className={`relative ${emailFocused ? 'focus' : ''}`}>
                  <FontAwesomeIcon icon={faEnvelope} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${emailFocused ? 'text-blue-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    className={`border border-gray rounded w-full p-3 pl-10 outline-none focus:border-blue-500`}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    ref={emailRef}
                  />
                  <label
                    className={`absolute left-10 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.8rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${emailFocused || (emailRef.current && emailRef.current.value.trim()) ? 'transform -translate-y-[0.9rem] scale-[0.8] text-blue-500' : ''
                      }`}
                    onClick={() => emailRef.current.focus()}
                  >
                    Email
                  </label>

                </div>
              </div>

              <div className="px-4 mb-4">
                <div className={`relative ${passwordFocused ? 'focus' : ''}`}>
                  <FontAwesomeIcon icon={faLock} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${passwordFocused ? 'text-blue-500' : 'text-gray-400'}`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`border border-gray rounded w-full p-3 pl-10 outline-none focus:border-blue-500`}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    ref={passwordRef}
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer ${passwordFocused ? 'text-blue-500' : ''}`}
                    onClick={togglePasswordVisibility}
                  />
                  <label
                    className={`absolute left-10 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.8rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${passwordFocused || (passwordRef.current && passwordRef.current.value.trim()) ? 'transform -translate-y-[0.9rem] scale-[0.8] text-blue-500' : ''
                      }`}
                    onClick={() => passwordRef.current.focus()}
                  >
                    Contraseña
                  </label>

                </div>

                {Campo && (
                  <div className='text-md text-center absolute left-0 right-0 font-normal '>
                    {errorMsg}
                  </div>
                )}
              </div>



              <div className="px-4 mb-6 mt-8">
                <button
                  className="border border-blue-500 bg-blue-600 rounded w-full px-4 py-3 text-white font-semibold"
                  onClick={handleLogin}
                  type='submit'
                >
                  Ingresar
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
