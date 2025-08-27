import Lottie from 'lottie-react';
import type { AnimateIconProps } from '../types/AnimateIconProps';

const AnimateIcon = ({ animate, styles }: AnimateIconProps) => {
  return <Lottie animationData={animate} loop style={styles} />;
};

export default AnimateIcon;
