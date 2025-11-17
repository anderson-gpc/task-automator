"use client";

import { Avatar, Button, Card, Flex, Typography } from "antd";
import { LinkOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { NetworkInterface } from "@/src/interface/network";

interface NetworkProps {
  data: NetworkInterface;
  onRemove?: (user: NetworkInterface) => void;
  onView?: (user: NetworkInterface) => void;
}

export default function NetworkComponent({ data, onRemove, onView }: NetworkProps) {
  return (
    <Card>
      <Flex vertical gap="0.75rem">
        <Flex align="center" gap="1rem">
          <Avatar src={data.avatar_url} />
          <Typography.Text strong>{data.login}</Typography.Text>
        </Flex>

        <Flex gap="0.5rem" justify="space-between">
          <Button
            icon={<UserDeleteOutlined />}
            danger
            type="primary"
            onClick={() => onRemove?.(data)}
          >
            Remover seguidor
          </Button>

          <Button
            icon={<LinkOutlined />}
            type="primary"
            onClick={() => onView?.(data)}
          >
            Visualizar perfil
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
