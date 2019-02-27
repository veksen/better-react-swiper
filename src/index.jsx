import React from "react";
import Hammer from "react-hammerjs";

import {
  SwiperWrapper,
  InnerWrapper,
  ArrowLeft,
  ArrowRight,
  Item
} from "./styles";

class Swiper extends React.Component {
  static defaultProps = {
    items: [],
    itemsWide: 3,
    infinity: false
  };

  state = {
    currentIndex: 0,
    slideOffset: 0
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
    const itemWidth = this.item.clientWidth;
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

  render() {
    const { items, ...restProps } = this.props;
    const hideArrows = items.length <= this.props.itemsWide;
    return (
      <SwiperWrapper>
        {!hideArrows && (
          <ArrowLeft
            data-testid="prev"
            faded={!this.canGoToPrevious()}
            onClick={() => this.previous()}
          >
            ◀
          </ArrowLeft>
        )}
        <Hammer
          onPan={this.onPan}
          onPanEnd={this.onPanEnd}
          ref={instance => (this.hammerComponent = instance)}
        >
          <InnerWrapper>
            {items.length &&
              items.map((item, i) => (
                <Item
                  key={i}
                  itemsWide={this.props.itemsWide}
                  currentIndex={this.state.currentIndex}
                  style={{
                    left: `-${(this.state.currentIndex * 100) /
                      this.props.itemsWide -
                      this.state.slideOffset}%`
                  }}
                  ref={el => (this.item = el)}
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
          >
            ▶
          </ArrowRight>
        )}
      </SwiperWrapper>
    );
  }
}

export default Swiper;
