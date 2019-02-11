import React from "react";

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
    currentIndex: 0
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

  render() {
    const { items, ...restProps } = this.props;
    return (
      <SwiperWrapper>
        <ArrowLeft
          data-testid="prev"
          faded={!this.canGoToPrevious()}
          onClick={() => this.previous()}
        >
          ◀
        </ArrowLeft>
        <InnerWrapper>
          {items.length &&
            items.map((item, i) => (
              <Item
                key={i}
                itemsWide={this.props.itemsWide}
                currentIndex={this.state.currentIndex}
                slideOffset="0"
              >
                {item}
              </Item>
            ))}
        </InnerWrapper>
        <ArrowRight
          data-testid="next"
          faded={!this.canGoToNext()}
          onClick={() => this.next()}
        >
          ▶
        </ArrowRight>
      </SwiperWrapper>
    );
  }
}

export default Swiper;
