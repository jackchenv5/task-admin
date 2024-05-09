<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref, watch } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { basicProps } from './props';
  import { remainTrendData } from './bugData';
  import { useProjectBugStore } from '@/store/modules/projectBug';
  import {
    modCommonOption,
    mergeEchartsOption,
    mergeSeriesOption,
    barCommonSeriesOption,
  } from './commonOption';

  const chartRef = ref<HTMLDivElement | null>(null);
  const curGroupName = ref<string>('');
  const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
  const { setBugFilter } = useProjectBugStore();

  defineProps({
    ...basicProps,
  });

  watch(curGroupName, () => {
    changeGroup();
  });

  onMounted(() => {
    initEcharts();
  });
  function initEcharts() {
    //mod series data
    //trend series data
    // merge option
    //setOptions
    const { all, group } = remainTrendData;
    const allSeriesData = mergeSeriesOption(barCommonSeriesOption(), {
      name: '风险系数',
      data: [
        ...group.map(({ name, risk }) => [risk, name]).sort((x, y) => x[0] - y[0]),
        [all.risk, all.name],
      ],
    });
    const trendInSeriesData = mergeSeriesOption(barCommonSeriesOption(1, 1), {
      name: '缺陷进入',
      data: all.data.map((x) => [x['name'], x['in']]),
    });
    const trendOutSeriesData = mergeSeriesOption(barCommonSeriesOption(1, 1), {
      name: '缺陷解决',
      data: all.data.map((x) => [x['name'], x['out']]),
    });
    const trendAllSeriesData = mergeSeriesOption(barCommonSeriesOption(1, 1), {
      name: '遗留缺陷',
      data: [['最近一周', all.remian]],
    });

    const mergeOption = mergeEchartsOption(modCommonOption, {
      title: [{ text: '风险系数' }, { text: `${all.name}|最近四周数据`, left: '55%' }],
      series: [trendAllSeriesData, allSeriesData, trendInSeriesData, trendOutSeriesData],
    });
    setOptions(mergeOption).then(() => {
      const chart = getInstance();
      chart?.on('click', (p) => {
        if (p.componentIndex == 1) {
          curGroupName.value = p.name;
          setBugFilter([
            { name: '过滤类型', value: '遗留趋势' },
            { name: '处', value: curGroupName.value },
          ]);
        } else {
          setBugFilter([
            { name: '过滤类型', value: '遗留趋势' },
            { name: '时间', value: p.name },
          ]);
        }
      });
    });
  }
  function changeGroup() {
    let curGroupObj;
    if (curGroupName.value === '总项目') {
      curGroupObj = remainTrendData.all;
    } else {
      curGroupObj = remainTrendData.group.filter((x) => x.name === curGroupName.value)[0];
    }

    const data = curGroupObj.data;
    const trendInSeriesData = mergeSeriesOption(barCommonSeriesOption(1, 1), {
      name: '缺陷进入',
      data: data.map((x) => [x['name'], x['in']]),
    });
    const trendOutSeriesData = mergeSeriesOption(barCommonSeriesOption(1, 1), {
      name: '缺陷解决',
      data: data.map((x) => [x['name'], x['out']]),
    });
    const trendAllSeriesData = mergeSeriesOption(barCommonSeriesOption(1, 1), {
      name: '遗留缺陷',
      data: [['最近一周', curGroupObj.remian]],
    });

    const mergeOption = mergeEchartsOption(modCommonOption, {
      title: [{ text: '风险系数' }, { text: `${curGroupName.value}|最近四周数据`, left: '55%' }],
      series: [trendAllSeriesData, trendInSeriesData, trendOutSeriesData],
    });
    setOptions(mergeOption, false);
  }
</script>
