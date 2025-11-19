"use client";

import { Form, Button, Input } from "antd";
import { PlusOutlined, StopOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { ReactElement, useState } from "react";

interface FormComponentProps {
  onFinish: (values: any) => Promise<boolean>;
  contextHolder: ReactElement<any>;
}

export default function FormComponent({
  onFinish,
  contextHolder,
}: FormComponentProps) {
  const { data: session } = useSession();
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState<boolean>(false);

  if (!session) return;

  const finish = async (values: any) => {
    setDisabled(true);
    const ok = await onFinish(values);
    if (!ok) return;
    form.resetFields();
    setDisabled(false);
  };

  return (
    <Form form={form} onFinish={finish}>
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
        <Input placeholder="Insira o token" name="input-token" />
      </Form.Item>
      <Form.Item>
        <Button disabled={disabled} htmlType="submit" type="primary" icon={disabled ? <StopOutlined /> : <PlusOutlined />} block>
          Adicionar
        </Button>
      </Form.Item>
    </Form>
  );
}

