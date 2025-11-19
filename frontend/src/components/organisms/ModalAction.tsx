"use client";

import { Button, Card, Modal, Space } from "antd";
import ButtonComponent from "../atoms/Button";
import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import { ButtonStyleType } from "../atoms/Button";
import FormComponent from "../molecules/FormComponent";
import { useSession } from "next-auth/react";
import { useModalAction } from "../../hooks/useModal";

export default function ModalActionComponent() {
  const { data: session } = useSession();

  if (!session) return;

  const { isModalOpen, contextHolder, disabled, showModal, closeModal, deleteToken, onFinish } =
    useModalAction(session);

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
          <Button disabled={disabled} key="ok" type="primary" onClick={closeModal}>
            Ok
          </Button>,
        ]}
        styles={{
          body: { padding: "20px 24px", background: "#fafafa" },
          header: { borderBottom: "1px solid #eee" },
        }}
      >
        {contextHolder}
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Card
            title="Adicionar token"
            size="small"
            styles={{
              body: { display: "flex", flexDirection: "column", gap: "12px" },
            }}
          >
            <FormComponent onFinish={onFinish} contextHolder={contextHolder}/>
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
              onClick={() => {
                deleteToken();
                closeModal();
              }}
              block
            >
              Excluir token
            </Button>
          </Card>
        </Space>
      </Modal>
    </>
  );
}

