## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## 「懂机场」项目硬性规则（每次任务开始前必读，不可绕过或变通执行）

### 数据真实性
- `speedTests` 字段的每一条数据，必须能对应到某一张真实提供的测速截图文件，分析得出。没有收到截图之前，该字段留空，绝不生成"看起来合理"的数字。
- 任何 schema 字段如果暂时没有真实数据来源，宁可留空/不渲染该区块，也不能用占位符字符串顶替后当真实数据展示（historical violation: `CompareTable` 的 `protocol` 字段曾被硬编码成 `'Shadowsocks / V2Ray / Trojan'` 显示给所有品牌，这是被明确禁止的行为，以后任何字段都不允许这样做）。
- 缺少数据 ≠ 可以编造合理数值，也 ≠ 可以用同一个值套用在所有品牌上。

### 测速截图处理规则
- 原始测速截图【永远不允许】被复制进 `src/assets/` 或以任何形式在页面上直接渲染（`<Image>`/`<img>`/画廊/灯箱都不行）。
- 正确流程只有一种：分析截图里的表格数字 → 按地区聚合成结构化数据（region/nodeCount/avgLatencyMs/avgSpeedMbps）→ 写入 mdx frontmatter → 用 `SpeedTestChart.astro` 组件渲染图表。截图本身分析完之后不保留在项目里。
- 如果发现自己因为"没有真实数据"而想直接用原图顶替，正确做法是把该区块留空并告知我，而不是用截图糊弄过去。

### 价格与对比数据的口径一致性
- 任何"起步价格"字段，必须统一取**月付价格**（或明确按月折算后的价格），不能不做判断地直接取 pricing 数组的第一项——数组顺序在不同品牌 mdx 里不一致，有的年付套餐排最前，直接取数组第一项会导致年付价和月付价被当同一口径比较。
- 如果某品牌只有年付/一次性套餐、没有月付选项，需要明确标注"该品牌无月付选项，此处为年付均摊月价"，不能不加说明就混在月付数据里对比。

### 视觉与内容标准
- 全站配色使用「改版指令v4-暖调数据卡片风UI方案.md」定义的暖橙色系，默认主题为深色（`html.dark` token），不是靛紫 Electric Indigo，不是白底默认。
- 品牌名统一使用「懂机场」，域名 `dongjichang.com`，相关文档见「品牌落地指令-懂机场.md」。
- 评测正文不能是"复述套餐 bullet + 一句模板结尾"的空壳内容，每篇需要有具体的套餐性价比判断、真实短板、以及 `dongSays` 一句话锐评。
- 页面视觉不能是纯文字排版，功能点、协议、地区覆盖等信息应配合简单图标/图形化展示（而不是文字列表罗列），具体做法见本文件第三节。

### 执行纪律
- 每次任务开始前，先确认本节规则是否有和当前要做的任务冲突的地方；如果为了完成任务需要绕开某条规则（比如"暂时用截图顶一下"），必须先向我确认，不能自行变通执行然后不说明。
- 每次任务完成后的 Artifact 汇报里，需要有一句"本次任务已严格遵守 AGENTS.md 中的项目硬性规则。"
### 禁止模拟/占位逻辑冒充真实功能
- 严禁写"Mock logic"、"模拟XX"、"For now just simulate..."这类临时逻辑并让它出现在用户能访问到的页面上。之前 `/best/[scene].astro` 就是这样：所有场景页面实际都是"取全部评分最高前3名"，跟场景本身无关，代码注释里直接写着"simulate scene filtering"——这类东西如果做不完整，正确做法是先不上线这个功能、或者明确告诉我"这部分还没做完，先用占位提示语"，而不是伪装成已经实现的样子。
- 严禁在列表页/导航里放置没有对应详情页路由的条目（之前 `/blog` 首页硬编码了 3 篇文章标题，但根本没有 `[slug].astro` 详情页，点进去是死链接）。加一个内容入口之前，先确认对应的详情页路由和数据源已经存在。
- 每次做完任务，自查一遍：页面上出现的每一个可点击的链接/按钮，是否都有真实有效的路由和页面内容，绝不留死链或假数据。
