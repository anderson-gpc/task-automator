import { motion } from "framer-motion";
import ButtonComponent, { ButtonStyleType } from "./Button";
import {
  GithubOutlined,
  LogoutOutlined,
  TeamOutlined,
  UsergroupDeleteOutlined
} from "@ant-design/icons";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { verifyRefinedAcessToken } from "../app/_actions/(mysql)/token-action";
import ModalActionComponent from "./ModalAction";

interface ButtonsRowComponentProps {
  user: any;
}

export default function ButtonsRowComponent({
  user,
}: ButtonsRowComponentProps) {
  const [token, setToken] = useState<boolean>(false);

  useEffect(() => {
    const getToken = async () => {
      const tokenInBd = await verifyRefinedAcessToken(user.githubProfile.id);
      if (tokenInBd) setToken(true);
    };
    getToken();
  }, [token]);

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
          text="Perfil do GitHub"
          stylesButton={ButtonStyleType.Primary}
          onClick={() => window.open(user.githubProfile.html_url, "_blank")}
        />
      ) : null}

      {token ? <ButtonComponent
        icon={<TeamOutlined />}
        text="Amigos"
        stylesButton={ButtonStyleType.Primary}
        onClick={() => {}}
      /> : null}

      {token ? <ButtonComponent
        icon={<UsergroupDeleteOutlined />}
        text="Não seguidores"
        stylesButton={ButtonStyleType.Primary}
        onClick={() => {}}
      /> : null}

      {
        token ? null : <ModalActionComponent/>
      }

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
