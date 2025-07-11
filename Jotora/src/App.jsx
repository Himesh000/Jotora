import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice.js";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return !loading ? (
    <div className="App">
      <Header />
      <main className="container mx-auto p-4">
        {/* Your main content goes here */}
        <h1 className="text-2xl font-bold">Welcome to Jotora</h1>
      </main>
      <Footer />
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p>Loading...</p>
    </div>
  );
}

export default App;
