"use client"

import { InfoCircleFilled } from "@ant-design/icons";
import { Slab } from "react-loading-indicators";
import ModalComponent from "@/components/Modal";
import { InfoContent } from "@/src/constants/texts";

export default function DefaultPage() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <Slab
        size="large"
        color="rgba(47, 40, 144, 0.85)"
        text="Insira e salve seu token de acesso pessoal do GitHub para habilitar as funcionalidades."
      />
      <ModalComponent footer={true} icon={<InfoCircleFilled />} text="Informações" title="Token de acesso refinado" content={[
        InfoContent
      ]} />
    </div>
  );
}
