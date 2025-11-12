"use client";

import { Flex } from "antd";
import DividerComponent from "@/components/Divider";
import ButtonComponent, { ButtonStyleType } from "@/components/Button";
import useLoginStyles from "@/src/assets/css/__login.styles";
import { GithubOutlined } from "@ant-design/icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { containerStyle, overlayStyle, boxStyle } = useLoginStyles();
  const router = useRouter();
  const { data: _, status } = useSession();

  async function handleClick(): Promise<void> {
    await signIn("github");
  }

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div style={containerStyle}>
      <div style={overlayStyle} />

      <Flex vertical align="center" justify="center" style={boxStyle}>
        <DividerComponent text="Login" />
        <ButtonComponent
          stylesButton={ButtonStyleType.Gradient}
          icon={<GithubOutlined />}
          onClick={handleClick}
          text="Login com o Github"
        />
      </Flex>
    </div>
  );
}
