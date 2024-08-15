import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Redirection from './pages/Redirection/Redirection';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/oauth2/callback/kakao" element={<Redirection />} />
    </Routes>
  );
}
