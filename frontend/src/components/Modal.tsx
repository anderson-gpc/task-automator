"use client";

import { Button, Modal, Typography } from "antd";
import { useState } from "react";

interface ModalComponentProps {
  text: string;
  title: string;
  content: any[];
  icon?: React.ReactNode;
  footer?: boolean;
}

export default function ModalComponent({
  text,
  title,
  content,
  icon,
  footer = false,
}: ModalComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button icon={icon} type="text" onClick={showModal}>
        <Typography.Text strong>{text}</Typography.Text>
      </Button>
      <Modal
        title={title}
        closable={{ "aria-label": "Fechar modal" }}
        open={isModalOpen}
        onCancel={closeModal}
        footer={
          footer
            ? [
                <Button key="submit" type="primary" danger onClick={closeModal}>
                  Cancelar
                </Button>,
                <Button key="submit" type="primary">
                  Adicionar o meu token
                </Button>,
              ]
            : []
        }
      >
        {content.map((node) => node)}
      </Modal>
    </>
  );
}
