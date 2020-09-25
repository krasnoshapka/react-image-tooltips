import * as React from 'react';
import {Accordion} from './Accordion';

export interface ImageTooltipsItemProps {
  id: number;
  top: number;
  left: number;
  imageW: number;
  imageH: number;
  toggle: boolean;
  children: React.ReactNode;
  parentHandleClick: (id: number, toggle: boolean) => void
}

export function ImageTooltipsItem({
  children,
  id,
  top,
  left,
  imageW,
  imageH,
  toggle,
  parentHandleClick,
  // ...props
}: ImageTooltipsItemProps) {
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
  const style = {
    left: `${Math.round(left * imageW)}px`,
    top: `${Math.round(top * imageH)}px`
  };

  return (
    <div className={cssClass.join(' ')} style={style} data-id={id}>
      <div className="hotspot-trigger" tabIndex={0} onClick={handleClick}>
        +
      </div>
      <Accordion toggled={toggled} className="hotspot-content">
        {children}
      </Accordion>
    </div>
  );
}
