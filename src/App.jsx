import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';

function App() {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
    window.localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`overflow-x-hidden min-h-screen font-sans ${mode === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-900 text-gray-50'} transition-all duration-700`}>
      <header className="py-6 shadow-lg">
        <nav className="container mx-auto flex justify-between items-center px-4 md:px-8">
          <Link to='/' className="text-3xl sm:text-4xl font-bold tracking-tight">History.uz</Link>
          <ul className="hidden md:flex space-x-4 sm:space-x-6 text-lg">
            <li><a href="#hero" className="hover:text-blue-500 transition">Bosh sahifa</a></li>
            <li><a href="#features" className="hover:text-blue-500 transition">Xususiyatlar</a></li>
            <li><a href="#gallery" className="hover:text-blue-500 transition">Galereya</a></li>
            <li><a href="#contact" className="hover:text-blue-500 transition">Bogʻlanish</a></li>
          </ul>
          <button onClick={toggleMode} className="border-2 px-4 py-2 rounded-lg">
            {mode === 'light' ? 'Kechki rejim' : 'Kunduzgi rejim'}
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section id="hero" className="text-center space-y-6" data-aos="zoom-in">
          <h1 className="text-4xl sm:text-6xl font-extrabold">Biz bilan tarixni o'rganing</h1>
          <p className="text-lg sm:text-xl">Tarixiy bilimlaringizni kengaytiring va qiziqarli maʼlumotlarga shoʻngʻing.</p>
          <button  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg"><Link to='/auth'>Boshlash</Link></button>
        </section>

        <section id="features" className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" data-aos="fade-up">
          <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Tarixiy Maʼlumotlar</h2>
            <p>Oʻzbekistonning boy tarixi va madaniyatiga oid bilimlar.</p>
          </div>
          <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Interaktiv Tarixiy Sayohat</h2>
            <p>Vizual maʼlumotlar orqali oʻtmishni kashf eting.</p>
          </div>
          <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Jahon Tarixi bilan Aloqalar</h2>
            <p>Buyuk Ipak Yoʻli va qadimiy savdo yoʻllari haqida koʻproq bilib oling.</p>
          </div>
        </section>

        <section id="gallery" className="mt-16" data-aos="fade-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-center">Foto Galereya</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1636308624679-625f2030d903?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Samarkand Registan" className="w-full h-full object-cover transform hover:scale-105 transition" />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img src="https://media.istockphoto.com/id/2162127363/photo/the-ark-of-bukhara.webp?a=1&b=1&s=612x612&w=0&k=20&c=FpTrh_3PYxYzDpDtoWVKTBpN4d2fjzrS0BuItFQbeKU=" alt="Bukhara Ark" className="w-full h-full object-cover transform hover:scale-105 transition" />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img src="https://media.istockphoto.com/id/1249922111/photo/aerial-panorama-khiva-islam-khodja-minaret-uzbekistan-sunset-twilight.webp?a=1&b=1&s=612x612&w=0&k=20&c=Xrsqnpdjv_LOyysdoIW_51IknY3X7d-TZZ5317IYNkc=" alt="Khiva Itchan Kala" className="w-full h-full object-cover transform hover:scale-105 transition" />
            </div>
          </div>
        </section>

        <section id="contact" className="mt-16" data-aos="fade-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-center">Biz bilan bogʻlaning</h2>
          <div className="mt-8 text-center">
            <p className="text-lg">Savollaringiz bormi? Biz bilan bogʻlaning!</p>
            <form className="mt-6 max-w-lg mx-auto">
              <div className="mb-4">
                <input type="text" placeholder="Ismingiz" className="w-full p-4 rounded border border-gray-300 dark:border-gray-700" />
              </div>
              <div className="mb-4">
                <input type="email" placeholder="Email" className="w-full p-4 rounded border border-gray-300 dark:border-gray-700" />
              </div>
              <div className="mb-4">
                <textarea placeholder="Xabaringiz" className="w-full p-4 rounded border border-gray-300 dark:border-gray-700" rows="4"></textarea>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">Yuborish</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={`py-8 ${mode === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`} data-aos="fade-up">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2025 History.uz. Barcha huquqlar himoyalangan.</p>
          <div className="mt-4 space-x-6">
            <a href="#" className="hover:underline">Maxfiylik siyosati</a>
            <a href="#" className="hover:underline">Foydalanish shartlari</a>
            <a href="#contact" className="hover:underline">Biz bilan bogʻlaning</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
