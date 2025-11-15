import { Button, Card, Modal, Space } from "antd";
import ButtonComponent from "./Button";
import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import { ButtonStyleType } from "./Button";
import { useState } from "react";
import FormComponent from "./FormComponent";
import { removeRefinedAcessToken } from "../app/_actions/(mysql)/token-action";

export default function ModalActionComponent({
  githubId,
}: {
  githubId: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const deleteToken = async () => {
    await removeRefinedAcessToken(githubId);
  };

  return (
    <>
      <ButtonComponent
        icon={<SettingOutlined />}
        text="Configurar token"
        stylesButton={ButtonStyleType.Primary}
        onClick={showModal}
      />

      <Modal
        title="Configurar token"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key="ok" type="primary" onClick={closeModal}>
            Ok
          </Button>,
        ]}
        styles={{
          body: { padding: "20px 24px", background: "#fafafa" },
          header: { borderBottom: "1px solid #eee" },
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Card
            title="Adicionar token"
            size="small"
            styles={{
              body: { display: "flex", flexDirection: "column", gap: "12px" },
            }}
          >
            <FormComponent githubId={githubId} />
          </Card>

          <Card
            title="Remover token"
            size="small"
            styles={{
              body: { display: "flex", justifyContent: "space-between" },
            }}
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              style={{ width: "150px" }}
              onClick={deleteToken}
            >
              Excluir token
            </Button>
          </Card>
        </Space>
      </Modal>
    </>
  );
}
