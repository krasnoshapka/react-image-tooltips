import * as React from 'react';
import {_ImageTooltipsItem, ImageTooltipsItemProps} from './ImageTooltipsItem';

export type ImageTooltipsTriggerEvent = ('click' | 'mouseover');

export interface ImageTooltipsProps extends React.ComponentPropsWithoutRef<"img"> {
  width: number;
  height: number;
  triggerEvent?: ImageTooltipsTriggerEvent;
  children: React.ReactNode
}

export interface imageSizeObject {
  initW: number;
  initH: number;
  curW: number;
  curH: number
}

type State = {
  imageSize: (imageSizeObject | null),
  toggled: (number | null)
};

export const ImageTooltips: React.FC<ImageTooltipsProps> = ({
  children,
  width,
  height,
  triggerEvent = 'click',
  ...props
}: ImageTooltipsProps) => {
  const [state, _setState] = React.useState<State>({imageSize: null, toggled: null});
  const stateRef = React.useRef<State>(state);
  const imageEl = React.useRef<HTMLImageElement | null>(null);
  const divEl = React.useRef<HTMLDivElement | null>(null);

  // Need to use Ref because state is unavailable in event listeners
  const setImageSize = (imageSize: imageSizeObject) => {
    stateRef.current.imageSize = imageSize;
    _setState({...state, imageSize: imageSize});
  };
  const setToggled = (toggled: (number | null)) => {
    stateRef.current.toggled = toggled;
    _setState({...state, toggled: toggled});
  };

  let timerId: NodeJS.Timeout | undefined;
  React.useEffect(() => {
    // Listener that handles resize with simple throttling
    const handleResize = () => {
      if (timerId) {
        return;
      }
      timerId = global.setTimeout(() => {
        setImageSize({
          initW: stateRef.current.imageSize!.initW,
          initH: stateRef.current.imageSize!.initH,
          curW: imageEl.current!.offsetWidth,
          curH: imageEl.current!.offsetHeight
        });
        timerId = undefined;
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add event handler for all tooltip items
  React.useEffect(() => {
    const startHandler = (event: MouseEvent) => {
      const clicked = event.target as HTMLElement;
      if (clicked.classList.contains('hotspot-trigger')) {
        const dataIdStr = clicked.parentElement!.getAttribute('data-id');
        if (dataIdStr) {
          const dataId = parseInt(dataIdStr);
          setToggled(stateRef.current.toggled != dataId ? dataId : null);
        } else {
          setToggled(null);
        }
      }
    };

    const endHandler = () => {
      setToggled(null);
    }

    divEl.current!.addEventListener(triggerEvent, startHandler);
    if (triggerEvent == 'mouseover') {
      divEl.current!.addEventListener('mouseout', endHandler);
    }

    return () => {
      divEl.current!.removeEventListener(triggerEvent, startHandler);
      if (triggerEvent == 'mouseover') {
        divEl.current!.removeEventListener('mouseout', endHandler);
      }
    }
  }, []);

  // Making image responsive
  const style = {
    maxWidth: `${width}px`
  };

  return (
    <div ref={divEl} className="hotspot-container" style={style}>
      <img ref={imageEl} {...props} onLoad={() => setImageSize({
        // Set initial image dimensions in state
        initW: width,
        initH: height,
        curW: imageEl.current!.offsetWidth,
        curH: imageEl.current!.offsetHeight
      })} />

      {state.imageSize && children && React.Children.map(children, (child, index) => {
        if (!child || ! React.isValidElement<ImageTooltipsItemProps>(child)) {
          return child;
        }
        const childEl: React.ReactElement<ImageTooltipsItemProps> = child;

        return (
          <_ImageTooltipsItem
            key={index}
            dataId={index}
            toggled={index === state.toggled}
            imageSize={state.imageSize!}
            {...childEl.props}
          >
            {childEl.props.children}
          </_ImageTooltipsItem>
        );
      })}
    </div>
  );
}
