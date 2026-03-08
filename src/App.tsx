import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import EncyclopediaPage from './pages/EncyclopediaPage';
import GuidePage from './pages/GuidePage';
import CalibrationPage from './pages/CalibrationPage';
import FieldGuidePage from './pages/FieldGuidePage';
import AdvisorPage from './pages/AdvisorPage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/encyclopedia" element={<EncyclopediaPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/calibration" element={<CalibrationPage />} />
          <Route path="/field-guide" element={<FieldGuidePage />} />
          <Route path="/advisor" element={<AdvisorPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
