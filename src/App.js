// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeftMenu from './Components/LeftMenu/LeftMenu';
import './App.css';
import 'tailwindcss/tailwind.css';
import { CreateForm } from './pages/CreateForm';
import { PreviewForm } from './pages/PreviewForm';

const App = () => {
  return (
    
      <div className="app-container">
        <div className="left-side">
          <LeftMenu />
        </div>
        <div className="right-side">
          <Routes>
            <Route path="/create" element={<CreateForm></CreateForm>} />
            <Route path="/view" element={<PreviewForm />} />
          </Routes>
        </div>
      </div>
    
  );
};

export default App;
