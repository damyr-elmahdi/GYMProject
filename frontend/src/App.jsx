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
import AdminExerciseList from "./Components/Exercises/AdminExerciseList";
import ExerciseForm from "./Components/Exercises/ExerciseForm";
import ClientExerciseList from "./Components/Exercises/ClientExerciseList";
import ExerciseDetail from "./Components/Exercises/ExerciseDetail";
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

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/exercises"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminExerciseList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/exercises/create"
          element={
            <ProtectedRoute requiredRole="admin">
              <ExerciseForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/exercises/edit/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <ExerciseForm />
            </ProtectedRoute>
          }
        />

        {/* Client Routes */}
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute requiredRole="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/exercises"
          element={
            <ProtectedRoute requiredRole="client">
              <ClientExerciseList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/exercises/:id"
          element={
            <ProtectedRoute requiredRole="client">
              <ExerciseDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppProvider>
  );
}