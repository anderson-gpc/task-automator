"use client";

import { Drawer } from "antd";
import { useState } from "react";
import ButtonComponent from "./Button";
import useStyleDrawer from "@/assets/css/__drawer.style";

export default function DrawerComponent() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const { styles } = useStyleDrawer();

  return (
    <>
      <ButtonComponent text="Abrir menu" onClick={showDrawer} />
      <Drawer
        className={styles.customDrawer  }
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
        <p>Logout</p>
      </Drawer>
    </>
  );
}
