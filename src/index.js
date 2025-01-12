import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./input.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Main from './Main';
import NewsShow from './Components/NewsShow';
import Competition from './Components/Competition';
import Results from './Components/Results';
import PracticeTest from './Components/PracticeTest';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth" element={<Login />} />
      <Route path="/:menu" element={<Main />} />
      <Route path="/news/:slug" element={<NewsShow />}/>
      <Route path='/competition/:id' element={<Competition />}/>
      <Route path='/competition/result/:id' element={<Results />}/>
      <Route path='/tests/:id' element={<PracticeTest />}/>

    </Routes>
  </BrowserRouter>
);