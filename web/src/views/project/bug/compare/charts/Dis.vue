<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, Ref } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { basicProps } from './props';
  import { DisData } from './bugData';
  import { EChartsOption, SeriesOption } from 'echarts';
  import { pieCommonSeriesOption, mergeSeriesOption } from './commonOption';
  // import { useProjectBugStore } from '@/store/modules/projectBug';

  // const { setBugFilter } = useProjectBugStore();

  defineProps({
    ...basicProps,
  });
  const chartRef = ref<HTMLDivElement | null>(null);

  const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);

  onMounted(() => {
    initEcharts();
  });
  function initEcharts() {
    let projectNum = DisData.length;
    let titles: Array<{ text: string; left: string }> = [];
    let seriesData: Array<SeriesOption> = [];
    DisData.forEach((x, index) => {
      let per = (index / projectNum) * 100;
      titles.push({ text: `${x.name}缺陷发现分布`, left: `${per + 6.5}%` });
      seriesData.push(
        mergeSeriesOption(pieCommonSeriesOption, {
          data: x.value,
          radius: ['5%', '30%'],
          center: [`${per + 13}%`, '50%'],
        }),
      );
    });
    setOptions({
      title: titles,
      // tooltip: {},
      grid: { left: 0, right: 0 },
      series: seriesData,
    });
    const myChart = getInstance();
    myChart?.on('mouseover', function (p) {
      console.log(p);
      highlight(myChart, p.dataIndex);
    });
  }
  // 高亮当前图形
  function highlight(myChart, dataIndex) {
    //取消之前的高亮
    myChart.dispatchAction({
      type: 'downplay',
      // dataIndex: dataIndex,
    });

    myChart?.dispatchAction({
      type: 'highlight',
      // seriesIndex: 1,
      dataIndex: dataIndex,
    });
    // 显示 tooltip
    myChart?.dispatchAction({
      type: 'showTip',
      seriesIndex: 2,
      dataIndex: dataIndex,
    });
  }
</script>
