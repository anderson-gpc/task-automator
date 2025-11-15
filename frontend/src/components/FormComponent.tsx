import { Form, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormProps } from "antd";
import { addRefinedAcessToken } from "../app/_actions/(mysql)/token-action";

export default function FormComponent({githubId}: {githubId: number}) {
  const onFinish: FormProps["onFinish"] = async (values) => {
    const response = await addRefinedAcessToken(githubId, values.token);
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
