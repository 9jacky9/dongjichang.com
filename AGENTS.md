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

### 反编造规则补充（叙事类文章同样适用，不只是结构化数据字段）
- 之前的规则只覆盖了 `speedTests` 结构化字段不能编数字，但博客正文里的"实测体验"这类叙事段落，同样不能编具体的使用场景描述（比如"没有触发人机验证""可以拖拽进度条无缓冲秒开"这种具体到细节的体验描写，如果不是基于真实测速数据/真实使用记录，本质上和编数字是一回事）。
- 判断标准：如果一段文字读起来像是"亲测过"的具体描述，但实际上没有真实数据支撑，就不能写。没有数据支撑时，正确写法是基于套餐条款做客观推断（比如"该品牌采用IPLC专线，理论上晚高峰表现应该优于普通线路，具体实测数据我们会在收到后更新"），而不是直接编一段绘声绘色的体验描写。

### 反模板化规则
- 同一 `articleType` 的多篇文章，不能使用相同的段落骨架 + 相似的句式套壳（换品牌名但结构、过渡句、结尾套话都高度一致）。之前 4 篇品牌深度测评（飞猫云/sogo云/微风网络/幕光加速）就是这个问题——开头"如果你正在纠结/寻找...这篇文章会/我们来扒一扒..."的句式、"适合谁/不适合谁"的结论结构、结尾 CTA 按钮的 HTML 完全一致，只换了名词。每篇文章的结构、切入角度、语言节奏都要有真实差异，不能是同一个模板换词填空。

### 旧主题残留清理
- 每次改动 UI 相关代码前，先搜索是否还有 `cyber` 等旧版靛紫主题的类名残留（比如 `cyber-glow`），不能再使用这类类名，因为现在的设计风格是暖橙简约卡片风。

### 测速数据字段格式锁定（反复被改回旧结构，这次锁死）
- `speedTests` 字段的结构固定为：`region`(string) / `nodeCount`(number) / `avgLatencyMs`(number) / `avgSpeedMbps`(number) / `maxSpeedMbps`(number, optional) / `testDate`(date) / `note`(string, optional)。
- 不允许改回 `image`/`date`/`conclusion` 这种旧结构，也不允许引入任何"占位图/占位文字框"的展示方式（比如 `[测速截图: xxx]` 这种文字占位符），一律通过真实数据渲染图表组件。
- 再次强调：没有真实截图分析支撑的 `speedTests` 数据，一律留空，"多地区节点"、"延迟极低"这类模糊表述本身就是编造的信号词，看到类似写法要重新检查数据来源。

### Astro 资源路径规则
- `src/assets/` 目录下的图片必须通过 Astro 的 `<Image>` 组件或 `import` 方式引入使用，不能直接在 `<img src="/src/assets/...">` 里硬编码路径——这个路径在生产构建后是无效的，会导致图裂。真正需要通过纯 URL 字符串引用的静态资源，放在 `public/` 目录下。


### 三套排序逻辑，互不覆盖，不要混用
本站有三套独立的品牌排序/推荐逻辑，分别服务不同目的，修改任何一套时不要影响另外两套：
1. `featured` + `featuredNote`：首页 Hero"编辑严选"卡片流，固定展示4家（飞猫云/sogo云/微风网络/幕光加速）。
2. `scenes`：`/best/[scene]` 客观场景榜单，纯数据过滤排序，不受人工排名影响。
3. `rankTier`：全站默认品牌排序（首页品牌网格、`/brands` 品牌库默认排序），分层排名，第1、2名固定，其余分组内随机轮换。
三套字段独立存在于同一个品牌 mdx 里，互不覆盖。

### 品牌名称规则
所有品牌的展示名称必须使用中文原名（如"灵猫""跨界云""闪跃""无忧链接"），不要翻译成英文或起英文别名。唯一例外是 Firefly——这个品牌本身注册的就是英文名，保持"Firefly"不做中文化处理。品牌套餐里出现的英文子名称（比如"闪动 (Flicker)"这种）只是该品牌自己的档位命名习惯，照抄展示即可，不代表整个品牌要英文化。
