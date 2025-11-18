import { notification } from "antd";

export default function useNotification() {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string, description: string) => {
    const msg = message.toLowerCase();

    let background = "#faad14"; 
    let color = "#000";         

    if (msg.includes("deletado")) {
      background = "#ff4d4f";   
      color = "#fff";           
    } else if (msg.includes("adicionado")) {
      background = "#52c41a";   
      color = "#fff";           
    }

    api.open({
      message,
      description,
      duration: 3,
      style: {
        background,
        color,
        fontWeight: "bold",
      },
    });
  };

  return { openNotification, contextHolder };
}
