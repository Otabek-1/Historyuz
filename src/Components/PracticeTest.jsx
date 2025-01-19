import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function PracticeTest() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const questionId = searchParams.get('id');
  const questionCount = searchParams.get('testCount');
  const userId = (1);

  const [tests, setTests] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Testlarni API'dan olish uchun Axiosdan foydalanish
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/practice?questionId=${questionId}&questionCount=${questionCount}&userId=${userId}`
        );
        setTests(response.data.tests); // Testlarni state'ga o'rnatish
      } catch (error) {
        console.error("Testlarni olishda xatolik:", error);
      }
    };

    fetchTests();
  }, [questionId, questionCount, userId]); // dependenciyalarga asoslangan qayta ishlov

  const handleAnswer = (questionIndex, optionIndex) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    tests.forEach((q, index) => {
      if (answers[index] === q.correct) {
        correctAnswers += 1;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  return (
    <div className="w-full min-h-screen flex flex-col pt-3 pb-3 bg-slate-200 items-center">
      <div className="container min-h-screen w-[60%] shadow-2xl pl-5 bg-white rounded-lg flex flex-col pt-5 pb-5">
        <h1 className="text-4xl font-semibold text-black">O'zbekiston tarixi {questionId}-sinf</h1>

        {!showResults ? (
          <ul className="tests flex flex-col gap-5 mt-5 ml-5">
            {tests.map((q, index) => (
              <li key={q.id} className="flex flex-col">
                <span className="question text-black pb-3">{index + 1}. {q.question}</span>
                {q.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name={`question${index}`}
                      id={`q${index}a${optIndex}`}
                      onChange={() => handleAnswer(index, optIndex)}
                    />
                    <label htmlFor={`q${index}a${optIndex}`} className="text-black">{option}</label>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-2xl flex flex-col pt-20 items-center font-semibold text-center">
            Sizning natijangiz: {score} / {tests.length}

            <Link to='/tests' className='mt-5 py-2 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-max'>
              Ortga qaytish
            </Link>
          </div>
        )}

        {!showResults && (
          <button
            onClick={handleSubmit}
            className="mt-5 w-max p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Testni tugatish
          </button>
        )}
      </div>
    </div>
  );
}
