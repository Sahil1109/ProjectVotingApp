import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../Login';
import { EmailAlert } from '../../AuthenticationContext';

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/not-b8" element={<EmailAlert />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default PublicRoutes;
