import  AOS  from 'aos';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import image from "../images/photo_2025-01-11_16-44-39.jpg";

export default function AdminNews() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    axios.get('https://history-uz-backend.onrender.com/api/articles')
      .then(res => {
        setNewsItems(res.data.articles);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteArticle = (id) =>{
    axios.delete(`https://history-uz-backend.onrender.com/api/articles/${id}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    }).then(res=>{
      console.log(res);
  
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <div className="w-full min-h-full flex flex-col pt-9">
    <h2 data-aos="fade-right" className="lg:text-5xl sm:text-3xl text-2xl font-semibold">
      Yangiliklar
    </h2>
    <Link to='/article' className='mt-5 mb-5 px-4 py-2 bg-green-600 w-max text-white rounded-md transition-all duration-700 hover:bg-green-300'>Yangilik/ maqola qo'shish</Link>
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <Link
            to={`/news/${item.slug}`}
            key={item.id}
            data-aos="fade-up"
            className="news-card bg-white rounded-lg shadow-lg overflow-hidden hover:cursor-pointer hover:shadow-2xl transition-all duration-500"
          >
            <img
              src={item.image? `https://history-uz-backend.onrender.com/uploads/${item.image}`: image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 min-h-full">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <div className="flex w-full items-center justify-between">
              <div className="text-sm text-gray-500">{item.created_at.slice(0,10)}</div>
              <div className="text-sm text-gray-500">
                <i className="fas fa-eye mr-2"></i>{item.views}</div>
              </div>
              <div className="flex items-center gap-6 mt-1">
              <Link to={`/news/edit/${item.id}`} className='px-4 py-2 text-white rounded-md bg-blue-600'>Tahrirlash</Link>
              <Link onClick={deleteArticle(item.id)} className='px-4 py-2 text-white rounded-md bg-red-600'>O'chirish</Link>
            </div>
            </div>
            
          </Link>
        ))}
      </div>
  
  </div>
  )
}
