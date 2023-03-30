import logo from './logo.svg';
import './App.css';
import {Route, Routes } from 'react-router-dom';
import ListStudents from './components/List';
import Counter from './components/Counter';
import Toggle from './components/Toggle';
import ExempleObject from './components/Object';

function App() {
  return (
   <Routes>
      <Route path="/list" element={<ListStudents />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/toogle" element={<Toggle />} />
      <Route path="/object" element={<ExempleObject />} />
   </Routes>
  );
}

export default App;
