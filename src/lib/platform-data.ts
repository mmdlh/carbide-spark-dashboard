import { LayoutDashboard, Factory, Zap, Cpu, ShieldCheck, Leaf, ChartNoAxesCombined } from 'lucide-react';
export const pages = [
 { path: '/', name: '综合态势总览', short: '综合态势', en: 'OPERATION OVERVIEW', icon: LayoutDashboard },
 { path: '/production', name: '生产运行监控', short: '生产运行', en: 'PRODUCTION MONITORING', icon: Factory },
 { path: '/energy', name: '能源管理中心', short: '能源管理', en: 'ENERGY MANAGEMENT', icon: Zap },
 { path: '/equipment', name: '设备健康管理', short: '设备管理', en: 'EQUIPMENT INTELLIGENCE', icon: Cpu },
 { path: '/safety', name: '安全风险管控', short: '安全管控', en: 'SAFETY & RISK CONTROL', icon: ShieldCheck },
 { path: '/environment', name: '环保排放监测', short: '环保监测', en: 'ENVIRONMENTAL MONITORING', icon: Leaf },
 { path: '/analysis', name: '经营决策分析', short: '决策分析', en: 'BUSINESS INTELLIGENCE', icon: ChartNoAxesCombined },
] as const;
export const furnaceRows = [
 ['1# 电石炉','运行中','36.8','205.2','3,186','98.4%'],
 ['2# 电石炉','运行中','37.2','211.8','3,152','99.1%'],
 ['3# 电石炉','运行中','35.6','198.6','3,208','97.8%'],
 ['4# 电石炉','负荷调整','34.7','196.9','3,226','98.7%'],
];
export const deviceRows = [
 {name:'1# 电石炉变压器',id:'TR-001',area:'电石车间',status:'运行正常',health:98.2,temp:'62.4',hours:'8,624'},
 {name:'2# 电石炉变压器',id:'TR-002',area:'电石车间',status:'运行正常',health:97.6,temp:'63.1',hours:'8,510'},
 {name:'3# 循环水泵',id:'WP-003',area:'动力车间',status:'待检修',health:82.3,temp:'45.8',hours:'12,036'},
 {name:'1# 布袋除尘器',id:'DC-001',area:'环保车间',status:'运行正常',health:96.8,temp:'38.2',hours:'6,782'},
 {name:'2# 输料皮带机',id:'CV-002',area:'原料车间',status:'运行正常',health:94.5,temp:'36.5',hours:'7,451'},
 {name:'煤气回收压缩机',id:'GC-001',area:'动力车间',status:'运行正常',health:95.1,temp:'56.3',hours:'9,156'},
];
export function pageHead(index:number) {
 const page = pages[index] ?? pages[0];
 const title = `${page.name} · 电石智控`;
 const description = `电石智控煤化工电石厂${page.short}平台，呈现生产、能源、设备、安全和环保运行指标。`;
 return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
