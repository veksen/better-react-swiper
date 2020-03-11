[![TravisCI](https://img.shields.io/travis/veksen/better-react-swiper?style=for-the-badge)](https://travis-ci.org/veksen/better-react-swiper)
[![Codecov](https://img.shields.io/codecov/c/github/veksen/better-react-swiper?style=for-the-badge&logo=codecov)](https://codecov.io/gh/veksen/better-react-swiper)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/better-react-swiper?style=for-the-badge)](https://unpkg.com/better-react-swiper@latest/dist/better-react-swiper.umd.production.js)

### Usage

```sh
# install with npm
npm i better-react-swiper
# install with yarn
yarn add better-react-swiper
```

```js
// import from NPM
import Swiper from 'better-react-swiper';
```

```jsx
// use within your component
<div className="wrapper" style={{ margin: '60px' }}>
  <Swiper
    items={[
      <img
        src="https://picsum.photos/300/200?image=1084"
        style={{ width: '100%' }}
      />,
      <img
        src="https://picsum.photos/300/200?image=1081"
        style={{ width: '100%' }}
      />,
      <img
        src="https://picsum.photos/300/200?image=1070"
        style={{ width: '100%' }}
      />,
      <img
        src="https://picsum.photos/300/200?image=1050"
        style={{ width: '100%' }}
      />,
    ]}
  />
</div>
```

### Demo

https://codesandbox.io/s/better-react-swiper-8g03n

### Options

`Swiper` takes props:

- `items: Array<any>`: array of items to be used in the slider - defaults to `[]`
- `itemsWide: number`: number of items to be shown on desktop - defaults to `3`
- `infinity: boolean`: if the slider jumps back to the beginning once it reaches the end - defaults to `false`
- `canvasStyle?: React.CSSProperties`: styles to be applied to the wrapper around items
- `canvasClassName?: string`: string to be applied to the wrapper around items
- `arrowStyle?: React.CSSProperties`: styles to be applied to the arrows
- `arrowClassName?: string`: string to be applied to the arrows
- `style?: React.CSSProperties`

```jsx
// example
import Swiper from 'better-react-swiper';

const Item = ({children}) => <div style={{ margin: '0 10px' }}>{children}</div>
const items = [1,2,3,4,5].map(number => <Item>{number}</Item>)

<Swiper
  items={items}
  itemsWide={4}
  infinity
  arrowStyle={{ background: "#f00" }}
/>
```

### Responsiveness

For the time being, the swiper reverts to 1 item wide at 767px. This size is calculated as an "element query", meaning, the size of the wrapper element, not the size of the window. The goal is to be configurable, in the near future.
