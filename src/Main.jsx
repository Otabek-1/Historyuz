import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './fontawesome-free-5.15.4-web (1)/fontawesome-free-5.15.4-web/css/all.css';
import Start from './Components/Start';
import News from './Components/News';
import PracticeTests from './Components/PracticeTests';
import Competitions from './Components/Competitions';
import Settings from './Components/Settings';
import axios from 'axios';

export default function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const { menu } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");

  const API = axios.create({
    baseURL: "https://history-uz-backend.onrender.com",
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    const requestInterceptor = API.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptor = API.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/auth');
        }
        return Promise.reject(error);
      }
    );
    if (!localStorage.getItem('token')) {
      navigate('/auth');
    }
    return () => {
      API.interceptors.request.eject(requestInterceptor);
      API.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  const handleMenuClick = (menuName) => navigate(`/${menuName}`);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('https://history-uz-backend.onrender.com/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => {
        setUserInfo(response.data.user);
        localStorage.setItem('id', response.data.user.id);
      })
      .catch((error) => {
        console.error(error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/auth');
        }
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 flex flex-col">
      <div
        className="fixed top-4 left-4 z-50 md:hidden cursor-pointer text-white bg-green-500 p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={`fas z-50 ${isOpen ? 'fa-times' : 'fa-bars'} text-3xl`}></i>
      </div>

      <div
        className={`navbar select-none fixed left-0 top-0 min-h-screen w-[250px] bg-green-500 flex flex-col items-center shadow-lg transition-transform z-40 duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div
          className="logo w-full min-h-[150px] flex items-center justify-center"
          style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 20%, rgba(34, 197, 94, 1) 100%)' }}
        >
          <Link to="/" className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            History.uz
          </Link>
        </div>

        <ul className="navbar-items w-full flex flex-col mt-5 space-y-2">
          {[
            { name: 'main', icon: 'fa-home', label: 'Bosh sahifa' },
            { name: 'news', icon: 'fa-newspaper', label: 'Yangiliklar' },
            { name: 'tests', icon: 'fa-question', label: 'Testlar' },
            { name: 'competitions', icon: 'fa-trophy', label: 'Musobaqalar' },
            
            // { name: 'settings', icon: 'fa-cogs', label: 'Sozlamalar' },
            { name: 'logout', icon: 'fa-sign-out-alt', label: 'Chiqish' },
          ].map(({ name, icon, label }) => (
            <li key={name} className="navbar-item w-full">
              <button
                onClick={() => handleMenuClick(name)}
                className={`w-full flex items-center gap-4 px-5 py-3 text-white hover:bg-green-400 transition-all duration-300 ${menu === name ? 'bg-green-400' : ''}`}
              >
                <i className={`fas ${icon}`}></i><span>{label}</span>
              </button>
            </li>
          ))}
          { userInfo && userInfo.role === 'admin' && (
            <li key='admin' className="navbar-item w-full">
            <button
              onClick={() => navigate('/admin')}
              className={`w-full flex items-center gap-4 px-5 py-3 text-white hover:bg-green-400 transition-all duration-300`}
            >
              <i className={`fas fa-user-shield`}></i><span>Admin</span>
            </button>
          </li>
          ) }
          <li key='tg-channel' className="navbar-item w-full">
            <Link to='https://t.me/tarix_yozgani_keldik' className='flex items-center w-max px-6 text-white rounded-full py-3 justify-start ml-5 text-lg bg-blue-400 gap-4'><i className="fab fa-telegram-plane"></i> Telegram kanal</Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-4 md:ml-[250px]">
        {menu === 'main' ? <Start user={userInfo} /> :
          menu === 'news' ? <News /> :
            menu === 'tests' ? <PracticeTests /> :
              menu === 'competitions' ? <Competitions /> :
                menu === 'settings' ? <Settings /> :
                  menu === 'logout' ?  handleLogout()  :  null}
      </div>

      <footer className='flex-1 p-4 md:ml-[250px] mt-5 min-h-[100px] bg-gray-300 flex flex-col items-center justify-center'>
        <Link to="/" className="text-3xl sm:text-4xl font-bold tracking-tight text-green-500">
          History.uz
        </Link>
        <ul className="footer-menu flex mt-3 gap-5 w-full justify-center">
          {['Bogʻlanish', 'Biz haqimizda', 'Bosh sahifa', 'FAQ'].map((item, idx) => (
            <li key={idx} className='px-2'><a href="#">{item}</a></li>
          ))}
        </ul>
        <span className='mt-2'>&copy; 2025 History.uz</span>
      </footer>
    </div>
  );
}
