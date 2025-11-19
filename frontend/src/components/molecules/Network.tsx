"use client";

import { Avatar, Button, Card, Flex, Typography } from "antd";
import { LinkOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { NetworkInterface } from "@/interfaces/network-interface";
import { Colors } from "@/constants/colors";
import { useState } from "react";

interface NetworkProps {
  data: NetworkInterface;
  onRemove?: (user: NetworkInterface) => void;
  onView?: (user: NetworkInterface) => void;
}

export default function NetworkComponent({
  data,
  onRemove,
  onView,
}: NetworkProps) {
  const [isRemoved, setRemoved] = useState(false);

  const handleRemove = () => {
    if (isRemoved) return; // evita cliques repetidos
    onRemove?.(data);
    setRemoved(true);
  };

  const handleView = () => onView?.(data);

  return (
    <Card
      style={{
        margin: "1rem",
        background: isRemoved ? Colors.Gray015 : Colors.White,
        transition: "background 0.2s ease",
      }}
    >
      <Flex vertical gap="0.75rem">
        <Flex align="center" gap="1rem">
          <Avatar src={data.avatar_url} />
          <Typography.Text strong>{data.login}</Typography.Text>
        </Flex>

        <Flex gap="0.5rem" justify="space-between" wrap>
          <Button
            icon={<UserDeleteOutlined />}
            danger
            type="primary"
            onClick={handleRemove}
            disabled={isRemoved}
            style={{ flex: 1, minWidth: "12rem", maxWidth: "15rem" }}
          >
            {isRemoved ? "Removido" : "Remover"}
          </Button>

          <Button
            icon={<LinkOutlined />}
            type="primary"
            onClick={handleView}
            style={{ flex: 1, minWidth: "12rem", maxWidth: "15rem" }}
          >
            Visualizar perfil
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

