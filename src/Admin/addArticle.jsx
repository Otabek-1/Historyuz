import React, { useState } from 'react';
import axios from 'axios';

export default function AddArticle() {
  const [articleData, setArticleData] = useState({
    id: '',
    title: '',
    content: '',
    author_id: '',
    created_at: '',
    updated_at: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tokenni localStoragedan olish
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Iltimos, avval tizimga kiring!');
      return;
    }

    try {
      // Axios so'rovi
      const response = await axios.post(
        'https://history-uz-backend.onrender.com/api/articles',
        {
          ...articleData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Maqola muvaffaqiyatli qo‘shildi!');
      console.log(response.data);
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
      alert('Maqola qo‘shishda xatolik yuz berdi.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Maqola qo‘shish</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Sarlavha</label>
          <input
            type="text"
            name="title"
            value={articleData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mazmun</label>
          <textarea
            name="content"
            value={articleData.content}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          ></textarea>
        </div>       
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Saqlash
        </button>
      </form>
    </div>
  );
}
