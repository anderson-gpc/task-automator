"use client";

import { ConfigProvider, Divider } from "antd";
import { createStyles } from "antd-style";

const userStyles = createStyles(({ prefixCls, css }) => ({
  dividerStyle: css`
    &.${prefixCls}-divider {
        > span {
            color: #fff;
            font-weight: bold; 
            font-size: 1.5rem;
        }
    }
  `,
}));

export default function DividerComponent({ text }: { text: string }) {
  const { styles } = userStyles();
  return (
    <ConfigProvider divider={{ className: styles.dividerStyle }}>
      <Divider style={{ borderColor: "#fff" }} orientation="right">
        {text}
      </Divider>
    </ConfigProvider>
  );
}
