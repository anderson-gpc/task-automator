import { createStyles } from "antd-style";
import { Colors } from "@/constants/colors";

const useStyleButton = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      position: relative;
      overflow: hidden;
      background: linear-gradient(
        135deg,
        ${Colors.DeepVioletSolid},
        ${Colors.Black07}
      );
      border: none;
      color: ${Colors.White};
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
        background: linear-gradient(
          135deg,
          ${Colors.Black07},
          ${Colors.DeepVioletSolid}
        );
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
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      background: ${Colors.DeepVioletSolid};
      border: none;
      color: ${Colors.White};
      font-weight: 600;
      letter-spacing: 0.4px;
      border-radius: 10px;
      width: 100%;
      padding: 0.75rem 1rem;
      transition: all 0.25s ease;
      box-shadow: 0 4px 10px ${Colors.VioletShadow};

      > span {
        position: relative;
        z-index: 1;
        font-size: 1rem;
      }

      &:hover {
        background: ${Colors.DeepVioletHover};
        box-shadow:
          0 6px 18px ${Colors.VioletShadowStrong},
          0 0 10px ${Colors.VioletShadowGlow} inset;
        transform: translateY(-1px);
      }

      &:focus-visible {
        outline: 2px solid ${Colors.VioletShadowGlow};
        outline-offset: 3px;
      }

      &:active {
        background: ${Colors.DeepVioletActive};
        transform: scale(0.98);
        box-shadow: 0 2px 8px ${Colors.Black25} inset;
      }
    }
  `,

  logout: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, ${Colors.LogoutStart}, ${Colors.LogoutEnd});
      border: none;
      color: ${Colors.White};
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: all 0.25s ease-in-out;
      box-shadow: 0 4px 15px ${Colors.LogoutShadow};
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
        background: ${Colors.Gray01};
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        z-index: 0;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 1;
      }

      &:hover {
        background: linear-gradient(
          135deg,
          ${Colors.LogoutHoverStart},
          ${Colors.LogoutHoverEnd}
        );
        box-shadow: 0 6px 20px ${Colors.LogoutShadowHover};
        transform: translateY(-2px);
      }

      &:focus-visible {
        outline: 2px solid ${Colors.LogoutShadow};
        outline-offset: 3px;
      }

      &:active {
        background: ${Colors.LogoutActive};
        transform: scale(0.97);
        box-shadow: 0 3px 10px ${Colors.LogoutShadow};
      }
    }

    &.${prefixCls}-button-default {
      &:hover {
        color: ${Colors.White};
      }
    }
  `,
}));

export default useStyleButton;
