import React from "react";
import Hammer from "react-hammerjs";
import ReactResizeDetector from "react-resize-detector";

import {
  SwiperWrapper,
  InnerWrapper,
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
    const { items, itemsWide, infinity } = this.props;

    return (
      (infinity && items.length > 1) || currentIndex < items.length - itemsWide
    );
  };

  previous = () => {
    const { currentIndex } = this.state;
    const { items, itemsWide } = this.props;

    const steps = currentIndex === 0 ? itemsWide : 1;
    const prev = (items.length + currentIndex - steps) % items.length;

    this.setState({
      currentIndex: this.canGoToPrevious() ? prev : currentIndex
    });
  };

  next = () => {
    const { currentIndex } = this.state;
    const { items, itemsWide } = this.props;

    const steps = items.length - currentIndex > itemsWide ? 1 : itemsWide;
    const next = (items.length + currentIndex + steps) % items.length;

    this.setState({ currentIndex: this.canGoToNext() ? next : currentIndex });
  };

  onPan = e => {
    const itemWidth = this.state.width;
    const draggedPercent = (e.deltaX * 2) / itemWidth;

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
    return this.state.width <= MEDIA_MAX_SM ? 1 : this.props.itemsWide;
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
    const { items, ...restProps } = this.props;
    const hideArrows = items.length <= this.props.itemsWide;
    return (
      <ReactResizeDetector handleWidth onResize={this.onResize}>
        <SwiperWrapper>
          {!hideArrows && (
            <ArrowLeft
              data-testid="prev"
              faded={!this.canGoToPrevious()}
              onClick={() => this.previous()}
              media={this.computeMedia()}
            >
              ◀
            </ArrowLeft>
          )}
          <Hammer
            onPan={this.onPan}
            onPanEnd={this.onPanEnd}
            ref={instance => (this.hammerComponent = instance)}
          >
            <InnerWrapper media={this.computeMedia()}>
              {items.length &&
                items.map((item, i) => (
                  <Item
                    key={i}
                    itemsWide={this.props.itemsWide}
                    currentIndex={this.state.currentIndex}
                    style={{
                      left: `-${(this.state.currentIndex * 100) /
                        this.computeItemWidth() -
                        this.state.slideOffset}%`
                    }}
                    media={this.computeMedia()}
                  >
                    {item}
                  </Item>
                ))}
            </InnerWrapper>
          </Hammer>
          {!hideArrows && (
            <ArrowRight
              data-testid="next"
              faded={!this.canGoToNext()}
              onClick={() => this.next()}
              media={this.computeMedia()}
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
