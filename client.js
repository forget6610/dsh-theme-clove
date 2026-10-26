// Browser half of the Clove theme plugin.
//
// dsh's web loader imports this through the package "./client" export and
// registers the returned exports as a cordis plugin. This file only does the
// skin: design tokens, wallpaper, card/scrollbar styling. The character lives
// in the separate dsh-pet-clove plugin.

window.__ModuleLoader__.load({
  id: 'dsh-theme-clove',
  factory: () => {
    var module = { exports: {} };
    var exports = module.exports;

    function pair(color) {
      return { light: color, dark: color };
    }

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
`;

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
    }

    exports.inject = ['theme'];
    exports.apply = apply;
    return module.exports;
  },
});
