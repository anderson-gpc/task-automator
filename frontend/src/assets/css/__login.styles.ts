import { Colors } from '@/src/constants/colors';
import { CSSProperties } from 'react';

const containerStyle: CSSProperties = {
  width: '100vw',
  height: '100vh',
  backgroundImage: "url('/assets/bg.png')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const overlayStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundColor: `${Colors.Black07}`,
  zIndex: 0,
};

const boxStyle: CSSProperties = {
  width: 400,
  padding: '40px 30px',
  borderRadius: 16,
  position: 'relative',
  overflow: 'hidden',
  backdropFilter: 'blur(12px)',
  background: `${Colors.Gray015}`,
  boxShadow: `0 4px 30px ${Colors.Black01}`,
  color: `${Colors.White}`,
  textAlign: 'center',
  zIndex: 1,
};

const useLoginStyles = () => ({
  containerStyle,
  overlayStyle,
  boxStyle,
});

export default useLoginStyles;
