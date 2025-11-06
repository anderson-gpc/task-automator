"use client";
import ButtonComponent from "@/src/components/Button";
import DividerComponent from "@/src/components/Divider";
import { Flex } from "antd";
import { loginStyles } from "./login.styles";

export default function LoginPage() {
  return (
    <div style={loginStyles.containerStyle}>
      <div style={loginStyles.overlayStyle} />

      <Flex vertical align="center" justify="center" style={loginStyles.boxStyle}>
          <DividerComponent text="Login" />
          <ButtonComponent />
      </Flex>
    </div>
  );
}
