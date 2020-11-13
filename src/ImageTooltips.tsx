import * as React from 'react';
import {ImageTooltipsItem as _ImageTooltipsItem} from './ImageTooltipsItem';
import './styles.scss';

export const ImageTooltipsItem = _ImageTooltipsItem;

export interface ImageTooltipsProps extends React.ComponentPropsWithoutRef<"img"> {
  width: number;
  height: number;
  children: React.ReactNode
}

export interface imageSizeObject {
  initW: number;
  initH: number;
  curW: number;
  curH: number
}

export const ImageTooltips: React.FC<ImageTooltipsProps> = ({children, width, height, ...props}: ImageTooltipsProps) => {
  const [imageSize, _setImageSize] = React.useState<imageSizeObject | null>(null);
  const imageSizeRef = React.useRef(imageSize);
  const [toggled, setToggled] = React.useState<number | null>(null);
  const imageEl = React.useRef<HTMLImageElement | null>(null);

  // Need to use Ref because state is unavailable in handleResize EventListener
  const setImageSize = (imageData: imageSizeObject) => {
    imageSizeRef.current = imageData;
    _setImageSize(imageData);
  };

  let timerId: NodeJS.Timeout | undefined;
  React.useEffect(() => {
    // Listener that handles resize with simple throttling
    const handleResize = () => {
      if (timerId) {
        return;
      }
      timerId = setTimeout(() => {
        setImageSize({
          initW: imageSizeRef.current!.initW,
          initH: imageSizeRef.current!.initH,
          curW: imageEl.current!.offsetWidth,
          curH: imageEl.current!.offsetHeight
        });
        timerId = undefined;
      }, 200);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const parentHandleClick = (id: number, toggle: boolean): void => {
    setToggled(toggle ? id : null);
  };

  // Making image responsive
  const style = {
    maxWidth: `${width}px`
  };

  return (
    <div className="hotspot-container" style={style}>
      <img ref={imageEl} {...props} onLoad={() => setImageSize({
        // Set initial image dimensions in state
        initW: width,
        initH: height,
        curW: imageEl.current!.offsetWidth,
        curH: imageEl.current!.offsetHeight
      })} />

      {imageSize && children && React.Children.toArray(children).map((child: React.ReactElement, index) => {
        return (
          <_ImageTooltipsItem
            key={index}
            id={index}
            toggle={index === toggled}
            imageSize={imageSize}
            parentHandleClick={parentHandleClick}
            {...child.props}
          >
            {child.props.children}
          </_ImageTooltipsItem>
        );
      })}
    </div>
  );
}
