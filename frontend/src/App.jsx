import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorCases from "./pages/doctor/DoctorCases";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminCases from "./pages/admin/AdminCases";
import UserDashboard from "./pages/user/UserDashboard";
import UserAppointments from "./pages/user/UserAppointments";
import CreateAppointment from "./pages/user/CreateAppointment";

import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/doctor"
            element={
              <ProtectedRoute roles={["DOCTOR"]}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DoctorAppointments />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="cases" element={<DoctorCases />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminAppointments />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="cases" element={<AdminCases />} />
          </Route>

          <Route
            path="/user"
            element={
              <ProtectedRoute roles={["USER"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserAppointments />} />
            <Route path="appointments" element={<UserAppointments />} />
            <Route path="create" element={<CreateAppointment />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;