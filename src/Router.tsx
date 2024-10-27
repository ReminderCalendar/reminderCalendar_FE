import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Redirection from './pages/Redirection/Redirection';
import Diary from './pages/Diary/Diary';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/oauth2/callback/kakao" element={<Redirection />} />
      <Route path="/login/oauth2/callback/google" element={<Redirection />} />
      <Route path="/diary" element={<Diary />} />
    </Routes>
  );
}
