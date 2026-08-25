# 🚀 云速评测 (CloudSpeed Reviews) - 运营与内容指南

欢迎使用由 Antigravity Agent 构建的高性能 Astro 评测站。本站点采用了最新的 Astro 5.0 `Content Collections` (glob loader) 架构构建，保证了极致的加载性能和满分的 SEO 表现。

## 📝 如何添加新的机场评测？

所有品牌的评测数据统一储存在 `src/content/reviews/` 目录下。

### 1. 新建 MDX 文件
在 `src/content/reviews/` 下创建一个以品牌拼音为文件名的 `.mdx` 文件（例如 `newbrand.mdx`）。

### 2. 填写 Frontmatter (元数据)
将以下模板复制到你的文件中，并按需修改：

```mdx
---
name: "新品牌名称"
affiliateLink: "https://example.com/aff=123"
coupon: "NEW888"
couponDesc: "新人首单8折"
rating:
  speed: 4.5
  stability: 4.8
  value: 4.0
  support: 4.5
  overall: 4.5
summary: "一句话总结该品牌的特色，如：提供优质 IEPL 专线的性价比之选，晚高峰不卡顿。"
pros:
  - "解锁各大流媒体"
  - "延迟低"
cons:
  - "冷门节点较少"
targetAudience:
  - "流媒体"
  - "游戏玩家"
pricing:
  - name: "基础月付"
    price: "￥15.00"
    period: "月付"
    isLimited: false
    refundable: true
speedTests:
  - region: "广东移动"
    date: 2026-08-25
    conclusion: "速度极快，油管 4K 无缓冲"
    # 填入测速图后放开下面的注释（图片需放在 src/assets/ 目录下）
    # image: import('../../assets/speedtests/newbrand-gd.jpg')
faq:
  - question: "新品牌支持退款吗？"
    answer: "支持 3 天无理由退款，需满足流量使用不超过 5G 的条件。"
metaTitle: "新品牌深度评测"
metaDescription: "2026年最新评测数据，为你揭示新品牌的真实速度与性价比。"
focusKeyword: "新品牌评测"
updatedDate: 2026-08-25
---

这里写评测的正文部分。支持 Markdown 语法，可以写你的深度体验报告、图文教程等。
```

### 3. 添加品牌 Logo
为了让评测页和榜单正常显示图标，请准备该品牌的 Logo 图片，或者使用我们默认生成的 SVG 风格图标。
**路径规则**：`src/assets/brands/[slug].svg` （其中 slug 是你的文件名，如 `newbrand`）。

## 📸 如何补充测速截图素材？

在上述模板中，`speedTests` 数组包含了测速结果。
1. 将你的测速截图放入 `src/assets/speedtests/` 目录中。
2. 在 `mdx` 中取消 `image:` 字段的注释，并正确引入相对路径：
   `image: import('../../assets/speedtests/xxx.jpg')`
3. 系统会自动对该图片进行 Astro 的图片优化并在前端开启懒加载和点击放大 (Lightbox)。

## 🛠️ 常用开发命令

- `pnpm run dev`：启动本地开发服务器，实时预览修改。
- `npx astro check`：在发布前运行此命令，系统将基于 Zod Schema 严格检查你的数据是否有缺失或类型错误。
- `pnpm run build`：生成静态生产环境文件，产物位于 `dist/` 目录。
