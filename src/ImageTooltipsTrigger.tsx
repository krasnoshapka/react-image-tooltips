import * as React from 'react';

export interface ImageTooltipsTriggerProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  children: React.ReactNode;
  handleClick?: () => void
}

export class ImageTooltipsTrigger extends React.Component<ImageTooltipsTriggerProps> {
  render () {
    const {className, children, handleClick, ...rest} = this.props;
    const cssClass = ["hotspot-trigger", className];
    return (
      <div className={cssClass.join(' ')} {...rest} tabIndex={0} onClick={handleClick}>
        {children}
      </div>
    );
  }
}