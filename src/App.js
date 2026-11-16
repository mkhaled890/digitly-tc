import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import AiAdvisor from './pages/AiAdvisor';
import Contact from './pages/Contact';

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/about' Component={About}/>
          <Route path='/services' Component={Services}/>
          <Route path='/ai-advisor' Component={AiAdvisor}/>
          <Route path='/contact' Component={Contact}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;