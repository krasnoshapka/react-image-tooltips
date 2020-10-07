import * as React from 'react';
import {Accordion} from './Accordion';
import {imageSizeObject} from './ImageTooltips';

export interface ImageTooltipsItemProps {
  id: number;
  top: number;
  left: number;
  imageSize: imageSizeObject;
  toggle: boolean;
  children?: React.ReactNode;
  parentHandleClick: (id: number, toggle: boolean) => void
}

export const ImageTooltipsItem: React.FC<ImageTooltipsItemProps> = ({
  children,
  id,
  top,
  left,
  imageSize,
  toggle,
  parentHandleClick,
  ...props
}: ImageTooltipsItemProps) => {
  const [toggled, setToggled] = React.useState(toggle);
  if (toggled !== toggle) {
    setToggled(toggle);
  }

  const handleClick = () => {
    setToggled(!toggled);
    parentHandleClick(id, !toggled);
  };

  const cssClass = ['hotspot'];
  if (toggled) cssClass.push('toggled');

  // Validation of hotspot coordinates
  const validateCoord = (c: number, max: number) => {
    if (c <= 0) {
      console.log(`Tooltip with id ${id} has coordinate outside of image.`);
      return 1;
    }
    if (c > max) {
      console.log(`Tooltip with id ${id} has coordinate outside of image.`);
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
    <div className={cssClass.join(' ')} style={style} data-id={id}>
      <div className="hotspot-trigger" tabIndex={0} onClick={handleClick}>
        +
      </div>
      <Accordion toggled={toggled} {...props}>
        {children}
      </Accordion>
    </div>
  );
}
