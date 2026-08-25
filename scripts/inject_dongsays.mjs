import fs from 'fs';
import path from 'path';

const verdicts = {
  flycat: "预算够闭眼冲，专线求稳的不二之选。",
  sogo: "年付没啥大折扣，但IEPL底子在，多设备重度用户福音。",
  breezenet: "七折码真香，团队合租买个大流量包绝对够分。",
  muguang: "大流量套餐有点贵，但BGP和专线混跑，速度杠杠的。",
  u1s1: "不限设备还便宜，学生党和追剧党无脑上就是了。",
  yifan: "晚高峰不卡顿才是真理，不过超轻量用户可能觉得起步价不划算。",
  ermao: "冲着全IEPL原生IP去的，流媒体解锁稳如老狗。",
  guangnian: "年付89是真的卷，但售后不退款，建议先用小包试试水。",
  guangsu: "全球IPLC带宽大，下载党和4K仓鼠玩家的快乐老家。",
  quanqiu: "调度技术不错，但入门版120G不够重度刷短视频的。",
  kexin: "两块钱试用良心，不过年付60G只适合偶尔轻度查资料。",
  v2yun: "客服能找到人这点赢了大部分机场，小白别折腾直接上。",
  yuzhou: "自带客户端省事儿，适合不想折腾配置的懒癌患者。",
  edgenova: "体验套餐很香，Netflix重度用户可以长期持有。",
  sujie: "查新闻刷推特爆款，对冷门地区没需求的直接入。",
  kuaili: "月付15起步毫无压力，轻量级用户的平替首选。",
  xingdaomeng: "原生IP多且稳，合租党看过来，不过基础包流量偏紧。",
  jilian: "八折下来性价比拉满，不限设备，一套搞定全家桶。"
};

const dir = path.join(process.cwd(), 'src/content/reviews');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

let injectedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  const slug = file.replace('.mdx', '');
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if dongSays already exists
  if (content.includes('dongSays:')) {
    console.log(`Skipping ${file}, dongSays already exists.`);
    continue;
  }
  
  const verdict = verdicts[slug] || "这家还算实在，根据自己流量需求看着办就行。";
  
  // We want to insert it right before rating:
  content = content.replace('rating:', `dongSays: "${verdict}"\nrating:`);
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Injected verdict to ${file}`);
  injectedCount++;
}

console.log(`Successfully injected dongSays into ${injectedCount} files.`);
