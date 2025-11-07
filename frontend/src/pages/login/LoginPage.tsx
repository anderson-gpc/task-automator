"use client";

import { Flex } from "antd";
import DividerComponent from "@/components/Divider";
import ButtonComponent from "@/components/Button";
import { loginStyles } from "@/assets/css/__login.styles";
import login from "@/src/app/actions/login";

export default function LoginPage() {
  async function handleClick() {
    const url = await login();
    window.location.href = url;
  }

  return (
    <div style={loginStyles.containerStyle}>
      <div style={loginStyles.overlayStyle} />

      <Flex
        vertical
        align="center"
        justify="center"
        style={loginStyles.boxStyle}
      >
        <DividerComponent text="Login" />
        <ButtonComponent onClick={handleClick} />
      </Flex>
    </div>
  );
}
