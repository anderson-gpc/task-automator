"use client";

import { Session } from "@auth/core/types";
import { useContext, useState } from "react";
import { HomeContext } from "@/src/context";
import {
  removeRefinedAcessToken,
  addRefinedAcessToken,
} from "@/actions/mysql/token-action";
import useNotification from "./useNotification";

export function useModalAction(session: Session) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const githubId = session?.user.githubProfile.id;
  const login = session?.user.githubProfile.login;
  const { setToken } = useContext(HomeContext)!;
  const { openNotification, contextHolder } = useNotification();

  const deleteToken = async () => {
    const response = await removeRefinedAcessToken(githubId);
    if (response) {
      setToken(false);
      openNotification(
        "Token deletado!",
        "Seu token foi excluído com sucesso!"
      );
    }
  };
  
  const onFinish = async (values: any): Promise<boolean> => {
    const response = await addRefinedAcessToken(githubId, login, values.token);
    if (response) {
      setToken(true);
      openNotification(
        "Token adicionado!",
        "Seu token foi adicionado com sucesso!"
      );
      closeModal();
      return true;
    }
    openNotification("Token inválido", "Seu token é inválido!");
    return false;
  };

  return {
    isModalOpen,
    showModal,
    closeModal,
    deleteToken,
    onFinish,
    contextHolder,
  };
}
