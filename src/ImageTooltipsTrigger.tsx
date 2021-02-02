import * as React from 'react';

export interface ImageTooltipsTriggerProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  children: React.ReactNode;
}

export const ImageTooltipsTrigger: React.FC<ImageTooltipsTriggerProps> = ({
  className, children, ...props
}: ImageTooltipsTriggerProps) => {
  const cssClass = ["image-tooltips-item__trigger", className];
  return (
    <div className={cssClass.join(' ')} {...props} tabIndex={0}>
      {children}
    </div>
  );
}