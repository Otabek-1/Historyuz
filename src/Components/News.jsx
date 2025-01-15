import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../fontawesome-free-5.15.4-web (1)/fontawesome-free-5.15.4-web/css/all.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import image from "../images/photo_2025-01-11_16-44-39.jpg";

export default function News() {
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

  return (
    <div className="w-full min-h-screen pt-9 px-5 md:px-16 lg:px-24 flex flex-col">
      <h2
        data-aos="fade-right"
        className="lg:text-5xl sm:text-3xl text-2xl font-semibold mb-8"
      >
        Yangiliklar 📢
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <Link
            to={`/news/${item.slug}`}
            key={item.id}
            data-aos="fade-up"
            className="news-card bg-white rounded-lg shadow-lg overflow-hidden hover:cursor-pointer hover:shadow-2xl transition-all duration-500"
          >
            <img
              src={item.image? `http://localhost:4000/uploads/${item.image}`: image}
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
