import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import trophyImg from '../images/trophy-star.png';
import axios from 'axios';
import logo from "../images/photo_2025-01-11_16-44-39.jpg";

export default function Start({ user }) {
  const [newestArticles, setNewestArticles] = useState(null);
  const [competition, setCompetition] = useState([]);
  const [isCompetitionActive, setIsCompetitionActive] = useState(true); // Musobaqaning faolligini tekshirish uchun

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    axios.get('https://history-uz-backend.onrender.com/api/articles')
      .then(res => {
        setNewestArticles(res.data.articles.slice(0, 2));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get('https://history-uz-backend.onrender.com/api/test/')
      .then(res => {
        const latestCompetition = res.data.sessions[res.data.sessions.length - 1];
        setCompetition(latestCompetition);

        // Musobaqaning tugash vaqtini joriy vaqt bilan taqqoslash
        const currentTime = new Date();
        const endTime = new Date(latestCompetition.ends_at);
        if (currentTime > endTime) {
          setIsCompetitionActive(false); // Agar musobaqa tugagan bo'lsa
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const userName = user?.name;
  const firstName = userName ? userName.split(' ')[0] : 'Foydalanuvchi';

  // if (!isCompetitionActive) {
  //   return null; // Agar musobaqa tugagan bo'lsa, hech narsa ko'rsatmaslik
  // }

  return (
    <div className="w-full min-h-full flex flex-col pt-9">
      <h2 data-aos="fade-right" className="lg:text-5xl sm:text-3xl text-2xl font-semibold">
        Salom, {firstName} 👋
      </h2>

      {/* News Section */}
      <section data-aos="fade-up" className="whatsnew w-full flex flex-col mt-9">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">So'nggi yangiliklar</h3>
          <Link to="/news" className="text-sm text-blue-400">
            Barcha yangiliklar
          </Link>
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {newestArticles && newestArticles.map((article, index) => (
            <div key={index} data-aos="zoom-in" className="news-card w-full md:w-1/2 h-72 rounded-lg bg-gray-200 overflow-hidden">

              <img
                src={article.image ? `http://localhost:4000/uploads/${article.image}` : logo}
                className="w-full max-h-[45%] object-cover"
                alt="Yangilik rasmi"
              />

              <div className="p-3 flex flex-col gap-2">
                <span className="text-lg font-semibold">{article?.title || 'No title'}</span>
                <div
                dangerouslySetInnerHTML={{
                  __html:article?.content && article.content.length > 60 ? article.content.slice(0, 60) + "..." : article?.content || 'No content'
                }}
                ></div>
                <Link to={`/news/${article.slug}`} className="text-sm text-blue-400">
                  Batafsil
                </Link>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Next Competition Section */}
      {isCompetitionActive && competition && (
        <section data-aos="fade-left" className="next-competition h-auto mt-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Keyingi musobaqa</h3>
            <Link to="/competitions" className="text-sm text-blue-400">
              Musobaqalarga o'tish
            </Link>
          </div>
          <div className="w-full">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div data-aos="flip-left" className="w-full md:w-1/3 h-72 rounded-lg flex flex-col justify-center items-center gap-3"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,1) 17%, rgba(0,183,2,1) 100%)' }}>
                <img src={trophyImg} className="w-1/4 md:h-1/3" alt="Musobaqa kubogi" />
                <span className="text-lg font-semibold text-green-800 text-center">
                  {competition?.title || 'Musobaqa nomi mavjud emas'}
                </span>

                <Link
                  to={`/competition/${competition.id}`}
                  className="px-4 py-2 bg-green-600 text-white rounded-full border-2 border-green-600 text-sm md:text-lg transition-all hover:bg-white hover:text-green-600"
                >
                  Qatnashish
                </Link>
              </div>
              <div data-aos="fade-up" className="w-full md:w-2/3 hidden md:block p-5 rounded-lg bg-white shadow-lg">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold text-gray-700">Batafsil</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Boshlanish vaqti</td>
                      <td className="py-2 text-gray-600">
                        <td className="py-2 text-gray-600">
                          {competition.starts_at
                            ? new Date(competition.starts_at).toLocaleString('ru-RU', {
                              weekday: 'long', // "Juma"
                              year: 'numeric', // "2025"
                              month: 'long', // "Yanvar"
                              day: 'numeric', // "10"
                              hour: '2-digit', // "10"
                              minute: '2-digit', // "00"
                              second: '2-digit', // "00"
                            })
                            : 'Noma'}
                        </td>

                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Qatnashuvchilar soni</td>
                      <td className="py-2 text-gray-600">{competition.participants ? competition.participants.length : null}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Davomiyligi</td>
                      <td className="py-2 text-gray-600">
                        {competition.starts_at && competition.ends_at
                          ? `${Math.floor((new Date(competition.ends_at) - new Date(competition.starts_at)) / (1000 * 60 * 60))} soat`
                          : 'Noma'}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Savollar soni</td>
                      <td className="py-2 text-gray-600">{competition.tests_count}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Progress Section */}
      <section data-aos="fade-right" className="progress h-auto mt-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            O'z ustingizda ishlashni davom ettiring
          </h3>
          <Link to="/tests" className="text-sm text-blue-400">
            Testlarga o'tish
          </Link>
        </div>
        {/* <ul className="flex flex-col gap-3 mt-7 overflow-x-hidden">
          {[1, 2, 3].map((_, index) => (
            <li key={index} data-aos="fade-left" className="w-full flex flex-col md:flex-row items-center justify-between px-5 py-3 border-2 border-green-600 rounded-xl">
              <div className="w-full md:w-1/5 flex items-center gap-3">
                <i className="fas fa-question fa-2x text-green-600"></i>
                <span className="text-lg">Buxoro tarixi testlar</span>
              </div>
              <Link to={`/tests/${index}`} className="px-4 py-2 bg-green-600 text-white rounded-full transition-all hover:bg-white hover:text-green-600">
                Ishlash
              </Link>
            </li>
          ))}
        </ul> */}
        <span className="text-center flex items-center text-gray-600 justify-center gap-3">
          <i className="fas fa-clock"></i>
          Testlar tez orada qo'shiladi.
        </span>
      </section>
    </div>
  );
}
