import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminNews from './adminNews';
import AdminTests from './adminTests';
import AdminCompetitions from './adminCompetitions';
import  AOS  from 'aos';

export default function AdminMain() {
    const [isOpen, setIsOpen] = useState(false);
    const [ menu, setMenu ] = useState("adminNews");
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState("");
    const handleMenuClick = (menuName) => setMenu(menuName);

    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);
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
                    className="logo flex-col w-full min-h-[150px] flex items-center justify-center"
                    style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 20%, rgba(34, 197, 94, 1) 100%)' }}
                >
                    <Link to="/" className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                        History.uz
                    </Link>
                    <span className='text-white text-sm'>Admin Panel</span>
                </div>

                <ul className="navbar-items w-full flex flex-col mt-5 space-y-2">
                    {[
                        { name: 'adminNews', icon: 'fa-newspaper', label: 'Yangiliklar' },
                        { name: 'adminTests', icon: 'fa-question', label: 'Testlar' },
                        { name: 'adminCompetitions', icon: 'fa-trophy', label: 'Musobaqalar' },

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
                </ul>
            </div>

            <div className="flex-1 p-4 md:ml-[250px]">
                    {menu === 'adminNews' ? <AdminNews /> :
                        menu === 'adminTests' ? <AdminTests /> :
                            menu === 'adminCompetitions' ? <AdminCompetitions /> : <AdminNews />}
                  </div>
        </div>
    )
}
