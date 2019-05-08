import e, { useState as t } from 'react';
import i from 'react-resize-detector';
import { Swipeable as a } from 'react-swipeable';
import n, { css as o } from 'styled-components';
const r = e => 'xs' === e || 'sm' === e,
  l = n.div`
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
`,
  s = o`
  box-sizing: content-box;
  cursor: pointer;
  background: #fff;
  border: 0;
  color: ${'#105783'};
  border-radius: 4px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  margin-top: -15px;
  z-index: 1;
  transition: 0.3s opacity;
`,
  d = n.button`
  ${s};
  opacity: ${e => (e.faded ? 0.25 : 1)};
  left: 10px;
`,
  p = n.button`
  ${s};
  opacity: ${e => (e.faded ? 0.25 : 1)};
  right: 10px;
`,
  c = n.div`
  transition: 0.3s left;
  position: relative;
  width: ${e => 100 / e.itemsWide}%;
  flex: 0 0 ${e => 100 / e.itemsWide}%;
  display: flex;
`,
  m = n.div`
  position: relative;

  ${l} {
    ${e =>
      r(e.media)
        ? o`
            width: calc(100% - 80px);
            padding: 0 40px;
          `
        : null}
  }

  ${d} {
    ${e =>
      r(e.media)
        ? o`
            left: 5px;
          `
        : null}
  }

  ${p} {
    ${e =>
      r(e.media)
        ? o`
            right: 5px;
          `
        : null}
  }

  ${c} {
    ${e =>
      r(e.media)
        ? o`
            width: 100%;
            flex-basis: 100%;
          `
        : null}
  }
`,
  x = ({
    items: n = [],
    itemsWide: o = 3,
    infinity: r = !1,
    canvasClassName: s,
    canvasStyle: x,
    arrowClassName: g,
    arrowStyle: f,
    style: h,
  }) => {
    const [u, b] = t(0),
      [w, y] = t(0),
      [$, v] = t(null),
      [k, E] = t(0),
      z = () => (k <= 767 ? 1 : o),
      N = () => (r && n.length > 1) || 0 !== u,
      W = () => {
        const e = z();
        return (r && n.length > 1) || u < n.length - e;
      },
      C = () => {
        if (!N()) return;
        const e = z(),
          t = 0 === u ? e : 1,
          i = (n.length + u - t) % n.length;
        b(i);
      },
      S = () => {
        if (!W()) return;
        const e = z(),
          t = n.length - u > e ? 1 : e,
          i = (n.length + u + t) % n.length;
        b(i);
      },
      T = () => {
        const e = new Date().getTime();
        y(0), v(e);
      },
      D = n.length <= o;
    return e.createElement(
      i,
      {
        handleWidth: !0,
        onResize: e => {
          E(e), T();
        },
      },
      e.createElement(
        m,
        {
          style: h,
          media: (() => (k <= 576 ? 'xs' : k <= 767 ? 'sm' : 'md'))(),
        },
        !D &&
          e.createElement(
            d,
            {
              'data-testid': 'prev',
              faded: !N(),
              onClick: C,
              className: g,
              style: f,
            },
            '◀'
          ),
        e.createElement(
          a,
          Object.assign(
            {
              onSwiping: e =>
                (e => {
                  const t = new Date().getTime();
                  if (!k) return;
                  if ($ && t - $ < 250) return;
                  const i = (2 * e.deltaX) / k;
                  return (
                    y(100 * i),
                    i < -0.3333
                      ? (T(), void C())
                      : i > 0.3333
                      ? (T(), void S())
                      : void 0
                  );
                })(e),
              onSwiped: () => {
                y(0);
              },
            },
            { trackTouch: !0, trackMouse: !0 }
          ),
          e.createElement(
            l,
            { className: s, style: x },
            n.map((t, i) =>
              e.createElement(
                c,
                {
                  key: i,
                  itemsWide: z(),
                  currentIndex: u,
                  'data-testid': 'item',
                  style: { left: `-${(100 * u) / z() + w}%` },
                },
                t
              )
            )
          )
        ),
        !D &&
          e.createElement(
            p,
            {
              'data-testid': 'next',
              faded: !W(),
              onClick: S,
              className: g,
              style: f,
            },
            '▶'
          )
      )
    );
  };
export default x;
export { x as Swiper };
//# sourceMappingURL=better-react-swiper.es.production.js.map
