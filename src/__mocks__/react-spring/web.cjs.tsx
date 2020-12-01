// import * as React from 'react';
import { UseSpringProps } from 'react-spring';

export { animated } from 'react-spring/web.cjs';
export const useSpring = jest
  .fn()
  .mockImplementation(({ to }: UseSpringProps<any>) => to);
