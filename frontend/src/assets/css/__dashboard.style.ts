import { createStyles } from "antd-style";

const useDashboardStyles = createStyles(({ prefixCls, css }) => ({
  dashboard: css`
    &.${prefixCls}-flex {
      width: 100%;
      height: 100%;
      padding: 1rem;
      gap: 1rem;
    }
  `,

  splitter: css`
    &.${prefixCls}-splitter {
      width: 100%;
      height: 85%;
      border-radius: 16px;
      backdrop-filter: blur(8px);
      background: rgba(255, 255, 255, 0.7);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);

      .${prefixCls}-splitter-bar {
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.1),
          rgba(0, 0, 0, 0.2)
        );
        border-radius: 8px;
        width: 6px !important;
        transition: background 0.2s ease;

        &:hover {
          background: linear-gradient(
            to bottom,
            rgba(24, 144, 255, 0.4),
            rgba(24, 144, 255, 0.6)
          );
        }
      }
    }
  `,

  panel: css`
    &.${prefixCls}-splitter-panel {
      padding: 1rem;
      overflow-y: auto;
      background: rgba(255, 255, 255, 0.85);
      border-radius: 12px;
      transition: all 0.25s ease;
      margin-bottom: 120px;

      &:hover {
        background: rgba(255, 255, 255, 0.95);
      }

      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.25);
        border-radius: 12px;
      }
    }
  `,
}));

export default useDashboardStyles;
