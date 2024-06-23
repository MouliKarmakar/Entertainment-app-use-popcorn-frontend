import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Input } from "antd";
import axios from "axios";
import debounce from "lodash.debounce";

export default function LoginPage({ setUserEmail, userEmail }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleGoToHomePage = async (e) => {
    e.preventDefault();
    try {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      let response;
      if (isSignUp) {
        response = await axios.post(
          "https://entertainment-app-use-popcorn-backend.onrender.com/signup",
          {
            email,
            password,
          }
        );
      } else {
        response = await axios.post(
          "https://entertainment-app-use-popcorn-backend.onrender.com/",
          {
            email,
            password,
          }
        );
      }

      if (response.data.message === "User created successfully") {
        navigate(`/homepage?email=${userEmail}`);
        setUserEmail(userEmail);
      } else if (response.data === "Redirecting to the homepage") {
        navigate(`/homepage?email=${userEmail}`);
        setUserEmail(userEmail);
      } else {
        alert(isSignUp ? "Email already exists" : "Invalid Credentials");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };
  const onSignUp = () => {
    setIsSignUp(true);
  };
  const handleEmailInput = debounce((e) => setUserEmail(e.target.value), 500);
  return (
    <div className="login_page">
      <img
        src="https://e1.pxfuel.com/desktop-wallpaper/975/55/desktop-wallpaper-login-page-login.jpg"
        alt="bg_image"
        className="img"
      />
      <Flex
        vertical
        gap={20}
        justify="center"
        align="center"
        className="login_box"
        style={{ maxWidth: 400, margin: "0 auto" }}
      >
        <div style={{ width: "100%" }}>
          <p>Email</p>
          <Input
            id="email"
            placeholder="Enter your email"
            onChange={handleEmailInput}
          />
        </div>
        <div style={{ width: "100%" }}>
          <p>Password</p>
          <Input.Password
            id="password"
            placeholder="Enter your password"
            visibilityToggle={true}
          />
        </div>
        <Button
          type="dashed"
          style={{ width: "100%" }}
          onClick={handleGoToHomePage}
        >
          {isSignUp ? "Sign Up" : "Login"}
        </Button>
        {!isSignUp && (
          <Flex
            justify="space-between"
            align="center"
            style={{ width: "100%" }}
          >
            <p>Don't have an account?</p>
            <Button type="dashed" onClick={onSignUp}>
              Sign up
            </Button>
          </Flex>
        )}
      </Flex>
    </div>
  );
}
