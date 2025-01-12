import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

export default function PracticeTests() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const [showMorethemedTests, setShowMorethemedTests] = useState('max-h-52');

    return (
        <div className="w-full min-h-screen pt-9 flex flex-col px-4 sm:px-8 md:px-12 lg:px-24">
            <h2
                data-aos="fade-right"
                className="lg:text-5xl sm:text-3xl text-2xl font-semibold"
            >
                Testlar ⁉️
            </h2>

            <div className="container w-full flex flex-col mt-5">
                <div 
                    data-aos="fade-up"
                    className={`relative flex flex-col transition-all duration-700 ${showMorethemedTests} overflow-hidden border-2 border-green-600 rounded-lg`}
                >
                    <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center z-50" style={{backdropFilter: 'blur(5px)'}}>
                        <span className="text-gray-600 text-4xl font-semibold">Tez orada...</span>
                    </div>
                    <span className="text-2xl w-full text-white bg-green-600 p-2">Mavzulashtirilgan testlar</span>
                    <ul className="tests w-full flex flex-col gap-1">
                        {[...Array(7)].map((_, index) => (
                            <li 
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="test w-full p-2"
                            >
                                <Link className='w-full text-xl font-semibold flex items-center justify-between p-2 border-2 transition-all hover:border-b-4 border-green-600 rounded-lg'>
                                    {`${5 + index}- sinf O'zbekiston tarixi`}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <span 
                        className="w-full absolute bottom-0 text-center text-sm font-semibold text-white p-2 cursor-pointer select-none" 
                        onClick={() => setShowMorethemedTests(showMorethemedTests === 'max-h-52' ? '' : 'max-h-52')} 
                        style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(34, 197, 94, 1))' }}
                    >
                        {showMorethemedTests === 'max-h-52' ? 'Batafsil' : 'Qisqartirish'}
                    </span>
                </div>
            </div>
        </div>
    );
}
