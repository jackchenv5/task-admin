<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { basicProps } from './props';

  defineProps({
    ...basicProps,
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  onMounted(() => {
    setOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            width: 1,
            color: '#019680',
          },
        },
      },
      grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
      xAxis: {
        type: 'category',
        data: [...new Array(10)].map((_item, index) => `模块${index + 1}`),
      },
      yAxis: {
        type: 'value',
        max: 4000,
        splitNumber: 4,
      },
      series: [
        {
          data: [3000, 2000, 1800, 1500, 1200, 1100, 1000, 800, 600, 500, 300],
          type: 'bar',
          barMaxWidth: 80,
        },
      ],
    });
  });
</script>
