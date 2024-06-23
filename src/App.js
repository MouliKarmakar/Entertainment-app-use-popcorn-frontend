import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
export default function App() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
  }, []);

  const handleSetUserEmail = (email) => {
    setUserEmail(email);
    localStorage.setItem("userEmail", email);
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              setUserEmail={handleSetUserEmail}
              userEmail={userEmail}
            />
          }
        />
        <Route path="/homepage" element={<HomePage userEmail={userEmail} />} />
      </Routes>
    </Router>
  );
}
