import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
export default function App() {
  const [userEmail, setUserEmail] = useState("");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUserEmail={setUserEmail} />} />
        <Route path="/homepage" element={<HomePage userEmail={userEmail} />} />
      </Routes>
    </Router>
  );
}
