import DrawerComponent from "@/components/Drawer";
import { ButtonStyleType } from "@/src/components/Button";
import InfoPanelComponent from "@/src/components/InfoPanel";
import { GithubOutlined } from "@ant-design/icons";

interface Seguidor {
  id: number;
  login: string;
  username: string;
  avatar_url: string;
  url: string;
}

const seguidores: Seguidor[] = [
  {
    id: 1,
    login: "anderson",
    username: "@anderson.dev",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    url: "https://github.com/anderson",
  },
];

export default function Dashboard() {
  return (
    <>
      <DrawerComponent />{" "}
      <InfoPanelComponent
        title="Seguidores"
        ariaLabel="Painel de seguidores"
        data={seguidores}
        buttons={[
          {
            text: "Ver perfil",
            stylesButton: ButtonStyleType.Gradient,
            icon: <GithubOutlined />,
          },
        ]}
      />{" "}
    </>
  );
}
