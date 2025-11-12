import { createStyles } from "antd-style";


const useStyleAppbar = createStyles(({ css }) => ({
  appbar: css`
    backdrop-filter: blur(10px);
    background: rgba(47, 40, 144, 0.85);
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.25);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    z-index: 1000;

    .appbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: white;
    }

    p {
      margin: 0;
      font-weight: 600;
      font-size: 1.3rem;
      letter-spacing: 0.5px;
      user-select: none;
    }
  `,
}));

export default useStyleAppbar;