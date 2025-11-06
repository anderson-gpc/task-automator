const containerStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  backgroundImage: "url('/assets/bg.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  zIndex: 0,
};

const boxStyle: React.CSSProperties = {
  width: 400,
  padding: "40px 30px",
  borderRadius: 16,
  position: "relative",
  overflow: "hidden",
  backdropFilter: "blur(12px)",
  background: "rgba(255, 255, 255, 0.15)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  color: "#fff",
  textAlign: "center",
  zIndex: 1,
};

export const loginStyles = {
    containerStyle,
    overlayStyle,
    boxStyle
}