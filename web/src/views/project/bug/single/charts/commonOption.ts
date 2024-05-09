import type { BarSeriesOption, EChartsOption, LineSeriesOption, PieSeriesOption, SeriesOption } from 'echarts';

const pieLabelFormatter = (p) => {
  return `${p.name}:${p.value}`;
};
const pieLabelPercentFormatter = (p) => {
  return `${p.name}:${p.value}(${p.percent.toFixed()}%)`;
};
export const singleGridBarOption: EChartsOption = {
  grid: { left: '18%', right: '5%', bottom: '8%' },
  xAxis: { gridIndex: 0, type: 'value' },
  yAxis: { type: 'category' },
};

const XY2 = {
  xAxis: [
    { gridIndex: 0, type: 'value' },
    { gridIndex: 1, type: 'value' },
  ],
  yAxis: [
    { gridIndex: 0, type: 'category' },
    { gridIndex: 1, type: 'category' },
  ],
};

const reversXY2 = {
  xAxis: [
    { gridIndex: 0, type: 'value' },
    { gridIndex: 1, type: 'category' },
  ],
  yAxis: [
    { gridIndex: 0, type: 'category' },
    { gridIndex: 1, type: 'value' },
  ],
};
//重点缺陷公共配置
export const commonOption = {
  grid: [
    { right: '35%', left: '30%', bottom: '5%' },
    { left: '70%', right: '1%', bottom: '5%' },
  ],
  ...XY2,
};

export const modCommonOption: EChartsOption = {
  lengend: { show: true },
  tooltip: { show: true },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        width: 1,
        color: '#019680',
      },
    },
  },

  grid: [
    { left: '6%', right: '50%', bottom: '6%' },
    { left: '60%', right: '0%', bottom: '6%' },
  ],
  xAxis: [
    { gridIndex: 0, type: 'value' },
    {
      gridIndex: 1,
      type: 'category',
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: 'solid',
          color: 'rgba(226,226,226,0.5)',
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    { gridIndex: 0, type: 'category' },
    { gridIndex: 1, type: 'value' },
  ],
};
export const remainCommonOption = {
  grid: [
    { left: '12%', right: '50%', bottom: '6%' },
    { left: '60%', right: '0%', bottom: '6%' },
  ],
  ...XY2,
};

export const fixCommonOption = {
  grid: [
    { left: '8%', right: '50%', bottom: '5%' },
    { left: '55%', right: '5%', bottom: '5%' },
  ],
  ...XY2,
};

export const pieCommonOption: PieSeriesOption = {
  type: 'pie',
  tooltip: { show: true },
  itemStyle: {
    borderRadius: 5,
  },
  label: {
    color: '#757885',
    formatter: pieLabelPercentFormatter,
  },
};
//Bar 公共配置
export const barCommonSeriesOption = (
  xAxisIndex?: number,
  yAxisIndex?: number,
): BarSeriesOption => ({
  label: { show: true },
  xAxisIndex: xAxisIndex ?? 0,
  yAxisIndex: yAxisIndex ?? 0,
  type: 'bar',
});

//Line 公共配置
export const lineCommonSeriesOption = (
  xAxisIndex?: number,
  yAxisIndex?: number,
): LineSeriesOption => ({
  xAxisIndex: xAxisIndex ?? 0,
  yAxisIndex: yAxisIndex ?? 0,
  type: 'line',
  smooth: true,
  areaStyle: {},
});

/**
 * 合并两个 ECharts series选项对象。
 *
 * @param baseOption 基础选项对象
 * @param mergeOption 要合并的选项对象
 * @returns 合并后的新选项对象
 */
export const mergeEchartsOption = <T extends EChartsOption>(
  baseOption: T,
  mergeOption: Partial<T>,
): T => {
  // 使用扩展运算符来创建一个新的对象，避免修改输入对象
  return {
    ...baseOption,
    ...mergeOption,
  };
};
/**
 * 合并两个 ECharts series选项对象。
 *
 * @param baseOption 基础选项对象
 * @param mergeOption 要合并的选项对象
 * @returns 合并后的新选项对象
 */
export const mergeSeriesOption = <T extends SeriesOption>(
  baseOption: T,
  mergeOption: Partial<T>,
): T => {
  // 使用扩展运算符来创建一个新的对象，避免修改输入对象
  return {
    ...baseOption,
    ...mergeOption,
  };
};
