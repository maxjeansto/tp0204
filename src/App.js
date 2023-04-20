import './App.css';
import {Route, Routes } from 'react-router-dom';
import ListStudents from './components/List';
import Counter from './components/Counter';
import Toggle from './components/Toggle';
import ExempleObject from './components/Object';
import UseEffectCompo from './components/UseEffect/UseEffect';
import CurriCulum from './components/CV/CV';
import Portfolio from './components/Portfolio';

function App() {
  return (
   <Routes>
      <Route path="/list" element={<ListStudents />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/toogle" element={<Toggle />} />
      <Route path="/object" element={<ExempleObject />} />
      <Route path="/useffect" element={<UseEffectCompo />} />
      <Route path="/cv" element={<CurriCulum />} />
      <Route path="/portfolio" element={<Portfolio />} />
   </Routes>
  );
}

export default App;
