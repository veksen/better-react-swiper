import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Swiper from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Swiper items={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
