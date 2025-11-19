"use client";

import { Card, Flex } from "antd";

export function CenterMessage({ title, description }: { title: string; description: string }) {
  return (
    <Flex
      align="center"
      justify="center"
      style={{ width: "100%", height: "100vh" }}
    >
      <Card
        title={title}
        style={{ width: 350, textAlign: "center" }}
      >
        <p>{description}</p>
      </Card>
    </Flex>
  );
}

