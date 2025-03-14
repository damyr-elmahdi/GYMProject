import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./Context/AppContext"; // Import your existing AppProvider

import LoginRegister from "./Components/Login & Sign Up/LoginRegister";
import Header from "./Components/Landing Page/Header";
import About from "./Components/Landing Page/About";
import Class from "./Components/Landing Page/Class";
import Trainer from "./Components/Landing Page/Trainer";
import Price from "./Components/Landing Page/Price";
import Client from "./Components/Landing Page/Client";
import Footer from "./Components/Landing Page/Footer";
import "remixicon/fonts/remixicon.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider> {/* Wrap everything with your existing AppProvider */}
      <Router>
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
        </Routes>
      </Router>
    </AppProvider>
  </React.StrictMode>
);


// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import AppProvider from './Context/AppContext.jsx'

// createRoot(document.getElementById('root')).render(
// <AppProvider>
//     <App />
// </AppProvider>
  
// )
