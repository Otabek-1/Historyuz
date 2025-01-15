import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from "../images/photo_2025-01-11_16-44-39.jpg";

export default function NewsShow() {
  const { slug } = useParams(); // URL parametrdan slugni olish
  const [likes, setLikes] = useState(0); // Like soni uchun state
  const viewsCount = 120; // Namuna uchun ko‘rishlar soni
  const publishDate = '2025-01-09'; // Namuna uchun chop etilgan sana
  const [article, setArticle] = useState([]);
  const [viewed, setViewed] = useState(false);
  useEffect(() => {
    axios.get(`https://history-uz-backend.onrender.com/api/articles/slug/${slug}`)
      .then(res => {
        setArticle(res.data.article);
      }).catch(err => {
        console.log(err);
      });
  }, []);

  setInterval(() => {
    if(article.viewed && viewed){
      axios.patch(`https://history-uz-backend.onrender.com/api/articles/${article.id}/views`, { id:article.id }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          console.log(res);
          setViewed(true);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, 5000);




  const handleLike = () => {
    if (article.likes.includes(localStorage.getItem('id'))) {
      console.log('Info'); 
    }
    else{
      axios.patch(`http://localhost:4000/api/articles/${article.id}/likes`, { userId: localStorage.getItem('id') }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  return (
    <div className="w-full flex flex-col min-h-screen items-center">
      <div className="container flex flex-col items-start bg-white p-6 shadow-md rounded-lg">
        <img
          src={article.image ? `http://localhost:4000/uploads/${article.image}` : logo}
          className="w-full rounded mb-4"
          alt="Article image"
        />
        <h1 className="text-3xl font-bold mb-4">
          {article.title}
        </h1>
        {article.content}
        <div className="w-full flex items-center justify-between mt-4 border-t pt-4">
          <div className="flex items-center gap-4">
            <span className="text-lg text-gray-600 flex items-center gap-1">
              <i className="fas fa-eye" aria-hidden="true"></i> {article.views} Ko'rishlar
            </span>
            <span className="text-lg text-gray-600 flex items-center gap-1">
              <i className="fas fa-calendar" aria-hidden="true"></i> {article.created_at ? article.created_at.slice(0, 10) : 'loading...'}
            </span>
          </div>
          <button
            onClick={handleLike}
            className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <i className="fas fa-thumbs-up" aria-hidden="true"></i> Like {article.likes ? article.likes.length : " "}
          </button>
        </div>
      </div>
    </div>
  );
}
