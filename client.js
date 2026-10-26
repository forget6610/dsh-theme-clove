// Browser half of the Clove theme plugin.
//
// dsh's web loader imports this file through the package "./client" export and
// registers whatever apply/inject we attach to the module exports, so this is a
// hand-written bundle rather than an ES module.

window.__ModuleLoader__.load({
  id: 'dsh-theme-clove',
  factory: () => {
    var module = { exports: {} };
    var exports = module.exports;

    var MASCOT_SRC = '/dsh-clove-bg/mascot.png';

    var LINES = [
      '他们惨败的样子真滑稽。',
      '死一下而已，又不是第一次。',
      '烟雾里见的，才算朋友。',
      '来点恶作剧？',
      '蝴蝶飞走之前，记得看我一眼。',
    ];

    function pair(color) {
      return { light: color, dark: color };
    }

    // Surfaces go transparent so the wallpaper shows through; pink carries the
    // accents, violet handles the quieter bits.
    var TOKENS = {
      '--dsw-alias-bg-base': pair('rgba(8, 4, 15, 0)'),
      '--dsw-alias-bg-layer-1': pair('rgba(14, 8, 26, 0.72)'),
      '--dsw-alias-bg-layer-2': pair('rgba(18, 10, 32, 0.78)'),
      '--dsw-alias-bg-layer-3': pair('rgba(22, 12, 38, 0.86)'),
      '--dsw-alias-bg-overlay': pair('rgba(10, 5, 18, 0.92)'),
      '--dsw-alias-bg-module-platform': pair('rgba(255, 255, 255, 0.07)'),
      '--dsw-alias-bg-multi-select': pair('rgba(244, 114, 182, 0.16)'),
      '--dsw-alias-border-l1': pair('rgba(244, 114, 182, 0.16)'),
      '--dsw-alias-border-l2': pair('rgba(244, 114, 182, 0.26)'),
      '--dsw-alias-border-l3': pair('rgba(244, 114, 182, 0.34)'),
      '--dsw-alias-brand-primary': pair('#F472B6'),
      '--dsw-alias-label-primary': pair('#FDF2F8'),
      '--dsw-alias-label-secondary': pair('#E9D5FF'),
      '--dsw-alias-label-tertiary': pair('#F9A8D4'),
      '--dsw-alias-label-caption': pair('#B8A5D0'),
      '--dsw-alias-label-primary-dimmed': pair('#F0ABFC'),
      '--dsw-alias-state-business-primary': pair('#F472B6'),
      '--dsw-alias-state-business-tertiary': pair('rgba(244, 114, 182, 0.16)'),
      '--dsw-alias-state-error-primary': pair('#FB7185'),
      '--dsw-alias-state-success-primary': pair('#5EEAD4'),
      '--dsw-alias-state-warn-primary': pair('#FBBF24'),
      '--dsw-alias-markdown-inline-code': pair('rgba(244, 114, 182, 0.14)'),
      '--dsw-alias-markdown-code-block': pair('rgba(12, 6, 24, 0.6)'),
      '--dsw-specific-sidebar-fill': pair('rgba(12, 7, 22, 0.5)'),
      '--dsw-specific-sidebar-nav-item-hover': pair('rgba(255, 255, 255, 0.07)'),
      '--dsw-specific-sidebar-nav-item-active': pair('rgba(244, 114, 182, 0.16)'),
      '--dsw-specific-input-major': pair('rgba(14, 8, 26, 0.82)'),
      '--dsw-specific-bubble': pair('rgba(20, 11, 36, 0.78)'),
      '--dsw-specific-tip': pair('rgba(14, 8, 26, 0.9)'),
      '--dsw-specific-menu': pair('rgba(26, 14, 46, 0.96)'),
      '--dsw-alias-scrollbar-bg-l2': pair('rgba(244, 114, 182, 0.36)'),
      '--dsw-alias-scrollbar-hover-l2': pair('rgba(244, 114, 182, 0.62)'),
      '--dsw-shadow-lv2': pair('0 10px 30px rgba(0, 0, 0, 0.34)'),
    };

    var CSS = `
html { background-color: transparent !important; }
body {
  background-image: linear-gradient(180deg, rgba(8, 4, 15, 0.26) 0%, rgba(8, 4, 15, 0.06) 42%, rgba(8, 4, 15, 0.30) 100%), url('/dsh-clove-bg/wallpaper.jpg') !important;
  background-size: cover, cover !important;
  background-position: center, center !important;
  background-attachment: fixed, fixed !important;
  background-repeat: no-repeat, no-repeat !important;
  -webkit-font-smoothing: antialiased;
}
::selection { background: rgba(244, 114, 182, 0.35); color: #FDF2F8; }

[data-composer-card] {
  border-radius: 22px !important;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35), inset 0 0 0 1px rgba(244, 114, 182, 0.12) !important;
}
[data-chat-flow] { border-radius: 16px; }

* { scrollbar-width: thin; scrollbar-color: rgba(244, 114, 182, 0.38) rgba(14, 8, 26, 0.40); }
*::-webkit-scrollbar { width: 10px; height: 10px; }
*::-webkit-scrollbar-track { background: rgba(14, 8, 26, 0.40); }
*::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #F472B6, #8B5CF6);
  border-radius: 6px;
  border: 2px solid rgba(14, 8, 26, 0.6);
  background-clip: padding-box;
}
*::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #F9A8D4, #A78BFA);
  border: 2px solid rgba(14, 8, 26, 0.6);
  background-clip: padding-box;
}
*::-webkit-scrollbar-corner { background: transparent; }

.dsh-clove-mascot {
  position: fixed;
  right: 18px;
  bottom: 92px;
  width: var(--clove-size, 200px);
  z-index: 40;
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
  transform: translate3d(var(--clove-px, 0px), var(--clove-py, 0px), 0);
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.dsh-clove-float {
  position: relative;
  animation: clove-float 6.4s ease-in-out infinite;
  transform-origin: 50% 100%;
}
.dsh-clove-glow {
  position: absolute;
  left: 50%;
  top: 56%;
  width: 158%;
  height: 132%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(192, 132, 252, 0.42), rgba(244, 114, 182, 0.18) 46%, rgba(244, 114, 182, 0) 74%);
  filter: blur(12px);
  animation: clove-glow 4.6s ease-in-out infinite;
  pointer-events: none;
}
.dsh-clove-btn {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  cursor: pointer;
  transform-origin: 50% 100%;
  animation: clove-breath 4.6s ease-in-out infinite;
  -webkit-tap-highlight-color: transparent;
}
.dsh-clove-btn:focus-visible { outline: 2px solid rgba(244, 114, 182, 0.6); outline-offset: 6px; border-radius: 18px; }
.dsh-clove-img {
  display: block;
  width: 100%;
  height: auto;
  -webkit-user-drag: none;
  filter: drop-shadow(0 12px 26px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 18px rgba(244, 114, 182, 0.28));
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.dsh-clove-btn:hover .dsh-clove-img { transform: scale(1.04) rotate(-1.2deg); }
.dsh-clove-mascot.is-hop .dsh-clove-float { animation: clove-hop 0.8s cubic-bezier(0.32, 0.72, 0.35, 1); }
.dsh-clove-mascot.is-wiggle .dsh-clove-float { animation: clove-wiggle 0.95s ease-in-out; }

.dsh-clove-bubble {
  position: absolute;
  right: 78%;
  bottom: 56%;
  max-width: 190px;
  width: max-content;
  padding: 8px 11px;
  border-radius: 12px 12px 4px 12px;
  background: rgba(28, 16, 48, 0.94);
  border: 1px solid rgba(244, 114, 182, 0.32);
  color: #FDF2F8;
  font-size: 12px;
  line-height: 1.55;
  letter-spacing: 0.02em;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  opacity: 0;
  transform: translateY(6px) scale(0.96);
  transform-origin: 100% 100%;
  transition: opacity 0.18s ease, transform 0.18s ease;
  pointer-events: none;
}
.dsh-clove-bubble.is-visible { opacity: 1; transform: translateY(0) scale(1); }

@keyframes clove-float {
  0%, 100% { transform: translateY(0) rotate(-0.8deg); }
  50% { transform: translateY(-8px) rotate(0.8deg); }
}
@keyframes clove-breath { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.015); } }
@keyframes clove-glow {
  0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(0.96); }
  50% { opacity: 0.95; transform: translate(-50%, -50%) scale(1.04); }
}
@keyframes clove-hop {
  0% { transform: translateY(0) rotate(0deg) scale(1); }
  28% { transform: translateY(-20px) rotate(-4deg) scale(1.02, 0.98); }
  62% { transform: translateY(0) rotate(0deg) scale(0.98, 1.03); }
  80% { transform: translateY(-6px) rotate(2deg) scale(1.01, 0.99); }
  100% { transform: translateY(0) rotate(0deg) scale(1); }
}
@keyframes clove-wiggle {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(-2.6deg); }
  45% { transform: rotate(2.2deg); }
  70% { transform: rotate(-1.4deg); }
}

@media (max-width: 900px) {
  .dsh-clove-mascot { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .dsh-clove-float,
  .dsh-clove-btn,
  .dsh-clove-glow,
  .dsh-clove-mascot.is-hop .dsh-clove-float,
  .dsh-clove-mascot.is-wiggle .dsh-clove-float { animation: none !important; }
  .dsh-clove-mascot { transition: none; }
}
`;

    function replayClass(el, className, ms, timers) {
      el.classList.remove(className);
      void el.offsetWidth;
      el.classList.add(className);
      timers.push(window.setTimeout(() => el.classList.remove(className), ms));
    }

    function mountMascot() {
      if (document.querySelector('.dsh-clove-mascot')) return () => {};

      var host = document.createElement('div');
      host.className = 'dsh-clove-mascot';
      host.setAttribute('data-plugin', 'dsh-theme-clove');

      var float = document.createElement('div');
      float.className = 'dsh-clove-float';

      var glow = document.createElement('div');
      glow.className = 'dsh-clove-glow';

      var bubble = document.createElement('div');
      bubble.className = 'dsh-clove-bubble';
      bubble.setAttribute('role', 'status');
      bubble.setAttribute('aria-live', 'polite');

      var button = document.createElement('button');
      button.className = 'dsh-clove-btn';
      button.setAttribute('type', 'button');
      button.setAttribute('title', '暮蝶 · Clove');
      button.setAttribute('aria-label', '暮蝶，点我说话');

      var img = document.createElement('img');
      img.className = 'dsh-clove-img';
      img.setAttribute('src', MASCOT_SRC);
      img.setAttribute('alt', '暮蝶 · Clove');
      img.setAttribute('draggable', 'false');

      button.appendChild(img);
      float.appendChild(glow);
      float.appendChild(bubble);
      float.appendChild(button);
      host.appendChild(float);
      (document.body || document.documentElement).appendChild(host);

      var timers = [];
      var line = 0;
      var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      function say() {
        bubble.textContent = LINES[line++ % LINES.length];
        bubble.classList.add('is-visible');
        timers.push(window.setTimeout(() => bubble.classList.remove('is-visible'), 4200));
      }

      button.addEventListener('click', () => {
        replayClass(host, 'is-hop', 820, timers);
        say();
      });

      // A missing mascot image shouldn't leave a broken button behind.
      img.addEventListener('error', () => host.remove(), { once: true });

      var wiggleTimer = null;
      function scheduleWiggle() {
        wiggleTimer = window.setTimeout(() => {
          if (!document.hidden) replayClass(host, 'is-wiggle', 980, timers);
          scheduleWiggle();
        }, 6000 + Math.round(Math.random() * 5000));
      }

      var moveHandler = null;
      var frame = null;
      if (!reduced && window.innerWidth > 900) {
        moveHandler = (event) => {
          if (frame !== null) return;
          frame = window.requestAnimationFrame(() => {
            frame = null;
            var dx = ((event.clientX / window.innerWidth - 0.5) * -10).toFixed(1);
            var dy = ((event.clientY / window.innerHeight - 0.5) * -6).toFixed(1);
            host.style.setProperty('--clove-px', dx + 'px');
            host.style.setProperty('--clove-py', dy + 'px');
          });
        };
        window.addEventListener('mousemove', moveHandler, { passive: true });
      }

      if (!reduced) {
        scheduleWiggle();
        timers.push(window.setTimeout(say, 2400));
      }

      return () => {
        if (wiggleTimer !== null) window.clearTimeout(wiggleTimer);
        if (moveHandler) window.removeEventListener('mousemove', moveHandler);
        if (frame !== null) window.cancelAnimationFrame(frame);
        timers.forEach((id) => window.clearTimeout(id));
        timers.length = 0;
        host.remove();
      };
    }

    function apply(ctx) {
      var disposeTokens = ctx.theme.overrideTokens('clove', TOKENS);
      ctx.effect(() => disposeTokens);

      var style = document.createElement('style');
      style.id = 'dsh-clove-theme';
      style.setAttribute('data-plugin', 'dsh-theme-clove');
      style.textContent = CSS;
      (document.head || document.documentElement).appendChild(style);
      ctx.effect(() => () => style.remove());

      document.documentElement.setAttribute('data-clove-theme', 'on');
      ctx.effect(() => () => document.documentElement.removeAttribute('data-clove-theme'));
      ctx.effect(mountMascot);
    }

    exports.inject = ['theme'];
    exports.apply = apply;
    return module.exports;
  },
});
