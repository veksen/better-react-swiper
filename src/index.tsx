import React, { useState } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { EventData, Swipeable, SwipeableOptions } from 'react-swipeable';

import {
  ArrowLeft,
  ArrowRight,
  Item,
  SwiperCanvas,
  SwiperWrapper,
} from './styles';

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
  style,
}: SwiperProps): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slideOffset, setSlideOffset] = useState<number>(0);
  // TODO: there has to be a better way...
  const [lastSwipe, setLastSwipe] = useState<number | null>(null);
  const [width, setWidth] = useState<number>(0);

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

    return (
      (infinity && items.length > 1) ||
      currentIndex < items.length - computedWide
    );
  };

  const previous = () => {
    const computedWide = computeItemWidth();

    const steps = currentIndex === 0 ? computedWide : 1;
    const prev = (items.length + currentIndex - steps) % items.length;

    setCurrentIndex(canGoToPrevious() ? prev : currentIndex);
  };

  const next = () => {
    const computedWide = computeItemWidth();

    const steps = items.length - currentIndex > computedWide ? 1 : computedWide;
    const next = (items.length + currentIndex + steps) % items.length;

    setCurrentIndex(canGoToNext() ? next : currentIndex);
  };

  const resetSwipe = () => {
    const now = new Date().getTime();
    setSlideOffset(0);
    setLastSwipe(now);
  };

  const onSwiping = (e: EventData) => {
    const now = new Date().getTime();

    if (!width) {
      return;
    }

    if (lastSwipe && now - lastSwipe < 250) {
      return;
    }

    const draggedPercent = (e.deltaX * 2) / width;

    setSlideOffset(draggedPercent * 100);

    if (draggedPercent < -0.3333) {
      resetSwipe();
      next();
    }

    if (draggedPercent > 0.3333) {
      resetSwipe();
      previous();
    }
  };

  const onSwipeEnd = () => {
    setSlideOffset(0);
  };

  const onResize = (width: number) => {
    setWidth(width);
  };

  const swipeConfig: SwipeableOptions = {
    trackTouch: true,
    trackMouse: true,
  };

  // const hideArrows = false;
  // const hideArrows = items.length <= itemsWide;

  console.log('v2');

  return (
    <ReactResizeDetector handleWidth onResize={onResize}>
      <SwiperWrapper style={style} media={computeMedia()}>
        {/* {!hideArrows && (
          <ArrowLeft
            data-testid="prev"
            faded={!canGoToPrevious()}
            onClick={previous}
            className={arrowClassName}
            style={arrowStyle}
          >
            ◀abc
          </ArrowLeft>
        )} */}
        <ArrowLeft
          data-testid="prev"
          faded={!canGoToPrevious()}
          onClick={previous}
          className={arrowClassName}
          style={arrowStyle}
        >
          ◀abc
        </ArrowLeft>
        <Swipeable
          onSwiping={eventData => onSwiping(eventData)}
          onSwiped={onSwipeEnd}
          {...swipeConfig}
        >
          defs
          <SwiperCanvas className={canvasClassName} style={canvasStyle}>
            {items.map((item, i) => (
              <Item
                key={i}
                itemsWide={computeItemWidth()}
                currentIndex={currentIndex}
                data-testid="item"
                style={{
                  left: `-${(currentIndex * 100) / computeItemWidth() -
                    slideOffset}%`,
                }}
              >
                {item}
              </Item>
            ))}
          </SwiperCanvas>
        </Swipeable>
        {/* {!hideArrows && (
          <ArrowRight
            data-testid="next"
            faded={!canGoToNext()}
            onClick={next}
            className={arrowClassName}
            style={arrowStyle}
          >
            ▶
          </ArrowRight>
        )} */}
        <ArrowRight
          data-testid="next"
          faded={!canGoToNext()}
          onClick={next}
          className={arrowClassName}
          style={arrowStyle}
        >
          ▶
        </ArrowRight>
      </SwiperWrapper>
    </ReactResizeDetector>
  );
};

export default Swiper;
