!(function(e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(
        exports,
        require('react'),
        require('react-resize-detector'),
        require('react-swipeable'),
        require('styled-components')
      )
    : 'function' == typeof define && define.amd
    ? define([
        'exports',
        'react',
        'react-resize-detector',
        'react-swipeable',
        'styled-components',
      ], t)
    : ((e = e || self),
      t(
        (e['better-react-swiper'] = {}),
        e.React,
        e.ReactResizeDetector,
        e.reactSwipeable,
        e.styled
      ));
})(this, function(e, t, a, i, s) {
  'use strict';
  var n = 'default' in t ? t.default : t;
  a = a && a.hasOwnProperty('default') ? a.default : a;
  var o = 'default' in s ? s.default : s;
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
    d = s.css`
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
    c = o.button`
  ${d};
  opacity: ${e => (e.faded ? 0.25 : 1)};
  left: 10px;
`,
    p = o.button`
  ${d};
  opacity: ${e => (e.faded ? 0.25 : 1)};
  right: 10px;
`,
    f = o.div`
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
        ? s.css`
            width: calc(100% - 80px);
            padding: 0 40px;
          `
        : null}
  }

  ${c} {
    ${e =>
      r(e.media)
        ? s.css`
            left: 5px;
          `
        : null}
  }

  ${p} {
    ${e =>
      r(e.media)
        ? s.css`
            right: 5px;
          `
        : null}
  }

  ${f} {
    ${e =>
      r(e.media)
        ? s.css`
            width: 100%;
            flex-basis: 100%;
          `
        : null}
  }
`;
  e.default = ({
    items: e = [],
    itemsWide: s = 3,
    infinity: o = !1,
    canvasClassName: r,
    canvasStyle: d,
    arrowClassName: m,
    arrowStyle: x,
    style: g,
  }) => {
    const [b, h] = t.useState(0),
      [w, y] = t.useState(0),
      [$, v] = t.useState(null),
      [S, k] = t.useState(0),
      z = () => (S <= 767 ? 1 : s),
      E = () => (o && e.length > 1) || 0 !== b,
      N = () => {
        const t = z();
        return (o && e.length > 1) || b < e.length - t;
      },
      W = () => {
        const t = z(),
          a = 0 === b ? t : 1,
          i = (e.length + b - a) % e.length;
        h(E() ? i : b);
      },
      q = () => {
        const t = z(),
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
      n.createElement(
        a,
        {
          handleWidth: !0,
          onResize: e => {
            k(e);
          },
        },
        n.createElement(
          u,
          {
            style: g,
            media: (() => (S <= 576 ? 'xs' : S <= 767 ? 'sm' : 'md'))(),
          },
          n.createElement(
            c,
            {
              'data-testid': 'prev',
              faded: !E(),
              onClick: W,
              className: m,
              style: x,
            },
            '◀abc'
          ),
          n.createElement(
            i.Swipeable,
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
            n.createElement(
              l,
              { className: r, style: d },
              e.map((e, t) =>
                n.createElement(
                  f,
                  {
                    key: t,
                    itemsWide: z(),
                    currentIndex: b,
                    'data-testid': 'item',
                    style: { left: `-${(100 * b) / z() - w}%` },
                  },
                  e
                )
              )
            )
          ),
          n.createElement(
            p,
            {
              'data-testid': 'next',
              faded: !N(),
              onClick: q,
              className: m,
              style: x,
            },
            '▶'
          )
        )
      )
    );
  };
});
//# sourceMappingURL=better-react-swiper.umd.production.js.map
