import * as React from 'react';
import {ImageTooltipsItem as _ImageTooltipsItem} from './ImageTooltipsItem';
import './styles.scss';

export const ImageTooltipsItem = _ImageTooltipsItem;

export interface ImageTooltipsProps {
  src: string;
  width: number;
  height: number;
  children: React.ReactNode
}

type imageSizeObject = {
  curW: number,
  curH: number,
  initW: number,
  initH: number
}

export function ImageTooltips({ children, src, width, height, ...props }: ImageTooltipsProps) {
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
    width: '100%',
    maxWidth: `${width}px`,
    height: 'auto'
  };

  return (
    <div className="hotspot-container">
      <img ref={imageEl} src={src} style={style} {...props} onLoad={() => setImageSize({
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
            imageW={imageSize.curW / imageSize.initW}
            imageH={imageSize.curH / imageSize.initH}
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
