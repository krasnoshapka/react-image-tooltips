import * as React from 'react';
import { Spring } from 'react-spring/renderprops.cjs';
import useFirstMount from './hooks/firstmount';

export interface AccordionProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  children?: React.ReactNode;
  toggled?: boolean;
  onFullyShown?: () => void;
  onFullyHidden?: () => void;
}

export const Accordion: React.FC<AccordionProps> =({
  className = '',
  children,
  toggled = false,
  onFullyShown,
  onFullyHidden,
  ...props
}: AccordionProps) => {
  const isFirstMount = useFirstMount();

  const handleAnimationRest = React.useCallback(() => {
    if (toggled && onFullyShown) onFullyShown();
    else if (!toggled && onFullyHidden) onFullyHidden();
  }, [toggled, onFullyShown, onFullyHidden]);

  const cssClass = ["hotspot-content", className];

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
        <div className={cssClass.join(' ')} style={styleProps} {...props}>
          {children}
        </div>
      )}
    </Spring>
  );
}
