import { WINDOW_RESIZE } from './actionTypes';

export const handleResize = () => {
  const width = window.innerWidth;
  return {
    type: WINDOW_RESIZE,
    width,
  };
};
