"use client";

import { Drawer } from "antd";
import { useState } from "react";
import ButtonComponent, { ButtonStyleType } from "./Button";
import useStyleDrawer from "@/assets/css/__drawer.style";
import { LoginOutlined } from "@ant-design/icons";
import { GithubOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function DrawerComponent() {
  const [open, setOpen] = useState(false);
  const { styles } = useStyleDrawer();
  const router = useRouter();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  async function handleClick() {
    await fetch("/api/logout", {method: "POST"});
    router.push("/login");
  }

  return (
    <>
      <ButtonComponent
        icon=<GithubOutlined />
        stylesButton={ButtonStyleType.Gradient}
        text="Abrir menu"
        onClick={showDrawer}
      />
      <Drawer
        className={styles.customDrawer}
        placement="left"
        title="Menu"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
      >
        <p>Perfil</p>
        <p>Seguindo</p>
        <p>Seguidores</p>
        <p>Amigos</p>
        <p>Repositórios</p>
        <ButtonComponent
          icon=<LoginOutlined />
          stylesButton={ButtonStyleType.Logout}
          onClick={handleClick}
          text="Logout"
        />
      </Drawer>
    </>
  );
}
