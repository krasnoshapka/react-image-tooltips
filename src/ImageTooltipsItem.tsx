import * as React from 'react';
import {Accordion} from './Accordion';
import {ImageTooltipsTrigger} from './ImageTooltipsTrigger';
import {imageSizeObject} from './ImageTooltips';

export interface ImageTooltipsItemProps extends React.ComponentPropsWithoutRef<"div"> {
  top: number;
  left: number;
  trigger?: ReturnType<typeof ImageTooltipsTrigger>
}

export const ImageTooltipsItem: React.FC<ImageTooltipsItemProps> = () => {
  return <div></div>;
};

export interface _ImageTooltipsItemProps extends ImageTooltipsItemProps {
  dataId: number;
  imageSize: imageSizeObject;
  toggled: boolean;
  children?: React.ReactNode;
}

export const _ImageTooltipsItem: React.FC<_ImageTooltipsItemProps> = ({
  children,
  dataId,
  top,
  left,
  imageSize,
  toggled,
  trigger,
  ...props
}: _ImageTooltipsItemProps) => {
  const cssClass = ['hotspot'];
  if (toggled) {
    cssClass.push('toggled');
  }

  // Validation of hotspot coordinates
  const validateCoord = (c: number, max: number) => {
    if (c <= 0) {
      console.log(`Tooltip with id ${dataId} has coordinate outside of image.`);
      return 1;
    }
    if (c > max) {
      console.log(`Tooltip with id ${dataId} has coordinate outside of image.`);
      return max;
    }
    return c;
  }
  left = validateCoord(left, imageSize.initW);
  top = validateCoord(top, imageSize.initH);

  // Calculate tooltip position based on image scaling
  const style = {
    left: `${Math.round(left * imageSize.curW / imageSize.initW)}px`,
    top: `${Math.round(top * imageSize.curH / imageSize.initH)}px`
  };

  return (
    <div className={cssClass.join(' ')} style={style} data-id={dataId}>
      {trigger ? (<ImageTooltipsTrigger {...trigger.props}>
        {trigger.props.children}
      </ImageTooltipsTrigger>) : (<ImageTooltipsTrigger>
        +
      </ImageTooltipsTrigger>
      )}
      <Accordion toggled={toggled} {...props}>
        {children}
      </Accordion>
    </div>
  );
}
