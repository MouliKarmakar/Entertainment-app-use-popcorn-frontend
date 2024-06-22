import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Input, Form } from "antd";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const [LoginForm] = Form.useForm();
  const handleGoToHomePage = () => {
    navigate("/homepage");
  };
  const onSignUp = () => {
    setIsSignUp(true);
  };
  return (
    <Form name="LoginForm">
      <div className="login_page">
        <img
          src="https://e1.pxfuel.com/desktop-wallpaper/975/55/desktop-wallpaper-login-page-login.jpg"
          alt="bg_image"
          className="img"
        />
        <Flex
          vertical={true}
          gap={20}
          justify="center"
          align="center"
          className="ligin_box"
        >
          <Flex vertical={true} style={{ width: "100%" }}>
            <p>Email</p>
            <Form.Item name="email">
              <Input placeholder="Enter your email" />
            </Form.Item>
          </Flex>
          <Flex vertical={true} style={{ width: "100%" }}>
            <p>Passward</p>
            <Form.Item name="passward">
              <Input placeholder="Enter your Passward" />
            </Form.Item>
          </Flex>
          <Button style={{ width: "100%" }} onClick={handleGoToHomePage}>
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
          {!isSignUp && (
            <Flex
              vertical={false}
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
    </Form>
  );
}
