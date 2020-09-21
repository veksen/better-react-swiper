import styled, { css } from 'styled-components';

const isMobile = (media: 'xs' | 'sm' | 'md') => {
  return media === 'xs' || media === 'sm';
};

const color = {
  blue: '#105783',
};

export const SwiperCanvas = styled.div`
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

const arrowStyles = css`
  box-sizing: content-box;
  cursor: pointer;
  background: #fff;
  border: 0;
  color: ${color.blue};
  border-radius: 50%;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  margin-top: -15px;
  z-index: 1;
  transition: 0.3s opacity;
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    width: 13px;
  }
`;

export const ArrowLeft = styled.button<{ faded: boolean }>`
  ${arrowStyles};
  opacity: ${props => (props.faded ? 0.25 : 1)};
  left: 10px;

  svg {
    transform: scale(-1);
  }
`;

export const ArrowRight = styled.button<{ faded: boolean }>`
  ${arrowStyles};
  opacity: ${props => (props.faded ? 0.25 : 1)};
  right: 10px;
`;

export const Item = styled.div<{
  currentIndex: number;
  itemsWide: number;
}>`
  transition: 0.3s left;
  position: relative;
  width: ${props => 100 / props.itemsWide}%;
  flex: 0 0 ${props => 100 / props.itemsWide}%;
  display: flex;
`;

export const SwiperWrapper = styled.div<{ media: 'xs' | 'sm' | 'md' }>`
  position: relative;

  ${SwiperCanvas} {
    ${props =>
      isMobile(props.media)
        ? css`
            width: calc(100% - 80px);
            padding: 0 40px;
          `
        : null}
  }

  ${ArrowLeft} {
    ${props =>
      isMobile(props.media)
        ? css`
            left: 5px;
          `
        : null}
  }

  ${ArrowRight} {
    ${props =>
      isMobile(props.media)
        ? css`
            right: 5px;
          `
        : null}
  }

  ${Item} {
    ${props =>
      isMobile(props.media)
        ? css`
            width: 100%;
            flex-basis: 100%;
          `
        : null}
  }
`;
