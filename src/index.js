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
import AdminMain from './Admin/adminMain';
import AddArticle from './Admin/addArticle';
import EditArticle from './Admin/editArticle';
import AddCompetition from './Admin/addCompetition';


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
      <Route path='/practice' element={<PracticeTest />}/>
      <Route path='/admin' element={<AdminMain />}/>
      <Route path='/article' element={<AddArticle />}/>
      <Route path='/news/edit/:id' element={<EditArticle/>} />
      <Route path='/competition/add' element={<AddCompetition />}/>
    </Routes>
  </BrowserRouter>
);