"use client";

import { Form, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useModalAction } from "@/src/hooks/useModal";

export default function FormComponent() {
  const { data: session } = useSession();

  if (!session) return;

  const { onFinish, onFinishFailed, closeModal, contextHolder } = useModalAction(session);

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
      {contextHolder}
      <Form.Item
        label="Token"
        name="token"
        rules={[
          {
            required: true,
            message: "Insira o token!",
          },
        ]}
      >
        <Input placeholder="Insira o token" />
      </Form.Item>
      <Form.Item>
        <Button onClick={closeModal} htmlType="submit" type="primary" icon={<PlusOutlined />} block>
          Adicionar
        </Button>
      </Form.Item>
    </Form>
  );
}
