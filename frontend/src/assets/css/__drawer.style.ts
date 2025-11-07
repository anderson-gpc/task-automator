import { createStyles } from "antd-style";

const useStyleDrawer = createStyles(({ prefixCls, css }) => ({
  customDrawer: css`
    .${prefixCls}-drawer-content {
      background: linear-gradient(135deg, #0f0f0f, #1b1b1b);
      color: #fff;
    }

    .${prefixCls}-drawer-header {
      background: linear-gradient(135deg, #6253e1, #000);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      color: #fff;

      .${prefixCls}-drawer-title {
        font-weight: 600;
        font-size: 1.1rem;
        color: #fff;
      }

      .${prefixCls}-drawer-close {
        color: #fff;
        transition: color 0.3s ease;
        &:hover {
          color: #6253e1;
        }
      }
    }

    .${prefixCls}-drawer-body {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      p {
        margin: 0;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.3s ease, color 0.3s ease;

        &:hover {
          background: linear-gradient(135deg, #6253e1, #000);
          color: #fff;
        }
      }
    }
  `,
}));

export default useStyleDrawer;