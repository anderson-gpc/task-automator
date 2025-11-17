"use client";

import { Flex, Form } from "antd";
import DividerComponent from "@/components/Divider";
import ButtonComponent, { ButtonStyleType } from "@/components/Button";
import useLoginStyles from "@/assets/css/__login.styles";
import { GithubOutlined } from "@ant-design/icons";
import githubLogin from "@/actions/github/login-action";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { containerStyle, overlayStyle, boxStyle } = useLoginStyles();

  return (
    <div style={containerStyle}>
      <div style={overlayStyle} />
      <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
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
      </motion.div>
    </div>
  );
}
