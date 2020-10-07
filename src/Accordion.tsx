import * as React from 'react';
import { Spring } from 'react-spring/renderprops';
import useFirstMount from './hooks/firstmount';

export interface AccordionProps {
  children?: React.ReactNode;
  toggled?: boolean;
  onFullyShown?: () => void;
  onFullyHidden?: () => void;
}

export const Accordion: React.FC<AccordionProps> =({
  children,
  toggled,
  onFullyShown,
  onFullyHidden,
  ...props
}: AccordionProps) => {
  const isFirstMount = useFirstMount();

  const handleAnimationRest = React.useCallback(() => {
    if (toggled && onFullyShown) onFullyShown();
    else if (!toggled && onFullyHidden) onFullyHidden();
  }, [toggled, onFullyShown, onFullyHidden]);

  return (
    <Spring
      config={{
        tension: 170,
        friction: 22,
        clamp: true
      }}
      from={{ height: 0 }}
      to={{ height: toggled ? 'auto' : 0 }}
      immediate={isFirstMount}
      onRest={handleAnimationRest}
    >
      {styleProps => (
        <div className="hotspot-content" style={styleProps} {...props}>
          {children}
        </div>
      )}
    </Spring>
  );
}
