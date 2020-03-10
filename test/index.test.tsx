import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import Swiper from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Swiper items={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders children', () => {
    const items = ['a', 'b', 'c', 'd', 'e'];
    const { getAllByTestId } = render(<Swiper items={items} />);

    expect(getAllByTestId('item')).toHaveLength(5);
  });
});
