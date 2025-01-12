import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './fontawesome-free-5.15.4-web (1)/fontawesome-free-5.15.4-web/css/all.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [theme, setTheme] = useState(window.localStorage.getItem('mode') || 'light');
  const [authMode, setAuthMode] = useState('login');
  const [icon, setIcon] = useState('eye'); // eye or eye-slash

  const [errorText, errorMessage] = useState('');
  const nav = useNavigate(null);
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    };
    axios.post("http://localhost:4000/api/users/login", data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      window.localStorage.setItem('token', res.data.token);
      nav('/main');
    })
    .catch(error => {
      errorMessage(error.response.data.message);  
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password
    };
    axios.post("http://localhost:4000/api/users/register", data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res =>{
      window.localStorage.setItem('token', res.data.token);
      nav('/main');
    })
    .catch(error => {
      errorMessage(error.response.data.message);  
    });
  };

  useEffect(() => {
    window.localStorage.setItem('mode', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const renderForm = () => (
    <form className="flex flex-col w-full min-h-full">
      <span className="text-2xl sm:text-3xl md:text-4xl font-semibold ">
        {authMode === 'login' ? 'Welcome back!' : 'Create your account'}
      </span>
      <span className={` ${errorText.length > 0 ? 'block' : 'hidden'} error-text mb-2 mt-2 text-red-500`}>{errorText}</span>
      {authMode === 'register' && (
        <div className="mb-4 flex flex-col">
          <label htmlFor="fullname">Full Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            className="px-2 py-2 text-sm sm:text-md outline-none border-2 focus:border-green-300 text-gray-700 rounded-md"
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Enter your full name"
            required
          />
        </div>
      )}
      <div className="mb-4 flex flex-col">
        <label htmlFor="email">Enter Email Address</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="px-2 py-2 text-sm sm:text-md outline-none border-2 focus:border-green-300 text-gray-700 rounded-md"
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          required
        />
      </div>
      <div className="mb-4 flex flex-col relative">
        <label htmlFor="password">Enter Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="px-2 py-2 text-sm sm:text-md outline-none border-2 focus:border-green-300 text-gray-700 rounded-md"
          type={icon === 'eye' ? 'password' : 'text'}
          name="password"
          id="password"
          placeholder="Password"
          required
        />
        <i
          className={`fas fa-${icon} absolute top-[70%] right-[5%] transform -translate-y-1/2 text-gray-600 cursor-pointer select-none`}
          onClick={() => setIcon(icon === 'eye' ? 'eye-slash' : 'eye')}
        ></i>
      </div>
      <div className="mb-4 flex flex-col">
        <input
          className="w-full bg-green-500 py-2 text-sm sm:text-lg text-white rounded-md mt-5 transition-all duration-200 hover:bg-green-400"
          type="submit"
          onClick={authMode === 'login' ? (e) => handleLogin(e) : (e) => handleRegister(e)}
          value={authMode === 'login' ? 'Log In' : 'Register'}
        />
      </div>
      {authMode === 'login' && (
        <div className="mb-4 flex flex-col">
          <Link
            to="/forgot-password"
            className="text-center text-gray-600 transition-all duration-200 hover:text-green-600"
          >
            Forgot your password?
          </Link>
        </div>
      )}
    </form>
  );

  return (
    <div className="bg-slate-300 flex items-center justify-center w-full h-screen p-4">
      <div className="relative w-full max-w-[400px]">
        <div className="buttons w-full flex absolute top-[-48px]">
          <div
            className={`w-[50%] h-[50px] bg-slate-200 rounded-t-2xl border-t-[5px] border-t-green-400 flex items-center justify-center select-none text-lg transition-opacity duration-500 cursor-pointer ${authMode === 'login' ? 'opacity-100' : 'opacity-70'
              }`}
            onClick={() => setAuthMode('login')}
          >
            <span>Login</span>
          </div>
          <div
            className={`w-[50%] h-[50px] bg-slate-200 rounded-t-2xl border-t-[5px] border-t-green-400 flex items-center justify-center select-none text-lg transition-opacity duration-500 cursor-pointer ${authMode === 'register' ? 'opacity-100' : 'opacity-70'
              }`}
            onClick={() => setAuthMode('register')}
          >
            <span>Register</span>
          </div>
        </div>
        <div className="box w-full bg-slate-200 rounded-md shadow-lg pt-10 px-5 pb-5">
          {renderForm()}
        </div>
      </div>
    </div>
  );
}
