"use client";

import { ConfigProvider, Space, Button } from "antd";
import useStyleButton from "../assets/css/__button.style";

export enum ButtonStyleType {
  Gradient = "gradient",
  Logout = "logout",
}

interface ButtonComponentProps {
  text: string;
  onClick: () => void;
  stylesButton: ButtonStyleType;
  icon: React.ReactNode;
}

export default function ButtonComponent({
  text,
  onClick,
  stylesButton,
  icon,
}: ButtonComponentProps) {
  const { styles } = useStyleButton();

  const styleMap = {
    [ButtonStyleType.Gradient]: styles.linearGradientButton,
    [ButtonStyleType.Logout]: styles.logout,
  };
  const styleApply = styleMap[stylesButton];

  return (
    <ConfigProvider button={{ className: styleApply }}>
      <Space>
        <Button onClick={onClick} type="primary" size="large" icon={icon}>
          {text}
        </Button>
      </Space>
    </ConfigProvider>
  );
}
