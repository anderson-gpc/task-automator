"use client";

import { Session } from "@auth/core/types";
import { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { HomeContext } from "@/src/context";
import {
  removeRefinedAcessToken,
  addRefinedAcessToken,
} from "@/src/actions/database/token-action";
import useNotification from "./useNotification";

export function useModalAction(session: Session) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
  const { update } = useSession();

  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const githubId = session?.user.githubProfile.id;
  const login = session?.user.githubProfile.login;
  const { setToken } = useContext(HomeContext)!;
  const { openNotification, contextHolder } = useNotification();

  const deleteToken = async () => {
    const response = await removeRefinedAcessToken(githubId);
    if (response) {
      setDisabled(true);
      setToken(false);
      openNotification(
        "Token deletado!",
        "Seu token foi excluído com sucesso!"
      );
      await update();
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
      await update();
      return true;
    }
    openNotification("Token inválido", "Seu token é inválido!");
    return false;
  };

  return {
    isModalOpen,
    contextHolder,
    disabled,
    showModal,
    closeModal,
    deleteToken,
    onFinish,
  };
}
