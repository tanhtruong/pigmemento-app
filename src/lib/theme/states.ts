import { opacity } from './opacity';

export const states = {
  pressed: {
    opacity: opacity.pressed,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: opacity.disabled,
  },
};
