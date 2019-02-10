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
    itemsWide: 3
  };

  state = {
    currentIndex: 0
  };

  canGoToPrevious = () => this.state.currentIndex !== 0;

  canGoToNext = () => {
    const { currentIndex } = this.state;
    const { items, itemsWide } = this.props;

    return currentIndex < items.length - itemsWide;
  };

  previous = () => {
    const { currentIndex } = this.state;

    if (this.canGoToPrevious()) {
      this.setState({ currentIndex: currentIndex - 1 });
    }
  };

  next = () => {
    const { currentIndex } = this.state;

    if (this.canGoToNext()) {
      this.setState({ currentIndex: currentIndex + 1 });
    }
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
