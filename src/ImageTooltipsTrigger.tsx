import * as React from 'react';

export interface ImageTooltipsTriggerProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  children: React.ReactNode;
  handleClick?: () => void
}

export const ImageTooltipsTrigger: React.FC<ImageTooltipsTriggerProps> = ({
  className, children, handleClick, ...props
}: ImageTooltipsTriggerProps) => {
  const cssClass = ["hotspot-trigger", className];
  return (
    <div className={cssClass.join(' ')} {...props} tabIndex={0} onClick={handleClick}>
      {children}
    </div>
  );
}