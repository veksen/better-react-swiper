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
})(this, function(e, t, i, a, n) {
  'use strict';
  var s = 'default' in t ? t.default : t;
  i = i && i.hasOwnProperty('default') ? i.default : i;
  var r = 'default' in n ? n.default : n;
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
    f = r.div`
  transition: 0.3s left;
  position: relative;
  width: ${e => 100 / e.itemsWide}%;
  flex: 0 0 ${e => 100 / e.itemsWide}%;
  display: flex;
`,
    u = r.div`
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

  ${f} {
    ${e =>
      o(e.media)
        ? n.css`
            width: 100%;
            flex-basis: 100%;
          `
        : null}
  }
`,
    m = ({
      items: e = [],
      itemsWide: n = 3,
      infinity: r = !1,
      canvasClassName: o,
      canvasStyle: d,
      arrowClassName: m,
      arrowStyle: x,
      style: g,
    }) => {
      const [h, b] = t.useState(0),
        [w, y] = t.useState(0),
        [$, v] = t.useState(null),
        [S, k] = t.useState(0),
        z = () => (S <= 767 ? 1 : n),
        E = () => (r && e.length > 1) || 0 !== h,
        N = () => {
          const t = z();
          return (r && e.length > 1) || h < e.length - t;
        },
        W = () => {
          if (!E()) return;
          const t = z(),
            i = 0 === h ? t : 1,
            a = (e.length + h - i) % e.length;
          b(a);
        },
        q = () => {
          if (!N()) return;
          const t = z(),
            i = e.length - h > t ? 1 : t,
            a = (e.length + h + i) % e.length;
          b(a);
        },
        C = () => {
          const e = new Date().getTime();
          y(0), v(e);
        },
        R = e.length <= n;
      return s.createElement(
        i,
        {
          handleWidth: !0,
          onResize: e => {
            k(e), C();
          },
        },
        s.createElement(
          u,
          {
            style: g,
            media: (() => (S <= 576 ? 'xs' : S <= 767 ? 'sm' : 'md'))(),
          },
          !R &&
            s.createElement(
              c,
              {
                'data-testid': 'prev',
                faded: !E(),
                onClick: W,
                className: m,
                style: x,
              },
              '◀'
            ),
          s.createElement(
            a.Swipeable,
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
            s.createElement(
              l,
              { className: o, style: d },
              e.map((e, t) =>
                s.createElement(
                  f,
                  {
                    key: t,
                    itemsWide: z(),
                    currentIndex: h,
                    'data-testid': 'item',
                    style: { left: `-${(100 * h) / z() + w}%` },
                  },
                  e
                )
              )
            )
          ),
          !R &&
            s.createElement(
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
      );
    };
  (e.Swiper = m), (e.default = m);
});
//# sourceMappingURL=better-react-swiper.umd.production.js.map
