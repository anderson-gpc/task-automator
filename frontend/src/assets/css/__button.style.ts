import { createStyles } from "antd-style";

const useStyleButton = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #6253e1, #000);
      border: none;
      color: #fff;
      transition: all 0.3s ease-in-out;

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

  logout: css`
    &.${prefixCls}-btn-primary {
      position: relative;
      overflow: hidden;
      background: #ff4d4f;
      border: none;
      color: #fff;
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: all 0.3s ease-in-out;
      box-shadow: 0 4px 15px rgba(255, 77, 79, 0.3);

      > span {
        position: relative;
        z-index: 1;
        font-size: 1rem;
      }

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.15);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        z-index: 0;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 1;
      }

      &:hover {
        background: #ff2d2f;
        box-shadow: 0 6px 20px rgba(255, 45, 47, 0.45);
      }

      &:active {
        background: #d9282a;
        transform: scale(0.98);
      }
    }
  `,
}));

export default useStyleButton;
