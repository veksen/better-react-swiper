import e, { useState as t } from 'react';
import i from 'react-resize-detector';
import { Swipeable as a } from 'react-swipeable';
import o, { css as n } from 'styled-components';
const l = e => 'xs' === e || 'sm' === e,
  r = o.div`
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
  s = n`
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
  d = o.button`
  ${s};
  opacity: ${e => (e.faded ? 0.25 : 1)};
  left: 10px;
`,
  c = o.button`
  ${s};
  opacity: ${e => (e.faded ? 0.25 : 1)};
  right: 10px;
`,
  p = o.div`
  transition: 0.3s left;
  position: relative;
  width: ${e => 100 / e.itemsWide}%;
  flex: 0 0 ${e => 100 / e.itemsWide}%;
  display: flex;
`,
  m = o.div`
  position: relative;

  ${r} {
    ${e =>
      l(e.media)
        ? n`
            width: calc(100% - 80px);
            padding: 0 40px;
          `
        : null}
  }

  ${d} {
    ${e =>
      l(e.media)
        ? n`
            left: 5px;
          `
        : null}
  }

  ${c} {
    ${e =>
      l(e.media)
        ? n`
            right: 5px;
          `
        : null}
  }

  ${p} {
    ${e =>
      l(e.media)
        ? n`
            width: 100%;
            flex-basis: 100%;
          `
        : null}
  }
`;
export default ({
  items: o = [],
  itemsWide: n = 3,
  infinity: l = !1,
  canvasClassName: s,
  canvasStyle: x,
  arrowClassName: g,
  arrowStyle: f,
  style: h,
}) => {
  const [b, u] = t(0),
    [w, y] = t(0),
    [$, v] = t(null),
    [k, E] = t(0),
    z = () => (k <= 767 ? 1 : n),
    N = () => (l && o.length > 1) || 0 !== b,
    W = () => {
      const e = z();
      return (l && o.length > 1) || b < o.length - e;
    },
    C = () => {
      const e = z(),
        t = 0 === b ? e : 1,
        i = (o.length + b - t) % o.length;
      u(N() ? i : b);
    },
    S = () => {
      const e = z(),
        t = o.length - b > e ? 1 : e,
        i = (o.length + b + t) % o.length;
      u(W() ? i : b);
    },
    T = () => {
      const e = new Date().getTime();
      y(0), v(e);
    };
  return (
    console.log('v2'),
    e.createElement(
      i,
      {
        handleWidth: !0,
        onResize: e => {
          E(e);
        },
      },
      e.createElement(
        m,
        {
          style: h,
          media: (() => (k <= 576 ? 'xs' : k <= 767 ? 'sm' : 'md'))(),
        },
        e.createElement(
          d,
          {
            'data-testid': 'prev',
            faded: !N(),
            onClick: C,
            className: g,
            style: f,
          },
          '◀abc'
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
                  y(100 * i),
                    i < -0.3333 && (T(), S()),
                    i > 0.3333 && (T(), C());
                })(e),
              onSwiped: () => {
                y(0);
              },
            },
            { trackTouch: !0, trackMouse: !0 }
          ),
          'defs',
          e.createElement(
            r,
            { className: s, style: x },
            o.map((t, i) =>
              e.createElement(
                p,
                {
                  key: i,
                  itemsWide: z(),
                  currentIndex: b,
                  'data-testid': 'item',
                  style: { left: `-${(100 * b) / z() - w}%` },
                },
                t
              )
            )
          )
        ),
        e.createElement(
          c,
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
    )
  );
};
//# sourceMappingURL=better-react-swiper.es.production.js.map
