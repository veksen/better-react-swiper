'use strict';
function e(e) {
  return e && 'object' == typeof e && 'default' in e ? e.default : e;
}
var t = require('react'),
  i = e(t),
  a = e(require('react-resize-detector')),
  s = require('react-swipeable'),
  n = require('styled-components'),
  r = e(n);
const o = e => 'xs' === e || 'sm' === e,
  l = r.div`
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
  d = n.css`
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
  c = r.button`
  ${d};
  opacity: ${e => (e.faded ? 0.25 : 1)};
  left: 10px;
`,
  p = r.button`
  ${d};
  opacity: ${e => (e.faded ? 0.25 : 1)};
  right: 10px;
`,
  u = r.div`
  transition: 0.3s left;
  position: relative;
  width: ${e => 100 / e.itemsWide}%;
  flex: 0 0 ${e => 100 / e.itemsWide}%;
  display: flex;
`,
  m = r.div`
  position: relative;

  ${l} {
    ${e =>
      o(e.media)
        ? n.css`
            width: calc(100% - 80px);
            padding: 0 40px;
          `
        : null}
  }

  ${c} {
    ${e =>
      o(e.media)
        ? n.css`
            left: 5px;
          `
        : null}
  }

  ${p} {
    ${e =>
      o(e.media)
        ? n.css`
            right: 5px;
          `
        : null}
  }

  ${u} {
    ${e =>
      o(e.media)
        ? n.css`
            width: 100%;
            flex-basis: 100%;
          `
        : null}
  }
`,
  x = ({
    items: e = [],
    itemsWide: n = 3,
    infinity: r = !1,
    canvasClassName: o,
    canvasStyle: d,
    arrowClassName: x,
    arrowStyle: g,
    style: f,
  }) => {
    const [h, b] = t.useState(0),
      [w, y] = t.useState(0),
      [$, v] = t.useState(null),
      [S, k] = t.useState(0),
      E = () => (S <= 767 ? 1 : n),
      z = () => (r && e.length > 1) || 0 !== h,
      N = () => {
        const t = E();
        return (r && e.length > 1) || h < e.length - t;
      },
      W = () => {
        if (!z()) return;
        const t = E(),
          i = 0 === h ? t : 1,
          a = (e.length + h - i) % e.length;
        b(a);
      },
      q = () => {
        if (!N()) return;
        const t = E(),
          i = e.length - h > t ? 1 : t,
          a = (e.length + h + i) % e.length;
        b(a);
      },
      C = () => {
        const e = new Date().getTime();
        y(0), v(e);
      },
      T = e.length <= n;
    return i.createElement(
      a,
      {
        handleWidth: !0,
        onResize: e => {
          k(e), C();
        },
      },
      i.createElement(
        m,
        {
          style: f,
          media: (() => (S <= 576 ? 'xs' : S <= 767 ? 'sm' : 'md'))(),
        },
        !T &&
          i.createElement(
            c,
            {
              'data-testid': 'prev',
              faded: !z(),
              onClick: W,
              className: x,
              style: g,
            },
            '◀'
          ),
        i.createElement(
          s.Swipeable,
          Object.assign(
            {
              onSwiping: e =>
                (e => {
                  const t = new Date().getTime();
                  if (!S) return;
                  if ($ && t - $ < 250) return;
                  const i = (2 * e.deltaX) / S;
                  return (
                    y(100 * i),
                    i < -0.3333
                      ? (C(), void W())
                      : i > 0.3333
                      ? (C(), void q())
                      : void 0
                  );
                })(e),
              onSwiped: () => {
                y(0);
              },
            },
            { trackTouch: !0, trackMouse: !0 }
          ),
          i.createElement(
            l,
            { className: o, style: d },
            e.map((e, t) =>
              i.createElement(
                u,
                {
                  key: t,
                  itemsWide: E(),
                  currentIndex: h,
                  'data-testid': 'item',
                  style: { left: `-${(100 * h) / E() + w}%` },
                },
                e
              )
            )
          )
        ),
        !T &&
          i.createElement(
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
    );
  };
(exports.Swiper = x), (exports.default = x);
//# sourceMappingURL=better-react-swiper.cjs.production.js.map
