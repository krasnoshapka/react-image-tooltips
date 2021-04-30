import * as React from 'react';
import { Spring, animated } from 'react-spring';
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

  const cssClass = ["image-tooltips-item__content", className];

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
      {(styleProps: any) => (
        <animated.div className={cssClass.join(' ')} style={styleProps} {...props}>
          {children}
        </animated.div>
      )}
    </Spring>
  );
}
