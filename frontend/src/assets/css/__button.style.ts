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
      width: 100%;
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

  primary: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      background: #2f2890;
      border: none;
      color: #ffffff;
      font-weight: 600;
      letter-spacing: 0.4px;
      border-radius: 10px;
      width: 100%;
      padding: 0.75rem 1rem;
      transition: all 0.25s ease;
      box-shadow: 0 4px 10px rgba(47, 40, 144, 0.3);

      > span {
        position: relative;
        z-index: 1;
        font-size: 1rem;
      }

      &:hover {
        background: #3b33b0;
        box-shadow: 0 6px 18px rgba(98, 83, 225, 0.4),
          0 0 10px rgba(98, 83, 225, 0.6) inset;
        transform: translateY(-1px);
      }

      &:focus-visible {
        outline: 2px solid rgba(98, 83, 225, 0.7);
        outline-offset: 3px;
      }

      &:active {
        background: #261f6e;
        transform: scale(0.98);
        box-shadow: 0 2px 8px rgba(47, 40, 144, 0.25) inset;
      }
    }
  `,

  logout: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #ff4d4f, #b32022);
      border: none;
      color: #fff;
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: all 0.25s ease-in-out;
      box-shadow: 0 4px 15px rgba(255, 77, 79, 0.35);
      width: 100%;
      border-radius: 10px;

      > span {
        position: relative;
        z-index: 1;
        font-size: 1rem;
      }

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(255, 255, 255, 0.1);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        z-index: 0;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 1;
      }

      &:hover {
        background: linear-gradient(135deg, #ff2d2f, #8b1b1d);
        box-shadow: 0 6px 20px rgba(255, 45, 47, 0.45);
        transform: translateY(-2px);
      }

      &:focus-visible {
        outline: 2px solid rgba(255, 77, 79, 0.6);
        outline-offset: 3px;
      }

      &:active {
        background: #d9282a;
        transform: scale(0.97);
        box-shadow: 0 3px 10px rgba(255, 77, 79, 0.35);
      }
    }

    &.${prefixCls}-button-default {
      &:hover {
        color: #fff;
      }
    }
  `,
}));

export default useStyleButton;
