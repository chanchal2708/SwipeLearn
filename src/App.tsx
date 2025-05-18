import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import StatsPage from './pages/StatsPage';
import ItemDetailPage from './pages/ItemDetailPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="item/:id" element={<ItemDetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;