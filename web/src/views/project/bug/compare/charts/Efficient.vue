<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, Ref } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { basicProps } from './props';
  import { efficientData } from './bugData';
  import {
    barCommonSeriesOption,
    commonEOption,
    mergeEchartsOption,
    mergeSeriesOption,
  } from './commonOption';
  // import { useProjectBugStore } from '@/store/modules/projectBug';

  // const { setBugFilter } = useProjectBugStore();

  defineProps({
    ...basicProps,
  });
  const chartRef = ref<HTMLDivElement | null>(null);

  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  onMounted(() => {
    initEcharts();
  });

  function initEcharts() {
    const seriesData = efficientData.map((x, index) => {
      return mergeSeriesOption(barCommonSeriesOption(index, index), {
        data: x.data.map(({ name, value }) => [value, name]).sort((x, y) => x[0] - y[0]),
      });
    });

    const title = [
      { text: '全阶段(缺陷发现数/投入人月）' },
      { text: `系统测试阶段(缺陷发现数/统测试人月)`, left: '40%' },
      { text: `集成阶段(发现缺陷数/集成测试总投入)`, left: '70%' },
    ];
    const initOption = mergeEchartsOption(commonEOption, {
      title: title,
      series: seriesData,
    });
    setOptions(initOption);
  }
</script>
