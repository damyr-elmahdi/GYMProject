import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginRegister from "./Components/Login & Sign Up/LoginRegister";
import Header from "./Components/Landing Page/Header";
import About from "./Components/Landing Page/About";
import Class from "./Components/Landing Page/Class";
import Trainer from "./Components/Landing Page/Trainer";
import Price from "./Components/Landing Page/Price";
import Client from "./Components/Landing Page/Client";
import Footer from "./Components/Landing Page/Footer";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import ClientDashboard from "./Components/Dashboard/ClientDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import AppProvider from "./Context/AppContext";
import "remixicon/fonts/remixicon.css";

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <About />
              <Class />
              <Trainer />
              <Price />
              <Client />
              <Footer />
            </>
          }
        />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute requiredRole="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppProvider>
  );
}
