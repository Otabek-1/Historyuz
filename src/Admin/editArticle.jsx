import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EditArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [articleId, setArticleId] = useState('');
  const { id } = useParams('id');

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://history-uz-backend.onrender.com/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setAuthorId(res.data.user.id);
      })
      .catch(err => {
        console.log(err);
      })

    axios.get(`https://history-uz-backend.onrender.com/api/articles/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(res =>{
        const i =res.data.article;
        setTitle(i.title);
        setContent(i.content);
        setAuthorId(i.author_id);
        setArticleId(i.id);
    }).catch(err=>{
        console.log(err);
    })
  }, []);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const token = localStorage.getItem('token');

    try {
        const response = await axios.put(
          `https://history-uz-backend.onrender.com/api/articles/${articleId}`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        alert('Maqola muvaffaqiyatli yangilandi!');
        console.log(response.data);
      } catch (error) {
        console.error('Xatolik yuz berdi:', error);
        alert('Maqola yangilashda xatolik yuz berdi.');
      }
  }

  if(!title && !content && !authorId){
    return <div className='text-center w-full h-full pt-20'>Yuklanmoqda...</div>
  }
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Maqola qo‘shish</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Sarlavha</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mazmun</label>
          <textarea
            value={content}
            onChange={handleContentChange}
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
