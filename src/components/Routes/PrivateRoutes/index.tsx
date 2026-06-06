import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../../pages/Home';

const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Home />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default PrivateRoutes;
