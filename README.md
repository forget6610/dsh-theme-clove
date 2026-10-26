# dsh-theme-clove

暮色调的 DeepSeek Harness Web GUI 皮肤：粉紫配色、暗紫壁纸、卡片和滚动条样式。

仓库不自带壁纸。默认用 `assets/default/wallpaper.jpg`（原创的暗紫抽象图），装上就能跑；想换成自己的图，见下面「换壁纸」。

> 想要会跟着你跑、能拖能撒娇的角色？那是另一个插件 [dsh-pet-clove](https://github.com/forget6610/dsh-pet-clove)。这个仓库只做皮肤。

![preview](preview/preview.png)

## 内容

- 33 个 design token：深紫半透明表面、蝶粉强调色、粉紫渐变滚动条
- 整页壁纸（`body` 固定背景），暗角渐变保证文字可读
- 聊天输入卡圆角 + 内描边，气泡圆角
- 全部挂在插件 fiber 上，卸载后页面干净还原

## 安装

命令行版（`dsh web`）：

```
dsh plugin --profile web add github:forget6610/dsh-theme-clove
dsh web
```

桌面客户端（DSH Desktop / EAC）：`dsh plugin` 不能操作客户端自带的 `desktop` profile，请到 **设置 → 插件 → 市场** 里从 GitHub 源搜索 `dsh-theme-clove` 安装，装完重启并 `Ctrl+F5`。

本地开发：

```
git clone https://github.com/forget6610/dsh-theme-clove
dsh plugin --profile web add link:D:\path\to\dsh-theme-clove
```

卸载：命令行 `dsh plugin --profile web remove dsh-theme-clove`，客户端在插件市场里卸载。

## 换壁纸

插件优先读 `assets/wallpaper.jpg`，读不到才回退到 `assets/default/wallpaper.jpg`。

放一张 16:9 的 JPEG（建议 1920×1080）到 `assets/wallpaper.jpg`，重启并强刷即可。这个文件在 `.gitignore` 里，个人图不会进仓库。路径写死在 `client.js` 的 CSS 和 `host.js` 的 `ASSETS` 里，想换目录改这两处。

## 改配色

`client.js` 里的 `TOKENS`，每项是 `{ light, dark }`。只改「表面 / 文字 / 强调 / 阴影」类 token 最稳，布局类 token 先在开发者工具里确认影响面。

## 结构

```
host.js            # 壁纸静态路由（带默认图回退）
client.js          # design token + 壁纸/卡片/滚动条 CSS
assets/default/    # 占位壁纸（原创）
cordis.patch.yml   # 插件行
test/              # 两个零依赖测试
```

## 测试

```
npm test
node test/host-smoke.mjs
```

浏览器半区跑在最小 DOM stub 上；宿主半区真的读文件并校验字节头。不需要启动 dsh。

## 已知限制

- 壁纸是 1920×1080 位图，4K 屏会略微放大
- 毛玻璃/滚动条按 Chromium 内核打磨，Firefox 效果打折
- 一个 profile 只建议开一个主题插件，token 是叠加的
- 静态资源缓存 1 小时，换图后强刷

## 许可

代码 MIT。`assets/default/` 的占位图是原创的，随代码一起按 MIT 使用。仓库与 Riot Games 无关，也不分发官方或同人素材。

---

A dusk-coloured skin for the DeepSeek Harness web GUI: 33 design tokens, a wallpaper slot, and card/scrollbar styling. Ships an original placeholder wallpaper; drop your own JPEG at `assets/wallpaper.jpg` to replace it. MIT. Not affiliated with Riot Games.
