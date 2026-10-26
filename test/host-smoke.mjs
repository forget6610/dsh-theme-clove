// 宿主半区冒烟测试：验证壁纸与角色图两条路由能注册并真的返回字节。
// 用法：node test/host-smoke.mjs
import assert from 'node:assert/strict';

const host = (await import('../host.js')).default;

assert.deepEqual(host.inject, ['webServer']);
assert.equal(typeof host.apply, 'function');

const routes = [];
const effects = [];
host.apply({
  webServer: {
    register(spec) {
      routes.push(spec);
      return () => {};
    },
  },
  effect(fn) {
    const dispose = fn();
    if (typeof dispose === 'function') effects.push(dispose);
  },
});

assert.equal(routes.length, 2, '应注册两条素材路由');
assert.ok(effects.length >= 2, '路由应挂到插件 fiber 上以便回收');

for (const route of routes) {
  const chunks = [];
  const res = {
    headers: {},
    writeHead(code, headers) {
      this.code = code;
      this.headers = headers;
    },
    end(buffer) {
      chunks.push(Buffer.from(buffer));
    },
  };
  await route.handler({}, res);
  const body = Buffer.concat(chunks);
  assert.equal(res.code, 200, `${route.path} 状态码不是 200`);
  assert.equal(res.headers['Content-Type'], route.path.endsWith('.jpg') ? 'image/jpeg' : 'image/png');
  assert.ok(body.length > 1000, `${route.path} 返回体过小`);
  if (route.path.endsWith('.jpg')) {
    assert.deepEqual([...body.subarray(0, 3)], [0xff, 0xd8, 0xff], '壁纸不是合法 JPEG');
  } else {
    assert.deepEqual([...body.subarray(0, 4)], [0x89, 0x50, 0x4e, 0x47], '角色图不是合法 PNG');
  }
}

console.log(`host smoke ok: ${routes.map((r) => r.path).join(' , ')}`);
