import { Form, Button, Input } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { FormProps } from "antd";



export default function FormComponent() {
      const onFinish: FormProps["onFinish"] = (values) => {
    console.log(values);
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (values) => {
    console.log(values);
  }
    return <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
}