'use strict';

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = require('react');
var React__default = _interopDefault(React);
var ReactResizeDetector = _interopDefault(require('react-resize-detector'));
var reactSwipeable = require('react-swipeable');
var styled = require('styled-components');
var styled__default = _interopDefault(styled);

const isMobile = media => {
  return media === 'xs' || media === 'sm';
};
const color = {
  blue: '#105783',
};
const SwiperCanvas = styled__default.div`
  box-sizing: content-box;
  display: flex;
  flex-wrap: nowrap;
  width: calc(100% - 120px);
  margin: 0;
  padding: 0 60px;
  mask-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, rgba(0, 0, 0, 0)),
    color-stop(0.05, rgba(0, 0, 0, 1)),
    color-stop(0.95, rgba(0, 0, 0, 1)),
    color-stop(1, rgba(0, 0, 0, 0))
  );
  overflow: hidden;
`;
const arrowStyles = styled.css`
  box-sizing: content-box;
  cursor: pointer;
  background: #fff;
  border: 0;
  color: ${color.blue};
  border-radius: 4px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  margin-top: -15px;
  z-index: 1;
  transition: 0.3s opacity;
`;
const ArrowLeft = styled__default.button`
  ${arrowStyles};
  opacity: ${props => (props.faded ? 0.25 : 1)};
  left: 10px;
`;
const ArrowRight = styled__default.button`
  ${arrowStyles};
  opacity: ${props => (props.faded ? 0.25 : 1)};
  right: 10px;
`;
const Item = styled__default.div`
  transition: 0.3s left;
  position: relative;
  width: ${props => 100 / props.itemsWide}%;
  flex: 0 0 ${props => 100 / props.itemsWide}%;
  display: flex;
`;
const SwiperWrapper = styled__default.div`
  position: relative;

  ${SwiperCanvas} {
    ${props =>
      isMobile(props.media)
        ? styled.css`
            width: calc(100% - 80px);
            padding: 0 40px;
          `
        : null}
  }

  ${ArrowLeft} {
    ${props =>
      isMobile(props.media)
        ? styled.css`
            left: 5px;
          `
        : null}
  }

  ${ArrowRight} {
    ${props =>
      isMobile(props.media)
        ? styled.css`
            right: 5px;
          `
        : null}
  }

  ${Item} {
    ${props =>
      isMobile(props.media)
        ? styled.css`
            width: 100%;
            flex-basis: 100%;
          `
        : null}
  }
`;

const MEDIA_MAX_XS = 576;
const MEDIA_MAX_SM = 767;
const Swiper = ({
  items = [],
  itemsWide = 3,
  infinity = false,
  canvasClassName,
  canvasStyle,
  arrowClassName,
  arrowStyle,
  style,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [slideOffset, setSlideOffset] = React.useState(0);
  // TODO: there has to be a better way...
  const [lastSwipe, setLastSwipe] = React.useState(null);
  const [width, setWidth] = React.useState(0);
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
  const resetSwipe = () => {
    const now = new Date().getTime();
    setSlideOffset(0);
    setLastSwipe(now);
  };
  const onSwiping = e => {
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
      goToPrevious();
      return;
    }
    if (draggedPercent > 0.3333) {
      resetSwipe();
      goToNext();
      return;
    }
  };
  const onSwipeEnd = () => {
    setSlideOffset(0);
  };
  const onResize = w => {
    setWidth(w);
    resetSwipe();
  };
  const swipeConfig = {
    trackTouch: true,
    trackMouse: true,
  };
  const hideArrows = items.length <= itemsWide;
  return React__default.createElement(
    ReactResizeDetector,
    { handleWidth: true, onResize: onResize },
    React__default.createElement(
      SwiperWrapper,
      { style: style, media: computeMedia() },
      !hideArrows &&
        React__default.createElement(
          ArrowLeft,
          {
            'data-testid': 'prev',
            faded: !canGoToPrevious(),
            onClick: goToPrevious,
            className: arrowClassName,
            style: arrowStyle,
          },
          '\u25C0'
        ),
      React__default.createElement(
        reactSwipeable.Swipeable,
        Object.assign(
          {
            onSwiping: eventData => onSwiping(eventData),
            onSwiped: onSwipeEnd,
          },
          swipeConfig
        ),
        React__default.createElement(
          SwiperCanvas,
          { className: canvasClassName, style: canvasStyle },
          items.map((item, i) =>
            React__default.createElement(
              Item,
              {
                key: i,
                itemsWide: computeItemWidth(),
                currentIndex: currentIndex,
                'data-testid': 'item',
                style: {
                  left: `-${(currentIndex * 100) / computeItemWidth() +
                    slideOffset}%`,
                },
              },
              item
            )
          )
        )
      ),
      !hideArrows &&
        React__default.createElement(
          ArrowRight,
          {
            'data-testid': 'next',
            faded: !canGoToNext(),
            onClick: goToNext,
            className: arrowClassName,
            style: arrowStyle,
          },
          '\u25B6'
        )
    )
  );
};

exports.Swiper = Swiper;
exports.default = Swiper;
//# sourceMappingURL=better-react-swiper.cjs.development.js.map
