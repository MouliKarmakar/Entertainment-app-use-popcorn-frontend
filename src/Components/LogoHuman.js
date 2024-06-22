import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function User() {
  const navigate = useNavigate();
  const handleGoToLoginPage = () => {
    navigate("/");
  };
  return (
    <Tooltip title={<Link to="/">LogOut</Link>} trigger="hover">
      <Button
        type="dashed"
        icon={<UserOutlined />}
        onClick={handleGoToLoginPage}
      />
    </Tooltip>
  );
}
