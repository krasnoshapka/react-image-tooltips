import * as React from 'react';
import {ImageTooltipsItem as _ImageTooltipsItem} from './ImageTooltipsItem';
import './styles.scss'

export const ImageTooltipsItem = _ImageTooltipsItem;

export interface ImageTooltipsProps {
  src: string,
  width: number,
  height: number,
  children: React.ReactNode
}

type imageSizeObject = {
  w: number,
  h: number,
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
          w: imageEl.current!.offsetWidth,
          h: imageEl.current!.offsetHeight
        });
        timerId = undefined;
      }, 200);
    };

    // Set initial image dimensions in state
    setImageSize({
      initW: width,
      initH: height,
      w: imageEl.current!.offsetWidth,
      h: imageEl.current!.offsetHeight
    });

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const parentHandleClick = (id: number, toggle: boolean) => {
    setToggled(toggle ? id : null);
  };

  const style = {
    width: '100%',
    maxWidth: `${width}px`,
    height: 'auto'
  };

  return (
    <div className="hotspot-container">
      <img ref={imageEl} src={src} style={style} {...props} />

      {imageSize && children && React.Children.toArray(children).map((child: React.ReactElement, index) => {
        return (
          <_ImageTooltipsItem
            key={index}
            id={index}
            toggle={index === toggled}
            imageW={imageSize.w / imageSize.initW}
            imageH={imageSize.h / imageSize.initH}
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
