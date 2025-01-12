import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TestApp = () => {
    const { id } = useParams('id');
    const [user, setUser] = useState([]);
    const [testData, setTestData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/api/users/me', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(res => {
                setUser(res.data.user);
            }).catch(err => {
                console.log(err);
            });
    }, []);


    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:4000/api/test/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
                .then(res => {
                    setTestData(res.data);
                }).catch(err => {
                    console.log(err);
                });
        }
    }, [id]);

    // Hozirgi vaqtni olish
    const currentDate = new Date();

    // Musobaqaning holatini aniqlash
    const getStatus = () => {
        if (!testData) return { status: "Yuklanmoqda...", color: "text-gray-600" }; // testData yuklanmagan bo'lsa

        const startTime = new Date(testData.starts_at);
        const endTime = new Date(testData.ends_at);

        if (currentDate < startTime) {
            return { status: "Hali boshlanmagan", color: "text-blue-600" };
        } else if (currentDate >= startTime && currentDate <= endTime) {
            return { status: "Boshlangan", color: "text-green-600" };
        } else {
            return { status: "Tugagan", color: "text-red-600" };
        }
    };

    const { status, color } = getStatus();

    const [selectedOptions, setSelectedOptions] = useState({});
    const [isRegistered, setIsRegistered] = useState(false);
    const [isTestStarted, setIsTestStarted] = useState(false);
    const [remainingTime, setRemainingTime] = useState(testData?.duration?.hours * 3600 + testData?.duration?.seconds || 0); // Vaqtni soniyalarda saqlash
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [viewAllResults, setViewAllResults] = useState(false); // Barcha natijalarni ko'rish holati
    const [resultsList, setResultsList] = useState(testData?.results || []); // Natijalar ro'yxati

    const handleOptionChange = (e, questionId) => {
        setSelectedOptions({
            ...selectedOptions,
            [questionId]: e.target.value,
        });
    };

    const checkAnswer = () => {
        let correctCount = 0;
        testData.tests.forEach((test) => {
            if (selectedOptions[test.id] == test.correct) {
                correctCount += 1;
            }
        });
        setCorrectAnswersCount(correctCount);
        setShowResults(true);

        // Natijalarni saqlash
        setResultsList((prevResults) => [
            ...prevResults,
            { name: `${user.name}`, result: `${correctCount}`, id: user.id },
        ]);
    };

    const handleRegister = () => {
        setIsRegistered(true);
    };

    const handleUnregister = () => {
        setIsRegistered(false);
        setIsTestStarted(false); // Unregister bo'lsa, testni boshlashni ham bekor qilish
    };

    const handleStartTest = () => {
        setIsTestStarted(true);
    };

    // Vaqtni yangilab borish
    useEffect(() => {
        if (isTestStarted) {
            const interval = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        clearInterval(interval);
                        return 0;
                    }
                });
            }, 1000); // 1 soniyada bir marta yangilash

            return () => clearInterval(interval);
        }
    }, [isTestStarted]);

    // Vaqtni formatlash
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const formatter = new Intl.DateTimeFormat("uz-UZ", {
            weekday: "long", // Haftaning kuni
            year: "numeric", // Yil
            month: "long", // Oy
            day: "numeric", // Kun
            hour: "2-digit", // Soat
            minute: "2-digit", // Daqiqa
            second: "2-digit", // Sekund
        });

        return formatter.format(date);
    };


    // Vaqt rangini aniqlash
    const getTimeColor = () => {
        if (remainingTime <= 0) return "bg-red-600";
        if (remainingTime <= testData?.duration?.hours * 3600 / 2) return "bg-yellow-600";
        return "bg-green-600";
    };

    if (!testData) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            {/* Musobaqa haqida ma'lumotlar */}
            <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-lg mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {testData.title}
                </h2>
                <p className="text-gray-600 mb-4">{testData.description}</p>
                <p className="text-gray-500">
                    Boshlanish vaqti: {formatTime(testData.starts_at)}
                </p>
                <p className="text-gray-500">
                    Tugash vaqti: {formatTime(testData.ends_at)}
                </p>
                <p className={`text-lg font-semibold ${color}`}>
                    Holat: {status}
                </p>

                {/* Agar musobaqa hali boshlanmagan bo'lsa, Register va Unregister */}
                {status === "Hali boshlanmagan" && (
                    <>
                        {isRegistered ? (
                            <button
                                onClick={handleUnregister}
                                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Unregister
                            </button>
                        ) : (
                            <button
                                onClick={handleRegister}
                                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Register
                            </button>
                        )}
                    </>
                )}

                {/* Agar musobaqa boshlangan bo'lsa, testni boshlash tugmasi */}
                {status === "Boshlangan" && isRegistered && !showResults && (
                    <>
                        {isTestStarted ? (
                            <div className="mt-6 max-w-xl w-full bg-white p-6 rounded-xl shadow-lg">
                                {testData.tests.map((test) => (
                                    <div key={test.id} className="space-y-4 mb-4">
                                        <h3 className="text-xl font-semibold">{test.question_text}</h3>
                                        <div className="space-y-2">
                                            {Object.entries(test.options).map(([key, value]) => (
                                                <div key={key} className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        id={`${test.id}-${key}`}
                                                        name={`answer-${test.id}`}
                                                        value={key}
                                                        checked={selectedOptions[test.id] === key}
                                                        onChange={(e) => handleOptionChange(e, test.id)}
                                                        className="form-radio text-indigo-600"
                                                    />
                                                    <label htmlFor={`${test.id}-${key}`} className="text-lg">
                                                        {value}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={checkAnswer}
                                    className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Testni tugatish
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleStartTest}
                                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Testni boshlash
                            </button>
                        )}
                    </>
                )}

                {/* Natijalar box (hidden bo'ladi) */}
                {showResults && (
                    <div className="mt-6 w-full bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold">Natijalar</h3>
                        <p className="text-lg font-semibold">
                            To'g'ri javoblar: {correctAnswersCount} / {testData.tests.length}
                        </p>
                    </div>
                )}

                {/* Barcha natijalarni ko'rish */}
                {viewAllResults && (
                    <div className="mt-6 w-full bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold">Barcha natijalar</h3>
                        <ul>
                            {resultsList.map((result, index) => (
                                <li key={index} className="py-2">{result.name}: {result.result}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {resultsList.length > 0 && !viewAllResults && (
                    <button
                        onClick={() => setViewAllResults(true)}
                        className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                        Barcha natijalarni ko'rish
                    </button>
                )}
            </div>
        </div>
    );
};

export default TestApp;
