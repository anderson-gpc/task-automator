"use client";
import { GithubOutlined } from "@ant-design/icons";
import { ConfigProvider, Space, Button } from "antd";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #6253e1, #000);
      border: none;
      color: #fff;

      > span {
        position: relative;
        z-index: 1;
        font-size: 1rem;
      }

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, #000, #6253e1);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        z-index: 0;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 1;
      }
    }
  `,
}));

interface ButtonComponentProps {
  onClick: () => void;
}

export default function ButtonComponent({onClick}: ButtonComponentProps) {
  const { styles } = useStyle();
  return (
    <ConfigProvider button={{ className: styles.linearGradientButton }}>
      <Space>
        <Button onClick={onClick} type="primary" size="large" icon={<GithubOutlined />}>
          Login com Github
        </Button>
      </Space>
    </ConfigProvider>
  );
}
