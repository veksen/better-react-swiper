import React from "react";
import Hammer from "react-hammerjs";
import ReactResizeDetector from "react-resize-detector";

import {
  SwiperWrapper,
  SwiperCanvas,
  ArrowLeft,
  ArrowRight,
  Item
} from "./styles";

const MEDIA_MAX_XS = 576;
const MEDIA_MAX_SM = 767;

class Swiper extends React.Component {
  static defaultProps = {
    items: [],
    itemsWide: 3,
    infinity: false
  };

  state = {
    currentIndex: 0,
    slideOffset: 0,
    width: null
  };

  canGoToPrevious = () => {
    const { currentIndex } = this.state;
    const { infinity, items } = this.props;
    return (infinity && items.length > 1) || currentIndex !== 0;
  };

  canGoToNext = () => {
    const { currentIndex } = this.state;
    const { items, infinity } = this.props;
    const computedWide = this.computeItemWidth();

    return (
      (infinity && items.length > 1) ||
      currentIndex < items.length - computedWide
    );
  };

  previous = () => {
    const { currentIndex } = this.state;
    const { items } = this.props;
    const computedWide = this.computeItemWidth();

    const steps = currentIndex === 0 ? computedWide : 1;
    const prev = (items.length + currentIndex - steps) % items.length;

    this.setState({
      currentIndex: this.canGoToPrevious() ? prev : currentIndex
    });
  };

  next = () => {
    const { currentIndex } = this.state;
    const { items } = this.props;
    const computedWide = this.computeItemWidth();

    const steps = items.length - currentIndex > computedWide ? 1 : computedWide;
    const next = (items.length + currentIndex + steps) % items.length;

    this.setState({ currentIndex: this.canGoToNext() ? next : currentIndex });
  };

  onPan = e => {
    const { width } = this.state;
    const draggedPercent = (e.deltaX * 2) / width;

    this.setState({ slideOffset: draggedPercent * 100 });

    if (draggedPercent < -0.3333) {
      this.hammerComponent.hammer.stop();
      this.setState({ slideOffset: 0 });
      this.next();
    }

    if (draggedPercent > 0.3333) {
      this.hammerComponent.hammer.stop();
      this.setState({ slideOffset: 0 });
      this.previous();
    }
  };

  onPanEnd = () => {
    this.setState({ slideOffset: 0 });
  };

  onResize = width => {
    this.setState({ width });
  };

  computeItemWidth = () => {
    const { width } = this.state;
    const { itemsWide } = this.props;
    return width <= MEDIA_MAX_SM ? 1 : itemsWide;
  };

  computeMedia = () => {
    const { width } = this.state;
    if (width <= MEDIA_MAX_XS) {
      return "xs";
    }
    if (width <= MEDIA_MAX_SM) {
      return "sm";
    }
    return "md";
  };

  render() {
    const {
      items,
      itemsWide,
      canvasClassName,
      canvasStyle,
      arrowClassName,
      arrowStyle,
      ...restProps
    } = this.props;
    const { currentIndex, slideOffset } = this.state;
    const hideArrows = items.length <= itemsWide;
    return (
      <ReactResizeDetector handleWidth onResize={this.onResize}>
        <SwiperWrapper {...restProps} media={this.computeMedia()}>
          {!hideArrows && (
            <ArrowLeft
              data-testid="prev"
              faded={!this.canGoToPrevious()}
              onClick={() => this.previous()}
              className={arrowClassName}
              style={arrowStyle}
            >
              ◀
            </ArrowLeft>
          )}
          <Hammer
            onPan={this.onPan}
            onPanEnd={this.onPanEnd}
            ref={instance => (this.hammerComponent = instance)}
          >
            <SwiperCanvas
              className={canvasClassName}
              style={canvasStyle}
            >
              {items.length &&
                items.map((item, i) => (
                  <Item
                    key={i}
                    itemsWide={itemsWide}
                    currentIndex={currentIndex}
                    data-testid="item"
                    style={{
                      left: `-${(currentIndex * 100) / this.computeItemWidth() -
                        slideOffset}%`
                    }}
                  >
                    {item}
                  </Item>
                ))}
            </SwiperCanvas>
          </Hammer>
          {!hideArrows && (
            <ArrowRight
              data-testid="next"
              faded={!this.canGoToNext()}
              onClick={() => this.next()}
              className={arrowClassName}
              style={arrowStyle}
            >
              ▶
            </ArrowRight>
          )}
        </SwiperWrapper>
      </ReactResizeDetector>
    );
  }
}

export default Swiper;
