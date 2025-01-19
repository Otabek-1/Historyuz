import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddCompetition() {
    const [id, setId] = useState("");
    const [competitionData, setCompetitionData] = useState({
        title: '',
        description: '',
        authorId: id, // authorId ni inputdan olib tashladik
        startsAt: '',
        endsAt: '',
        tests: [
            {
                id: 1,
                question_text: '',
                question_type: 'single_choice',
                options: {
                    '0': '',
                    '1': '',
                    '2': '',
                    '3': '',
                },
                correct: 0,
            },
        ],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompetitionData({ ...competitionData, [name]: value });
    };

    useEffect(() => {
        axios.get('https://history-uz-backend.onrender.com/api/users/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setId(res.data.user.id);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const handleTestChange = (index, field, value) => {
        const newTests = [...competitionData.tests];
        if (field === 'options') {
            newTests[index].options = { ...newTests[index].options, ...value };
        } else {
            newTests[index][field] = value;
        }
        setCompetitionData({ ...competitionData, tests: newTests });
    };

    const addNewTest = () => {
        const newTest = {
            id: competitionData.tests.length + 1,
            question_text: '',
            question_type: 'single_choice',
            options: {
                '0': '',
                '1': '',
                '2': '',
                '3': '',
            },
            correct: 0,
        };
        setCompetitionData({ ...competitionData, tests: [...competitionData.tests, newTest] });
    };

    const deleteTest = (index) => {
        const newTests = competitionData.tests.filter((_, i) => i !== index);
        setCompetitionData({ ...competitionData, tests: newTests });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(competitionData);

        const token = localStorage.getItem('token'); // Token olish
        if (!token) {
            alert('Iltimos, tizimga kiring.');
            return;
        }
        try {
            const response = await axios.post(
                'https://history-uz-backend.onrender.com/api/test/add', // API URL-ni o'zgartiring
                competitionData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert('Musobaqa muvaffaqiyatli qo‘shildi!');
            console.log(response.data);
        } catch (error) {
            console.error('Xatolik:', error);
            alert('Musobaqa qo‘shishda xatolik yuz berdi.');
        }
    };

    if(!id){
        return <div>Yuklanmoqda...</div>
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-5">
            <h1 className="text-2xl font-bold mb-4">Musobaqa qo‘shish</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Sarlavha</label>
                    <input
                        type="text"
                        name="title"
                        value={competitionData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label>Tavsif</label>
                    <input
                        type="text"
                        name="description"
                        value={competitionData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label>Boshlanish vaqti</label>
                    <input
                        type="datetime-local"
                        name="startsAt"
                        value={competitionData.startsAt}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label>Tugash vaqti</label>
                    <input
                        type="datetime-local"
                        name="endsAt"
                        value={competitionData.endsAt}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                {competitionData.tests.map((test, index) => (
                    <div key={index} className="border p-4 rounded mb-4">
                        <label>Savol matni</label>
                        <input
                            type="text"
                            value={test.question_text}
                            onChange={(e) =>
                                handleTestChange(index, 'question_text', e.target.value)
                            }
                            className="w-full p-2 border rounded"
                            required
                        />
                        <label>Variantlar</label>
                        <input
                            type="text"
                            placeholder="0-variant"
                            value={test.options['0']}
                            onChange={(e) =>
                                handleTestChange(index, 'options', { '0': e.target.value })
                            }
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="1-variant"
                            value={test.options['1']}
                            onChange={(e) =>
                                handleTestChange(index, 'options', { '1': e.target.value })
                            }
                            className="w-full p-2 border rounded mt-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="2-variant"
                            value={test.options['2']}
                            onChange={(e) =>
                                handleTestChange(index, 'options', { '2': e.target.value })
                            }
                            className="w-full p-2 border rounded mt-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="3-variant"
                            value={test.options['3']}
                            onChange={(e) =>
                                handleTestChange(index, 'options', { '3': e.target.value })
                            }
                            className="w-full p-2 border rounded mt-2"
                            required
                        />
                        <label>To‘g‘ri javob indeksi</label>
                        <input
                            type="number"
                            value={test.correct}
                            onChange={(e) =>
                                handleTestChange(index, 'correct', Number(e.target.value))
                            }
                            className="w-full p-2 border rounded"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => deleteTest(index)}
                            className="mt-2 w-full bg-red-500 text-white p-2 rounded"
                        >
                            Savolni o‘chirish
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addNewTest}
                    className="w-full bg-green-500 text-white p-2 rounded mt-2"
                >
                    Savol qo‘shish
                </button>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded mt-4"
                >
                    Musobaqani saqlash
                </button>
            </form>
        </div>
    );
}
