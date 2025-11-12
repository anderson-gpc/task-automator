"use client";

import { Drawer } from "antd";
import { useState } from "react";
import ButtonComponent, { ButtonStyleType } from "./Button";
import useStyleDrawer from "@/assets/css/__drawer.style";
import {
  LoginOutlined,
  ExportOutlined,
  GithubOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { signOut } from "next-auth/react";

export default function DrawerComponent() {
  const [open, setOpen] = useState(false);
  const { styles } = useStyleDrawer();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonComponent
        icon=<GithubOutlined />
        stylesButton={ButtonStyleType.Primary}
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
        <ButtonComponent
          icon=<ExportOutlined />
          text="Ir para perfil do Github"
          stylesButton={ButtonStyleType.Primary}
          onClick={() => {}}
        />
        <ButtonComponent
          icon=<UserOutlined />
          text="Visualizar amigos"
          stylesButton={ButtonStyleType.Primary}
          onClick={() => {}}
        />
        <ButtonComponent
          icon=<LoginOutlined />
          stylesButton={ButtonStyleType.Logout}
          onClick={() => signOut()}
          text="Logout"
        />
      </Drawer>
    </>
  );
}
