<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref, watch } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { basicProps } from './props';
  import { bugModuleData } from './bugData';
  import { useProjectBugStore } from '@/store/modules/projectBug';
  import {
    modCommonOption,
    mergeEchartsOption,
    mergeSeriesOption,
    barCommonSeriesOption,
    lineCommonSeriesOption,
  } from './commonOption';

  const chartRef = ref<HTMLDivElement | null>(null);
  const curModName = ref<string>('');
  const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
  const { setBugFilter } = useProjectBugStore();
  watch(curModName, () => {
    changeMod();
  });

  const reverse = ref<Boolean>(false);
  const sortMap = {
    all: '总缺陷',
    remain: '遗留缺陷',
  };
  const curSort = ref<'all' | 'remain'>('all');
  watch(reverse, () => {
    initEcharts(true);
  });
  defineProps({
    ...basicProps,
  });
  onMounted(() => {
    initEcharts();
  });
  function initEcharts(turn: boolean = false) {
    //mod series data
    //trend series data
    // merge option
    //setOptions
    if (turn) {
      bugModuleData.sort((x, y) => x[curSort.value] - y[curSort.value]);
      triggerSort();
    }
    const modAllSeriesData = mergeSeriesOption(barCommonSeriesOption(), {
      name: '总缺陷',
      data: bugModuleData.map(({ name, all }) => [all, name]),
    });
    const modRemainSeriesData = mergeSeriesOption(barCommonSeriesOption(), {
      name: '遗留缺陷',
      data: bugModuleData.map(({ name, remain }) => [remain, name]),
    });
    const trendObj = bugModuleData[bugModuleData.length - 1];
    const trendData = trendObj.data;
    const trendSeriesAllData = mergeSeriesOption(lineCommonSeriesOption(1, 1), {
      id: 'trendAllID',
      name: `${trendObj.name}已发现`,
      itemStyle: {
        color: 'green',
      },
      data: trendData.map((x) => [x['name'], x['all']]),
    });
    const trendSeriesSolvedData = mergeSeriesOption(lineCommonSeriesOption(1, 1), {
      id: 'trendSolvedID',
      name: `${trendObj.name}已解决`,
      itemStyle: {
        color: '#5ab1ef',
      },
      data: trendData.map((x) => [x['name'], x['solved']]),
    });

    const mergeOption = mergeEchartsOption(modCommonOption, {
      title: [
        { text: `${sortMap[curSort.value]}` },
        { text: `${curModName.value}|${sortMap[curSort.value]}趋势图`, left: '55%' },
      ],
      series: [modAllSeriesData, modRemainSeriesData, trendSeriesAllData, trendSeriesSolvedData],
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
        },
      },
      toolbox: {
        left: '48%',
        feature: {
          myTool1: {
            show: true,
            title: '切换',
            icon: 'path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20V8m0 12l-3.5-3.5M17 20l3.5-3.5M7 17V4m0 0L3.5 7.5M7 4l3.5 3.5',
            onclick: function () {
              reverse.value = !reverse.value;
            },
          },
        },
      },
    });
    setOptions(mergeOption).then(() => {
      curModName.value = trendObj.name;
      const chart = getInstance();
      chart?.on('click', (p) => {
        if (p.componentIndex == 0 || p.componentIndex == 1) {
          curModName.value = p.name;
          setBugFilter([
            { name: '过滤类型', value: sortMap[curSort.value] },
            { name: '模块', value: curModName.value },
          ]);
        } else {
          setBugFilter([
            { name: '过滤类型', value: sortMap[curSort.value] },
            { name: '模块', value: curModName.value },
            { name: '时间', value: p.name },
          ]);
        }
      });
    });
  }
  function changeMod() {
    const curModeObj = bugModuleData.filter((x) => x.name === curModName.value)[0];

    const trendData = curModeObj.data;

    const trendSeriesAllData = mergeSeriesOption(lineCommonSeriesOption(1, 1), {
      id: 'trendAllID',
      name: `${curModeObj.name}已发现`,
      itemStyle: {
        color: 'green',
      },
      data: trendData.map((x) => [x['name'], x['all']]),
    });
    const trendSeriesSolvedData = mergeSeriesOption(lineCommonSeriesOption(1, 1), {
      id: 'trendSolvedID',
      name: `${curModeObj.name}已解决`,
      itemStyle: {
        color: '#5ab1ef',
      },
      data: trendData.map((x) => [x['name'], x['solved']]),
    });

    const mergeOption = mergeEchartsOption(modCommonOption, {
      title: [
        { text: `${sortMap[curSort.value]}` },
        { text: `${curModName.value}|${sortMap[curSort.value]}趋势图`, left: '55%' },
      ],
      series: [trendSeriesAllData, trendSeriesSolvedData],
    });
    setOptions(mergeOption, false);
  }
  function triggerSort() {
    let tmpSort = curSort.value;
    if (tmpSort === 'all') {
      curSort.value = 'remain';
    } else {
      curSort.value = 'all';
    }
  }
</script>
