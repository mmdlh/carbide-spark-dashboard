import { useEffect, useRef } from 'react';
import type * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
export type ChartKind = 'line' | 'bar' | 'mixed' | 'donut' | 'radar' | 'gauge' | 'sankey';
export function Chart({ kind = 'line', variant = 0, value = 92, labels }: { kind?: ChartKind; variant?: number; value?: number; labels?: string[] | undefined }) {
  const ref = useRef<HTMLDivElement>(null);
  const labelsKey = JSON.stringify(labels ?? []);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    import('echarts').then(echarts => {
      if (disposed || !ref.current) return;
      const element = ref.current;
      const css = getComputedStyle(document.documentElement);
      const color = (name: string) => css.getPropertyValue(name).trim();
      // Canvas ECharts needs concrete browser-normalized colors, not unresolved CSS variables.
      const normalize = (token: string) => { const node = document.createElement('span'); node.style.color = token; document.body.append(node); const normalized = getComputedStyle(node).color; node.remove(); return normalized; };
      const palette = ['--chart-1','--chart-4','--chart-2','--chart-3','--chart-5'].map(n => normalize(color(n)));
      const c = (i: number) => palette[i] ?? normalize(color('--primary'));
      const muted = normalize(color('--muted-foreground'));
      const border = normalize(color('--border'));
      const foreground = normalize(color('--foreground'));
      const chart = echarts.init(element, undefined, { renderer: 'canvas' });
      const stableLabels: string[] = JSON.parse(labelsKey);
      const chartLabels = stableLabels.length ? stableLabels : undefined;
      const cats = chartLabels ?? ['00:00','04:00','08:00','12:00','16:00','20:00','24:00'];
      const production = [108,115,111,123,119,127,132].map(n => n + variant * 4);
      const base: EChartsOption = { color: palette, textStyle: { fontFamily: 'Noto Sans SC, sans-serif', fontSize: 10, color: muted }, animationDuration: 900, tooltip: { trigger: 'axis', backgroundColor: normalize(color('--popover')), borderColor: border, textStyle: { color: foreground, fontSize: 11 } }, grid: { left: 42, right: 18, top: 47, bottom: 30 }, legend: { top: 7, itemWidth: 11, itemHeight: 6, textStyle: { color: muted, fontSize: 10 } }, xAxis: { type: 'category', data: cats, boundaryGap: kind !== 'line', axisLine: { lineStyle: { color: border } }, axisTick: { show: false }, axisLabel: { color: muted, fontSize: 9 } }, yAxis: { type: 'value', splitLine: { lineStyle: { color: border, type: 'dashed' } }, axisLabel: { color: muted, fontSize: 9 } } };
      let override: EChartsOption;
      if (kind === 'donut') override = { tooltip: { trigger: 'item' }, legend: { bottom: 6, itemWidth: 8, itemHeight: 8, textStyle: { color: muted, fontSize: 9 } }, series: [{ type: 'pie', radius: ['47%','67%'], center: ['50%','43%'], avoidLabelOverlap: true, label: { show: false }, emphasis: { label: { show: true, fontSize: 12, color: foreground, formatter: '{b}\n{d}%' } }, itemStyle: { borderWidth: 3, borderColor: normalize(color('--background')), borderRadius: 3 }, data: (chartLabels ?? ['炉变用电','公辅系统','除尘系统','其他用电']).map((name,i) => ({ name, value: [74,13,8,5][i] ?? 8 })) }], graphic: [{ type: 'text', left: 'center', top: '34%', style: { text: variant === 1 ? '98.6%' : '74.0%', fill: foreground, fontSize: 26, fontFamily: 'Chakra Petch', fontWeight: 600 } }, { type: 'text', left: 'center', top: '49%', style: { text: variant === 1 ? '设备完好率' : '电石炉用电占比', fill: muted, fontSize: 10 } }] };
      else if (kind === 'radar') override = { legend: { top: 6, textStyle: { color: muted, fontSize: 9 }, itemWidth: 10, itemHeight: 5 }, tooltip: { trigger: 'item' }, radar: { center: ['50%','58%'], radius: '62%', indicator: ['产能利用','能效水平','设备健康','安全管理','质量达标','环保绩效'].map(name => ({ name, max: 100 })), axisName: { color: muted, fontSize: 9 }, splitLine: { lineStyle: { color: border } }, splitArea: { areaStyle: { color: ['transparent', normalize(color('--surface'))] } }, axisLine: { lineStyle: { color: border } } }, series: [{ type: 'radar', symbol: 'circle', symbolSize: 4, lineStyle: { width: 2 }, data: [{ name: '本月表现', value: [92,85,94,98,97,91].map(n => Math.min(100,n + variant)), areaStyle: { opacity: .17 } }, { name: '目标值', value: [85,90,90,95,95,90], lineStyle: { type: 'dashed' }, areaStyle: { opacity: 0 } }] }] };
      else if (kind === 'gauge') override = { legend: { show: false }, tooltip: { trigger: 'item' }, series: [{ type: 'gauge', startAngle: 210, endAngle: -30, radius: '90%', center: ['50%','57%'], min: 0, max: 100, progress: { show: true, width: 10, itemStyle: { color: c(variant % palette.length) } }, axisLine: { lineStyle: { width: 10, color: [[1,border]] } }, pointer: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false }, anchor: { show: false }, title: { offsetCenter: [0,'34%'], color: muted, fontSize: 11 }, detail: { valueAnimation: true, offsetCenter: [0,'-5%'], formatter: '{value}', color: c(variant % palette.length), fontFamily: 'Chakra Petch', fontSize: 34 }, data: [{ value, name: chartLabels?.[0] ?? '综合运行指数' }] }] };
      else if (kind === 'sankey') override = { legend: { show: false }, tooltip: { trigger: 'item' }, series: [{ type: 'sankey', left: 18, right: 90, top: 30, bottom: 25, nodeWidth: 12, nodeGap: 24, emphasis: { focus: 'adjacency' }, label: { color: foreground, fontSize: 11 }, lineStyle: { color: 'gradient', opacity: .27, curveness: .5 }, data: ['全厂能源','电力能源','煤气回收','电石炉','动力车间','除尘系统','石灰窑'].map(name => ({ name })), links: [{ source: '全厂能源', target: '电力能源', value: 88 }, { source: '全厂能源', target: '煤气回收', value: 12 }, { source: '电力能源', target: '电石炉', value: 74 }, { source: '电力能源', target: '动力车间', value: 9 }, { source: '电力能源', target: '除尘系统', value: 5 }, { source: '煤气回收', target: '石灰窑', value: 12 }] }] };
      else {
        const data = production.slice(0,cats.length);
        const compare = data.map((n,i) => n - 8 + i % 3 * 4);
        const line = (name: string, values: number[], dashed=false): echarts.LineSeriesOption => ({ name, type: 'line', data: values, smooth: true, symbol: dashed?'none':'circle', symbolSize: 5, lineStyle: { width: 2, type: dashed?'dashed':'solid' }, areaStyle: { opacity: dashed?0:.11 } });
        const bar = (name: string, values: number[], gradient=false): echarts.BarSeriesOption => ({ name, type: 'bar', data: values, barWidth: 11, itemStyle: { borderRadius: [3,3,0,0], color: gradient?new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:c(0)},{offset:1,color:c(1)}]):c(3) } });
        override = { series: kind==='line'?[line('实时产量',data),line('目标产量',compare,true)]:kind==='bar'?[bar('实际完成',data,true),bar('计划目标',compare)]:[bar('实际产量',data,true),line('计划产量',compare,true)] };
      }
      const isCartesian = kind === 'line' || kind === 'bar' || kind === 'mixed';
      const { xAxis, yAxis, grid, legend, ...common } = base;
      chart.setOption({ ...common, ...(isCartesian ? { xAxis, yAxis, grid, legend } : {}), ...override }, { notMerge: true });
      const observer = new ResizeObserver(() => chart.resize()); observer.observe(element);
      cleanup = () => { observer.disconnect(); chart.dispose(); };
    });
    return () => { disposed = true; cleanup?.(); };
  }, [kind,variant,value,labelsKey]);
  return <div className="echart" ref={ref} aria-label={`${kind}数据图表`} />;
}
