import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Results = () => {
  const { id } = useParams('id');
  
  // Example results data
  const resultsData = [
    { name: "Aliyev Vali", score: "10/30" },
    { name: "Toirov Said", score: "15/30" },
    { name: "Karimov Salim", score: "20/30" },
    { name: "Ahmedov Anvar", score: "18/30" },
    { name: "Nazarov Aziz", score: "12/30" },
    { name: "Shomurodov Kamron", score: "22/30" },
    { name: "Davronov Shahzod", score: "9/30" },
    { name: "Muhammadov Umar", score: "14/30" },
    { name: "Saidov Samir", score: "16/30" },
    { name: "Azimov Bobur", score: "25/30" }
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(resultsData.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  // Get the current page's data
  const currentResults = resultsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePagination = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center p-5' 
         style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 20%, rgba(34, 197, 94, 1) 100%)'}}>
        <div className="container w-[90%] min-h-screen flex flex-col p-5 rounded-lg" 
             style={{ background: 'rgba(255,255,255,.6)', backdropFilter:'blur(10px)'}}>
            <h1 className='text-3xl font-semibold mb-5'>History tournir no {id}</h1>
            <ul className="w-full flex flex-col mt-5">
                {currentResults.map((result, index) => (
                    <li key={index} className="w-full p-4 border-b border-gray-300">
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-green-700">{(currentPage - 1) * itemsPerPage + index + 1}</span>
                            <span className="text-xl">{result.name}</span>
                            <span className="text-lg text-gray-700">{result.score}</span>
                        </div>
                    </li>
                ))}
            </ul>
            
            <div className="pagination mt-5 flex justify-center items-center gap-5">
                <button
                    onClick={() => handlePagination(currentPage - 1)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    Oldingi
                </button>

                <span className="text-xl">{currentPage} / {totalPages}</span>

                <button
                    onClick={() => handlePagination(currentPage + 1)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={currentPage === totalPages}
                >
                    Keyingi
                </button>
            </div>
        </div>
    </div>
  )
}

export default Results;
