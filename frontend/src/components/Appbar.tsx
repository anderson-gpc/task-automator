"use client";

import { Avatar, Tooltip } from "antd";
import { createStyles } from "antd-style";
import { motion } from "framer-motion";
import ButtonComponent, { ButtonStyleType } from "./Button";
import { signOut } from "next-auth/react";
import {
  LoginOutlined,
  UserOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import useStyleAppbar from "../assets/css/__appbar.style";

interface AppbarComponentProps {
  name: string;
  url?: string;
  avatarUrl?: string;
  githubProfile?: string;
}


export function AppbarComponent({
  name,
  url,
  avatarUrl,
  githubProfile,
}: AppbarComponentProps) {
  const { styles } = useStyleAppbar();

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={styles.appbar}
    >
      <div className="appbar-content">
        {/* Usuário */}
        <div className="user-info">
          <Tooltip title="Ver perfil" mouseEnterDelay={0.2}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Avatar
                src={avatarUrl}
                style={{
                  background: avatarUrl
                    ? undefined
                    : "linear-gradient(135deg, #ff9a9e, #fad0c4)",
                  color: avatarUrl ? undefined : "#2f2890",
                  width: "3rem",
                  height: "3rem",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  border: "2px solid rgba(255,255,255,0.5)",
                  cursor: "pointer",
                }}
              >
                {!avatarUrl && name[0]?.toUpperCase()}
              </Avatar>
            </motion.div>
          </Tooltip>
          <p>{name}</p>
        </div>

        {/* Botões */}
        <motion.div
          style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {githubProfile && (
            <ButtonComponent
              icon={<GithubOutlined />}
              text="Perfil do GitHub"
              stylesButton={ButtonStyleType.Primary}
              onClick={() => window.open(githubProfile, "_blank")}
            />
          )}
          <ButtonComponent
            icon={<UserOutlined />}
            text="Amigos"
            stylesButton={ButtonStyleType.Primary}
            onClick={() => {}}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ButtonComponent
              icon={<LoginOutlined />}
              text="Logout"
              stylesButton={ButtonStyleType.Logout}
              onClick={() => signOut({ callbackUrl: "/login" })}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
