import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import ListStudents from './components/List';
import Counter from './components/Counter';
import Toggle from './components/Toggle';
import ExempleObject from './components/Object';
import UseEffectCompo from './components/UseEffect/UseEffect';
import CurriCulum from './components/CV/CV';
import Portfolio from './components/Portfolio';
import BlogArticle from './components/Article/Article';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import BlogForm from './components/Article/AddArticle';

function App() {
  const location = useLocation();
  return (

    <>
    {location.pathname !== '/login' && <Navbar />}
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/list" element={<ListStudents />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/toogle" element={<Toggle />} />
      <Route path="/object" element={<ExempleObject />} />
      <Route path="/useffect" element={<UseEffectCompo />} />
      <Route path="/cv" element={<CurriCulum />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/article/:id" element={<BlogArticle />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/addarticle" element={<BlogForm />} />
    </Routes>
    </>
  );
}

export default App;
