import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Redirection from './pages/Redirection/Redirection';
import Schedule from './pages/Schedule/Schedule';
import Diary from './pages/Diary/Diary';
import DiaryListPage from './pages/Diary/DiaryListPage';
import DiaryDetailPage from './pages/Diary/DiaryDetailPage';
import DiaryEditPage from './pages/Diary/DiaryEditPage';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/oauth2/callback/kakao" element={<Redirection />} />
      <Route path="/login/oauth2/callback/google" element={<Redirection />} />
      <Route path="/calendar" element={<Schedule />} />

      <Route path="/diary" element={<Diary />}>
        <Route index element={<DiaryListPage />} />
        <Route path="detail/:id" element={<DiaryDetailPage />} />
        <Route path="edit" element={<DiaryEditPage />} />
        <Route path="edit/:id" element={<DiaryEditPage />} />
      </Route>
    </Routes>
  );
}
