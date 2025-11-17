"use client";

import { Avatar, Button, Card, Flex, Typography } from "antd";
import { LinkOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { NetworkInterface } from "@/src/interfaces/network-interface";

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
  return (
    <Card style={{ margin: "1rem" }}>
      <Flex vertical gap="0.75rem">
        <Flex align="center" gap="1rem">
          <Avatar src={data.avatar_url} />
          <Typography.Text strong>{data.login}</Typography.Text>
        </Flex>

        <Flex gap="0.5rem" justify="space-between" wrap={true}>
          <Button
            icon={<UserDeleteOutlined />}
            danger
            type="primary"
            onClick={() => onRemove?.(data)}
            style={{ flex: 1, minWidth: "12rem", maxWidth: "15rem" }}
          >
            Remover seguidor
          </Button>

          <Button
            icon={<LinkOutlined />}
            type="primary"
            onClick={() => onView?.(data)}
            style={{ flex: 1, minWidth: "12rem", maxWidth: "15rem" }}
          >
            Visualizar perfil
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
