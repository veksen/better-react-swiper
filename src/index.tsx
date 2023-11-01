import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { useSwipeable, EventData, SwipeableOptions } from 'react-swipeable';
import { Arrow } from './arrow';

import { ArrowLeft, ArrowRight, Item, SwiperCanvas, SwiperWrapper } from './styles';

const MEDIA_MAX_XS = 576;
const MEDIA_MAX_SM = 767;

interface SwiperProps {
  items: any[];
  itemsWide?: number;
  infinity?: boolean;
  canvasClassName?: string;
  canvasStyle?: React.CSSProperties;
  arrowClassName?: string;
  arrowStyle?: React.CSSProperties;
  autoplay?: number;
  style?: React.CSSProperties;
}

const Swiper = ({
  items = [],
  itemsWide = 3,
  infinity = false,
  canvasClassName,
  canvasStyle,
  arrowClassName,
  arrowStyle,
  autoplay = 0,
  style,
}: SwiperProps): JSX.Element => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [width, setWidth] = React.useState<number>(0);

  const swipeConfig: SwipeableOptions = {
    trackTouch: true,
    trackMouse: true,
  };

  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => onSwiping(eventData),
    ...swipeConfig,
  });

  const computeMedia = () => {
    if (width <= MEDIA_MAX_XS) {
      return 'xs';
    }
    if (width <= MEDIA_MAX_SM) {
      return 'sm';
    }
    return 'md';
  };

  const computeItemWidth = () => {
    return width <= MEDIA_MAX_SM ? 1 : itemsWide;
  };

  const canGoToPrevious = () => {
    return (infinity && items.length > 1) || currentIndex !== 0;
  };

  const canGoToNext = () => {
    const computedWide = computeItemWidth();

    return (infinity && items.length > 1) || currentIndex < items.length - computedWide;
  };

  const goToPrevious = () => {
    if (!canGoToPrevious()) {
      return;
    }

    const computedWide = computeItemWidth();

    const steps = currentIndex === 0 ? computedWide : 1;
    const prev = (items.length + currentIndex - steps) % items.length;

    setCurrentIndex(prev);
  };

  const goToNext = () => {
    if (!canGoToNext()) {
      return;
    }

    const computedWide = computeItemWidth();

    const steps = items.length - currentIndex > computedWide ? 1 : computedWide;
    const next = (items.length + currentIndex + steps) % items.length;

    setCurrentIndex(next);
  };

  const onSwiping = (e: EventData) => {
    if (!width) {
      return;
    }

    const draggedPercent = (e.deltaX * 2) / width;

    if (draggedPercent < -0.3333) {
      goToPrevious();
      return;
    }

    if (draggedPercent > 0.3333) {
      goToNext();
      return;
    }
  };

  const onResize = (w?: number) => {
    if (w) {
      setWidth(w);
    }
  };

  const startAutoPlay = () => {

    if(autoplay > 0){
      setInterval(() => {
        goToNext();
      }, autoplay);
    }

  }

  React.useEffect(() => {
    startAutoPlay();
  }, []);

  const hideArrows = items.length <= itemsWide;

  return (
    <ReactResizeDetector handleWidth onResize={onResize}>
      <SwiperWrapper style={style} media={computeMedia()}>
        {!hideArrows && (
          <ArrowLeft
            data-testid="prev"
            faded={!canGoToPrevious()}
            onClick={goToPrevious}
            className={arrowClassName}
            style={arrowStyle}
          >
            <Arrow />
          </ArrowLeft>
        )}
        <SwiperCanvas {...swipeHandlers} className={canvasClassName} style={canvasStyle}>
          {items.map((item, i) => (
            <Item
              key={i}
              itemsWide={computeItemWidth()}
              currentIndex={currentIndex}
              data-testid="item"
            >
              {item}
            </Item>
          ))}
        </SwiperCanvas>
        {!hideArrows && (
          <ArrowRight
            data-testid="next"
            faded={!canGoToNext()}
            onClick={goToNext}
            className={arrowClassName}
            style={arrowStyle}
          >
            <Arrow />
          </ArrowRight>
        )}
      </SwiperWrapper>
    </ReactResizeDetector>
  );
};

export default Swiper;
