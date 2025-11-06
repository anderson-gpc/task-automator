"use client";

import { Flex } from "antd";
import DividerComponent from "@/src/components/Divider";
import ButtonComponent from "@/src/components/Button";
import { loginStyles } from "@/src/assets/css/__login.styles";
import auth from "@/src/app/actions/auth";

export default function LoginPage() {
  async function handleClick() {
    const result = await auth();
    if (result) console.log("ok");
    else console.log("too bad");
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
