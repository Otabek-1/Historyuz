import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function PracticeTest() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const id = searchParams.get('id');
  const testCount = searchParams.get('testCount');

  const questions = [
    {
      question: "Amir Temur qachon tug'ilgan?",
      options: ["1336- yil", "1337- yil", "1338- yil", "1339- yil"],
      correct: 0 // To'g'ri javobning indeks raqami
    },
    {
      question: "O'zbekiston mustaqilligini qachon e'lon qilgan?",
      options: ["1990", "1991", "1992", "1993"],
      correct: 1
    }
    // Add more questions
  ];

  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionIndex, optionIndex) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
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
        <h1 className="text-4xl font-semibold text-black">O'zbekiston tarixi {id}-sinf</h1>

        {!showResults ? (
          <ul className="tests flex flex-col gap-5 mt-5 ml-5">
            {questions.map((q, index) => (
              <li key={index} className="flex flex-col">
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
            Sizning natijangiz: {score} / {questions.length}

            <Link to='/tests' className='mt-5 py-2 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-max'>Ortga qaytish</Link>
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
