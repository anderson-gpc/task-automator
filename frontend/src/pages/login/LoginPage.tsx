"use client";

import { Flex, Form } from "antd";
import DividerComponent from "@/components/Divider";
import ButtonComponent, { ButtonStyleType } from "@/components/Button";
import useLoginStyles from "@/src/assets/css/__login.styles";
import { GithubOutlined } from "@ant-design/icons";
import githubLogin from "@/src/app/_actions/(github)/login-action";

export default function LoginPage() {
  const { containerStyle, overlayStyle, boxStyle } = useLoginStyles();

  return (
    <div style={containerStyle}>
      <div style={overlayStyle} />

      <Flex vertical align="center" justify="center" style={boxStyle}>
        <DividerComponent text="Login" />
        <Form onFinish={githubLogin}>
          <Form.Item>
            <ButtonComponent
              htmlType="submit"
              stylesButton={ButtonStyleType.Gradient}
              icon={<GithubOutlined />}
              onClick={() => {}}
              text="Login com o Github"
            />
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
}
