import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

export default function AddArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');

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
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Iltimos, avval tizimga kiring!');
      return;
    }

    try {
      const response = await axios.post(
        'https://history-uz-backend.onrender.com/api/articles',
        {
          title,
          content,
          author_id: authorId,
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mazmun</label>
          <Editor
            apiKey='55wtw6ufxz1roezqo69ju6tspgcbnqffmrjtw51wqjuh5bhw'
            initialValue="<p>Matn yozing...</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: 'link image code',
              toolbar: 'undo redo | formatselect | bold italic | link image | code',
            }}
            onEditorChange={(newContent) => setContent(newContent)}
          />
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
