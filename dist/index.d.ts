import React from 'react';
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
export declare const Swiper: ({
  items,
  itemsWide,
  infinity,
  canvasClassName,
  canvasStyle,
  arrowClassName,
  arrowStyle,
  style,
}: SwiperProps) => JSX.Element;
export default Swiper;
