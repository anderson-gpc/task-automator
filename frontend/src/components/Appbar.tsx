"use client";

import { Avatar, Tooltip } from "antd";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import useStyleAppbar from "../assets/css/__appbar.style";
import ButtonsRowComponent from "./ButtonsRow";

export function AppbarComponent() {
  const { styles } = useStyleAppbar();
  const { data: session, status } = useSession();

  const user = session?.user;

  if (status === "loading") {
    return (
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={styles.appbar}
      >
        <div className="appbar-content">
          <p>Carregando...</p>
        </div>
      </motion.div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={styles.appbar}
      >
        <div className="appbar-content">
          <p>Usuário não autenticado</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={styles.appbar}
    >
      <div className="appbar-content">
        <div className="user-info">
          <Tooltip title="Ver perfil" mouseEnterDelay={0.2}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Avatar
                src={user.image ?? undefined}
                style={{
                  background: user.image
                    ? undefined
                    : "linear-gradient(135deg, #ff9a9e, #fad0c4)",
                  color: user.image ? undefined : "#2f2890",
                  width: "3rem",
                  height: "3rem",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  border: "2px solid rgba(255,255,255,0.5)",
                  cursor: "pointer",
                }}
              >
                {!user.image && user.name?.[0]?.toUpperCase()}
              </Avatar>
            </motion.div>
          </Tooltip>
          <p>{user.name}</p>
        </div>

        <ButtonsRowComponent user={user} />
      </div>
    </motion.div>
  );
}
