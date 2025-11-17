"use client"


import { Form, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormProps } from "antd";
import { addRefinedAcessToken } from "@/src/actions/mysql/token-action";
import { useSession } from "next-auth/react";
import { use } from "react";
import { HomeContext } from "@/src/context";

export default function FormComponent() {
  const { data: session } = useSession();
  const user = session?.user!;
  const githubId = user.githubProfile.id;

  const homeContext = use(HomeContext);

  const onFinish: FormProps["onFinish"] = async (values) => {
    const response = await addRefinedAcessToken(githubId, values.token);
    if (response) homeContext?.setToken(true);
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (values) => {
    console.log(values);
  };

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
        <Button
          htmlType="submit"
          type="primary"
          icon={<PlusOutlined />}
          style={{ width: "120px", alignSelf: "flex-end" }}
        >
          Adicionar
        </Button>
      </Form.Item>
    </Form>
  );
}
