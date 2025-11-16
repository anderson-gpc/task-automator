"use client"


import { motion } from "framer-motion";
import ButtonComponent, { ButtonStyleType } from "./Button";
import {
  GithubOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { signOut } from "next-auth/react";
import ModalActionComponent from "./ModalAction";
import { useSession } from "next-auth/react";


export default function ButtonsRowComponent() {
  const { data: session } = useSession();
  const user = session?.user!;

  return (
    <motion.div
      style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {user ? (
        <ButtonComponent
          icon={<GithubOutlined />}
          text="Perfil"
          stylesButton={ButtonStyleType.Primary}
          onClick={() => window.open(user.githubProfile.html_url, "_blank")}
        />
      ) : null}
  
      <ModalActionComponent />

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <ButtonComponent
          icon={<LogoutOutlined />}
          text="Logout"
          stylesButton={ButtonStyleType.Logout}
          onClick={() => signOut({ callbackUrl: "/login" })}
        />
      </motion.div>
    </motion.div>
  );
}
