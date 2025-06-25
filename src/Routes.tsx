// Routes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Dashboard/crypto" replace />} />
      <Route path="/Dashboard/:widgetId" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
