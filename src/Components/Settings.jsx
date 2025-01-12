import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Settings() {
  const [editPhone, setEditPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(' 99 228 21 08');
  const [editPassword, setEditPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  return (
    <div className="w-full min-h-screen pt-9 flex flex-col">
      <h2 data-aos="fade-right" className="lg:text-5xl sm:text-3xl text-2xl font-semibold">
        Sozlamalar ⚙️
      </h2>

      {/* User Information Section */}
      <div
        data-aos="fade-up"
        className="container w-full min-h-64 bg-slate-200 mt-10 rounded-lg p-5"
      >
        <form className="flex flex-col w-full">
          <div className="flex mb-5 justify-start gap-2 flex-col">
            <label htmlFor="fullname" className="text-lg">To'liq ismingiz</label>
            <input
              type="text"
              id="fullname"
              className="w-full lg:w-[30%] text-lg px-4 py-2 text-black outline-none border-2 border-gray-400 focus:border-green-600 rounded disabled:text-gray-500 bg-white"
              value="Otabek Burhonov"
              disabled
            />
          </div>

          <div className="flex mb-5 justify-start gap-2 flex-col">
            <label htmlFor="email" className="text-lg">Email manzil</label>
            <input
              type="text"
              id="email"
              className="w-full lg:w-[30%] text-lg px-4 py-2 text-black outline-none border-2 border-gray-400 focus:border-green-600 rounded disabled:text-gray-500 bg-white"
              value="burhonovotabek5@gmail.com"
              disabled
            />
          </div>

          {/* Phone Number Section */}
          <div className="flex mb-5 justify-start gap-2 flex-col">
            <label htmlFor="phone" className="text-lg">Telefon raqam</label>
            <div className="flex items-center w-full lg:w-[30%] border-2 border-gray-400 rounded overflow-hidden">
              <span className="px-4 bg-gray-200 text-black">+998</span>
              <input
                type="text"
                id="phone"
                className="text-lg px-4 py-2 text-black w-full outline-none focus:border-green-600 border-0"
                disabled={!editPhone}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {!editPhone ? (
              <button
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded transition hover:bg-green-700"
                onClick={() => setEditPhone(true)}
              >
                O'zgartirish
              </button>
            ) : (
              <div className="flex gap-2 mt-2">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded transition hover:bg-blue-700"
                  onClick={() => setEditPhone(false)}
                >
                  Saqlash
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded transition hover:bg-red-700"
                  onClick={() => setEditPhone(false)}
                >
                  Bekor qilish
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Password Change Section */}
      <div
        data-aos="fade-up"
        className="container w-full min-h-64 bg-slate-200 mt-10 rounded-lg p-5"
      >
        <h3 className="text-xl font-semibold mb-3">Parolni o'zgartirish</h3>
        <form className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Eski parol"
            name="oldPassword"
            value={passwords.oldPassword}
            onChange={handlePasswordChange}
            className="w-full lg:w-[30%] px-4 py-2 border-2 rounded outline-none focus:border-green-600"
          />
          <input
            type="password"
            placeholder="Yangi parol"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            className="w-full lg:w-[30%] px-4 py-2 border-2 rounded outline-none focus:border-green-600"
          />
          <input
            type="password"
            placeholder="Parolni qaytadan kiriting"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            className="w-full lg:w-[30%] px-4 py-2 border-2 rounded outline-none focus:border-green-600"
          />
          <Link to="#" className="text-blue-600 underline">
            Parolni unutdingizmi?
          </Link>
          <div className="flex gap-2">
            {!editPassword ? (
              <button
                className="px-4 py-2 bg-green-600 text-white rounded transition hover:bg-green-700"
                onClick={() => setEditPassword(true)}
              >
                O'zgartirish
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded transition hover:bg-blue-700"
                >
                  Saqlash
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 text-white rounded transition hover:bg-red-700"
                  onClick={() => setEditPassword(false)}
                >
                  Bekor qilish
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
