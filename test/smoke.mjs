// 零依赖冒烟测试：在最小 DOM stub 里加载浏览器半区，验证
//   1) bundle 结构（id / inject / apply）
//   2) token 覆盖、CSS 注入、DOM 标记
//   3) 角色挂载（img 素材、光晕、气泡）、点击说话、晃动定时器、鼠标视差
//   4) 卸载清理（样式 / 角色 / 定时器 / 事件监听全部回收）
// 用法：node test/smoke.mjs   （或 npm test）
import assert from 'node:assert/strict';

class ClassList {
  constructor() {
    this.set = new Set();
  }
  add(...names) {
    names.forEach((n) => this.set.add(n));
  }
  remove(...names) {
    names.forEach((n) => this.set.delete(n));
  }
  contains(name) {
    return this.set.has(name);
  }
}

class Style {
  constructor() {
    this.props = {};
  }
  setProperty(key, value) {
    this.props[key] = value;
  }
  getPropertyValue(key) {
    return this.props[key] ?? '';
  }
}

class El {
  constructor(tagName) {
    this.tagName = tagName;
    this.children = [];
    this.parentNode = null;
    this.classList = new ClassList();
    this.attrs = {};
    this.listeners = new Map();
    this.textContent = '';
    this.style = new Style();
    this._className = '';
  }
  set className(value) {
    this._className = String(value);
    this.classList = new ClassList();
    this._className.split(/\s+/).filter(Boolean).forEach((c) => this.classList.add(c));
  }
  get className() {
    return this._className;
  }
  setAttribute(key, value) {
    this.attrs[key] = String(value);
  }
  removeAttribute(key) {
    delete this.attrs[key];
  }
  appendChild(node) {
    node.parentNode = this;
    this.children.push(node);
    return node;
  }
  addEventListener(type, fn) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(fn);
  }
  removeEventListener(type, fn) {
    this.listeners.set(type, (this.listeners.get(type) || []).filter((f) => f !== fn));
  }
  dispatch(type, event = {}) {
    (this.listeners.get(type) || []).slice().forEach((fn) => fn(event));
  }
  remove() {
    if (!this.parentNode) return;
    this.parentNode.children = this.parentNode.children.filter((c) => c !== this);
    this.parentNode = null;
  }
  get offsetWidth() {
    return 120;
  }
}

const walk = (node, fn) => {
  fn(node);
  node.children.forEach((child) => walk(child, fn));
};

let nextTimer = 1;
const timeouts = new Map();
let rafSeq = 1;
const rafs = new Map();
const windowListeners = new Map();

globalThis.window = {
  innerWidth: 1440,
  innerHeight: 900,
  __ModuleLoader__: {
    load(spec) {
      globalThis.__spec = spec;
    },
  },
  setTimeout(fn) {
    const id = nextTimer++;
    timeouts.set(id, fn);
    return id;
  },
  clearTimeout(id) {
    timeouts.delete(id);
  },
  requestAnimationFrame(fn) {
    const id = rafSeq++;
    rafs.set(id, fn);
    return id;
  },
  cancelAnimationFrame(id) {
    rafs.delete(id);
  },
  matchMedia() {
    return { matches: false };
  },
  addEventListener(type, fn) {
    if (!windowListeners.has(type)) windowListeners.set(type, []);
    windowListeners.get(type).push(fn);
  },
  removeEventListener(type, fn) {
    windowListeners.set(type, (windowListeners.get(type) || []).filter((f) => f !== fn));
  },
};

class Doc {
  constructor() {
    this.head = new El('head');
    this.body = new El('body');
    this.documentElement = new El('html');
    this.hidden = false;
  }
  createElement(tag) {
    return new El(tag);
  }
  querySelector(selector) {
    if (!selector.startsWith('.')) return null;
    const cls = selector.slice(1);
    let found = null;
    walk(this.body, (node) => {
      if (!found && node.classList.contains(cls)) found = node;
    });
    return found;
  }
}

const document = new Doc();
globalThis.document = document;

await import('../client.js');

const spec = globalThis.__spec;
assert.ok(spec, 'ModuleLoader.load 未被调用');
assert.equal(spec.id, 'dsh-theme-clove');

const plugin = spec.factory(() => ({}));
assert.deepEqual(plugin.inject, ['theme']);
assert.equal(typeof plugin.apply, 'function');

const disposers = [];
let tokenThemeId = null;
const ctx = {
  theme: {
    overrideTokens(id, tokens) {
      tokenThemeId = id;
      ctx.__tokens = tokens;
      return () => {
        ctx.__tokenDisposed = true;
      };
    },
  },
  effect(fn) {
    const dispose = fn();
    if (typeof dispose === 'function') disposers.push(dispose);
  },
};

plugin.apply(ctx);

assert.equal(tokenThemeId, 'clove');
assert.equal(Object.keys(ctx.__tokens).length, 33, 'token 数量与预期不符');
assert.equal(document.documentElement.attrs['data-clove-theme'], 'on');
assert.ok(document.head.children.some((el) => el.id === 'dsh-clove-theme'), '缺少样式标签');

const mascot = document.querySelector('.dsh-clove-mascot');
assert.ok(mascot, '角色没有被挂载');
const nodes = [];
walk(mascot, (node) => nodes.push(node));
const btn = nodes.find((n) => n.classList.contains('dsh-clove-btn'));
const bubble = nodes.find((n) => n.classList.contains('dsh-clove-bubble'));
const glow = nodes.find((n) => n.classList.contains('dsh-clove-glow'));
const img = nodes.find((n) => n.classList.contains('dsh-clove-img'));
assert.ok(btn && bubble && glow && img, '角色 DOM 结构不完整');
assert.equal(img.attrs['src'], '/dsh-clove-bg/mascot.png', '角色图路径不对');
assert.equal(img.tagName, 'img');
assert.ok(btn.attrs['aria-label'], '缺少无障碍标签');

assert.ok(timeouts.size > 0, '缺少待触发的动画/台词定时器');
assert.ok(windowListeners.get('mousemove')?.length === 1, '缺少鼠标视差监听');

// 视差
windowListeners.get('mousemove')[0]({ clientX: 1440, clientY: 900 });
assert.equal(rafs.size, 1, '视差未走 requestAnimationFrame');
[...rafs.values()][0]();
assert.ok(mascot.style.getPropertyValue('--clove-px').endsWith('px'), '视差变量未写入');
assert.ok(mascot.style.getPropertyValue('--clove-py').endsWith('px'), '视差变量未写入');

// 点击：跳跃 + 气泡
btn.dispatch('click');
assert.ok(bubble.classList.contains('is-visible'), '气泡未显示');
assert.ok(bubble.textContent.length > 0, '气泡没有台词');
assert.ok(mascot.classList.contains('is-hop'), '点击未触发跳跃动画');

disposers.forEach((fn) => fn());

assert.equal(ctx.__tokenDisposed, true, 'token 未回收');
assert.equal(document.querySelector('.dsh-clove-mascot'), null, '角色 DOM 未移除');
assert.ok(!document.head.children.some((el) => el.id === 'dsh-clove-theme'), '样式标签未移除');
assert.equal(timeouts.size, 0, '定时器未清理');
assert.equal(windowListeners.get('mousemove')?.length ?? 0, 0, '鼠标监听未移除');
assert.equal(document.documentElement.attrs['data-clove-theme'], undefined, '根属性未移除');

console.log('smoke ok: bundle / tokens(33) / CSS / img mascot / click bubble / parallax / cleanup');
