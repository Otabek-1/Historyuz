import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, useNavigate } from 'react-router-dom';

export default function PracticeTests() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const [showMorethemedTests, setShowMorethemedTests] = useState('max-h-52');
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);  // Indexni saqlash
    const [testCount, setTestCount] = useState(20);         // Tanlangan savollar soni
    const navigate = useNavigate();                         // Navigatsiya qilish uchun

    const StartTest = (index) => {
        setSelectedIndex(index);
        setShowModal(true);
    };

    const handleStart = () => {
        navigate(`/practice?id=${selectedIndex + 1}&testCount=${testCount}`);
    };

    return (
        <div className="w-full min-h-screen pt-9 flex flex-col px-4 sm:px-8 md:px-12 lg:px-24">
            <h2 data-aos="fade-right" className="lg:text-5xl sm:text-3xl text-2xl font-semibold">Testlar ⁉️</h2>
            {showModal && (
                        <div data-aos='fade-up' className="curtain absolute z-50 flex items-start justify-start w-full h-full" >
                            <div className="starttest relative w-[600px] p-5 h-[300px] flex flex-col bg-white shadow-lg z-50 top-[20%] left-[10%] rounded-lg">
                                <span className="text-2xl text-black font-semibold">O'zbekiston tarixi {5 + selectedIndex}-sinf</span>
                                <div className="mb-2 mt-5 flex gap-3">
                                    <label htmlFor="numberquestion" className="text-black w-full">Savollar soni:</label>
                                    <select id="numberquestion" name="numberquestion" className="mt-1 block w-full rounded-md border-gray-300 outline-none border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={testCount} onChange={(e) => setTestCount(e.target.value)}>
                                        <option value="20">20</option>
                                        <option value="25">25</option>
                                        <option value="30">30</option>
                                        <option value="35">35</option>
                                    </select>
                                </div>
                                <div className="buttons absolute w-full bottom-5 flex items-center justify-center gap-5">
                                    <button onClick={handleStart} className="bg-green-600 text-white p-2 rounded-lg">Boshlash</button>
                                    <button onClick={() => setShowModal(false)} className="bg-white text-green-600 border-2 border-green-600 p-2 rounded-lg">Bekor qilish</button>
                                </div>
                            </div>
                        </div>
                    )}
            <div className="container w-full flex flex-col mt-5">
                <div data-aos="fade-up" className={`relative flex flex-col transition-all duration-700 ${showMorethemedTests} overflow-hidden border-2 border-green-600 rounded-lg`}>
                  
                    <span className="text-2xl w-full text-white bg-green-600 p-2">Mavzulashtirilgan testlar</span>
                    <ul>
                        {[...Array(7)].map((_, index) => (
                            <li key={index} data-aos="fade-up" data-aos-delay={index * 100} className="test w-full p-2">
                                <Link onClick={() => StartTest(index)} className='w-full text-xl font-semibold flex items-center justify-between p-2 border-2 transition-all hover:border-b-4 border-green-600 rounded-lg'>
                                    {`${5 + index}- sinf O'zbekiston tarixi`}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <span className="w-full absolute bottom-0 text-center text-sm font-semibold text-white p-2 cursor-pointer select-none" onClick={() => setShowMorethemedTests(showMorethemedTests === 'max-h-52' ? '' : 'max-h-52')} style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(34, 197, 94, 1))' }}>
                        {showMorethemedTests === 'max-h-52' ? 'Batafsil' : 'Qisqartirish'}
                    </span>
                </div>
            </div>
        </div>
    );
}
