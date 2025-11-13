import { Slab } from "react-loading-indicators";

export default function DefaultPage() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <Slab size="large" color="rgba(47, 40, 144, 0.85)" text="Insira e salve seu token de acesso pessoal do GitHub para habilitar as funcionalidades." />
    </div>
  );
}
