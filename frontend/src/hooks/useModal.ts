"use client";

import { Session } from "@auth/core/types";
import { use, useContext, useState } from "react";
import { HomeContext } from "@/src/context";
import {
  removeRefinedAcessToken,
  addRefinedAcessToken,
} from "@/actions/mysql/token-action";
import { FormProps } from "antd";

export function useModalAction(session: Session) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const githubId = session?.user.githubProfile.id;
  const {setToken} = useContext(HomeContext)!;

  const deleteToken = async () => {
    const response = await removeRefinedAcessToken(githubId);
    if (response) setToken(false);
  };

  const onFinish: FormProps["onFinish"] = async (values) => {
    const response = await addRefinedAcessToken(githubId, values.token);
    if (response) {
      setToken(true);
      closeModal();
    }
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (values) => {
    console.log(values);
  };

  return {
    isModalOpen,
    showModal,
    closeModal,
    deleteToken,
    onFinish,
    onFinishFailed,
  };
}
