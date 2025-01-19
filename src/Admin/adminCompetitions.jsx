import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import trophyImg from '../images/trophy-star.png';
import { Link } from 'react-router-dom';
import "../fontawesome-free-5.15.4-web (1)/fontawesome-free-5.15.4-web/css/all.css";
import axios from 'axios';

export default function Competitions() {
    const [competitions, setCompetitions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState([]);
    const itemsPerPage = 3;

    useEffect(() => {
       axios.get('https://history-uz-backend.onrender.com/api/users/me', {
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
       }) 
       .then((response) => {
        setUser(response.data.user);
       })
       .catch((error) => {
        console.log(error);
       });
    },[])
    
    useEffect(() => {
        axios.get('https://history-uz-backend.onrender.com/api/test/')
            .then(res => {
                setCompetitions(res.data.sessions);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const currentDate = new Date();
    const ongoingAndUpcoming = competitions.filter(comp => new Date(comp.ends_at) > currentDate);
    const completedCompetitions = competitions.filter(comp => new Date(comp.ends_at) <= currentDate);

    const totalPages = Math.ceil(completedCompetitions.length / itemsPerPage);
    const paginatedCompleted = completedCompetitions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const renderCompetitionCard = (comp) => (
        <div key={comp.id} className="w-full competitions-card mb-5">
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div
                    data-aos="flip-left"
                    className="w-full md:w-1/3 h-72 rounded-lg flex flex-col justify-center items-center gap-3"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,1) 17%, rgba(0,183,2,1) 100%)',
                    }}
                >
                    <img src={trophyImg} className="w-1/4 md:h-1/3" alt="Musobaqa kubogi" />
                    <span className="text-lg font-semibold text-green-800 text-center">{comp.title}</span>
                    <Link to={`/competition/${comp.id}`} className="px-4 py-2 bg-red-600 text-white rounded-full border-2 border-red-600 text-sm md:text-lg transition-all hover:bg-white hover:text-red-600">
                        Bekor qilish
                    </Link>
                </div>
                <div data-aos="fade-up" className="w-full md:w-2/3 p-5 rounded-lg bg-white shadow-lg">
                    <table className="w-full">
                        <tbody>
                        <tr className="border-b">
                                <th className="py-2 text-gray-600 text-start">Batafsil</th>
                                {/* <td className={`py-2 font-semibold ${comp.participants.includes(user.id) ? 'text-green-600' : 'text-red-600'}`}>{comp.participants.includes(user.id) ? 'Registered ✔️' : 'Unregistered ❌'}</td> */}
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 text-gray-600">Boshlanish vaqti</td>
                                <td className="py-2 text-gray-600">{new Date(comp.starts_at).toLocaleString('uz-UZ')}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 text-gray-600">Qatnashuvchilar soni</td>
                                <td className="py-2 text-gray-600">{comp.participants.length}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 text-gray-600">Davomiyligi</td>
                                <td className="py-2 text-gray-600">{comp.duration.hours} soat</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 text-gray-600">Savollar soni</td>
                                <td className="py-2 text-gray-600">{comp.tests_count}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 text-gray-600">Holati</td>
                                <td className={`py-2  ${new Date() < new Date(comp.starts_at) ? 'text-blue-600' : 'text-green-600'}`}>
                                    {new Date() < new Date(comp.starts_at) ? 'Hali boshlanmagan' : 'Boshlangan'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    return (
        <div className='w-full min-h-screen pt-9 flex flex-col px-4 sm:px-8 md:px-12 lg:px-24'>
            <h2 data-aos="fade-right" className="lg:text-5xl sm:text-3xl text-2xl font-semibold">Musobaqalar 🏴</h2>

            <Link className='m-5 px-4 py-2 bg-green-500 w-max rounded-md text-white' to='/competition/add'>Musobaqa tashkillashtirish</Link>

            <span className="mt-7 font-semibold mb-3 text-xl">Mavjud musobaqalar</span>
            {ongoingAndUpcoming.map(renderCompetitionCard)}

            <span className="mt-7 font-semibold mb-3 text-xl">Bo'lib o'tgan musobaqalar</span>
            <ul className="tests w-full flex flex-col gap-2">
                {paginatedCompleted.map((comp, index) => (
                    <li
                        key={comp.id}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        className="w-full text-xl font-semibold flex items-center justify-between p-2 px-4 border-2 transition-all hover:border-b-4 border-green-600 rounded-lg"
                    >
                        {comp.title}

                        <Link to={`/competition/result/${comp.id}`} className='px-4 py-2 bg-green-600 text-white rounded-full border-2 border-green-600 text-sm md:text-lg transition-all hover:bg-white hover:text-green-600'>
                            <i className="fas fa-search"></i>
                            Natijalar
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between mt-5">
                <button
                    onClick={() => handlePageChange('prev')}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-full border-2 border-green-600 transition-all ${currentPage === 1 ? 'bg-gray-400 text-white' : 'bg-white text-green-600 hover:bg-green-600 hover:text-white'}`}
                >
                    Oldingi
                </button>
                <button
                    onClick={() => handlePageChange('next')}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-full border-2 border-green-600 transition-all ${currentPage === totalPages ? 'bg-gray-400 text-white' : 'bg-white text-green-600 hover:bg-green-600 hover:text-white'}`}
                >
                    Keyingi
                </button>
            </div>
        </div>
    );
}
