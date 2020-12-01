import { SpringProps } from 'react-spring/renderprops-universal';
import { useCallback, useEffect } from 'react';

export const Spring = ({ children, to, onRest, immediate }: SpringProps) => {
  const onRestStable = useCallback(() => {
    if (!immediate && onRest) onRest(to!);
  }, [immediate, onRest, to]);

  useEffect(onRestStable, [to]);

  return children!(to!);
};
