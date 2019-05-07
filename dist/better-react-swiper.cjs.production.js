'use strict';
function e(e) {
  return e && 'object' == typeof e && 'default' in e ? e.default : e;
}
var t = require('react'),
  a = e(t),
  i = e(require('react-resize-detector')),
  s = require('react-swipeable'),
  n = require('styled-components'),
  o = e(n);
const r = e => 'xs' === e || 'sm' === e,
  l = o.div`
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
  c = n.css`
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
  ${c};
  opacity: ${e => (e.faded ? 0.25 : 1)};
  left: 10px;
`,
  p = o.button`
  ${c};
  opacity: ${e => (e.faded ? 0.25 : 1)};
  right: 10px;
`,
  m = o.div`
  transition: 0.3s left;
  position: relative;
  width: ${e => 100 / e.itemsWide}%;
  flex: 0 0 ${e => 100 / e.itemsWide}%;
  display: flex;
`,
  u = o.div`
  position: relative;

  ${l} {
    ${e =>
      r(e.media)
        ? n.css`
            width: calc(100% - 80px);
            padding: 0 40px;
          `
        : null}
  }

  ${d} {
    ${e =>
      r(e.media)
        ? n.css`
            left: 5px;
          `
        : null}
  }

  ${p} {
    ${e =>
      r(e.media)
        ? n.css`
            right: 5px;
          `
        : null}
  }

  ${m} {
    ${e =>
      r(e.media)
        ? n.css`
            width: 100%;
            flex-basis: 100%;
          `
        : null}
  }
`;
exports.default = ({
  items: e = [],
  itemsWide: n = 3,
  infinity: o = !1,
  canvasClassName: r,
  canvasStyle: c,
  arrowClassName: x,
  arrowStyle: g,
  style: f,
}) => {
  const [b, h] = t.useState(0),
    [w, y] = t.useState(0),
    [$, v] = t.useState(null),
    [S, k] = t.useState(0),
    E = () => (S <= 767 ? 1 : n),
    z = () => (o && e.length > 1) || 0 !== b,
    N = () => {
      const t = E();
      return (o && e.length > 1) || b < e.length - t;
    },
    W = () => {
      const t = E(),
        a = 0 === b ? t : 1,
        i = (e.length + b - a) % e.length;
      h(z() ? i : b);
    },
    q = () => {
      const t = E(),
        a = e.length - b > t ? 1 : t,
        i = (e.length + b + a) % e.length;
      h(N() ? i : b);
    },
    C = () => {
      const e = new Date().getTime();
      y(0), v(e);
    };
  return (
    console.log('v2'),
    a.createElement(
      i,
      {
        handleWidth: !0,
        onResize: e => {
          k(e);
        },
      },
      a.createElement(
        u,
        {
          style: f,
          media: (() => (S <= 576 ? 'xs' : S <= 767 ? 'sm' : 'md'))(),
        },
        a.createElement(
          d,
          {
            'data-testid': 'prev',
            faded: !z(),
            onClick: W,
            className: x,
            style: g,
          },
          '◀abc'
        ),
        a.createElement(
          s.Swipeable,
          Object.assign(
            {
              onSwiping: e =>
                (e => {
                  const t = new Date().getTime();
                  if (!S) return;
                  if ($ && t - $ < 250) return;
                  const a = (2 * e.deltaX) / S;
                  y(100 * a),
                    a < -0.3333 && (C(), q()),
                    a > 0.3333 && (C(), W());
                })(e),
              onSwiped: () => {
                y(0);
              },
            },
            { trackTouch: !0, trackMouse: !0 }
          ),
          'defs',
          a.createElement(
            l,
            { className: r, style: c },
            e.map((e, t) =>
              a.createElement(
                m,
                {
                  key: t,
                  itemsWide: E(),
                  currentIndex: b,
                  'data-testid': 'item',
                  style: { left: `-${(100 * b) / E() - w}%` },
                },
                e
              )
            )
          )
        ),
        a.createElement(
          p,
          {
            'data-testid': 'next',
            faded: !N(),
            onClick: q,
            className: x,
            style: g,
          },
          '▶'
        )
      )
    )
  );
};
//# sourceMappingURL=better-react-swiper.cjs.production.js.map
