"use client";

import { Flex } from "antd";
import DividerComponent from "@/components/Divider";
import ButtonComponent, { ButtonStyleType } from "@/components/Button";
import useLoginStyles from "@/src/assets/css/__login.styles";
import login from "@/src/app/actions/login";
import { GithubOutlined } from "@ant-design/icons";

export default function LoginPage() {
  async function handleClick() {
    const url = await login();
    window.location.href = url;
  }
  const { containerStyle, overlayStyle, boxStyle } = useLoginStyles();

  return (
    <div style={containerStyle}>
      <div style={overlayStyle} />

      <Flex vertical align="center" justify="center" style={boxStyle}>
        <DividerComponent text="Login" />
        <ButtonComponent
          stylesButton={ButtonStyleType.Gradient}
          icon={<GithubOutlined />}
          onClick={handleClick}
          text="Login com o Github"
        />
      </Flex>
    </div>
  );
}
