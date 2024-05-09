<template>
  <div class="flex flex-col">
    <div style="height: 2vh">
      <RadioGroup v-model:value="chartType">
        <RadioButton value="缺陷数据" style="background-color: rgb(153 175 102); color: white"
          >缺陷数据</RadioButton
        >
        <RadioButton value="数据分析" style="background-color: rgb(40 80 107); color: white"
          >数据分析</RadioButton
        >
      </RadioGroup>
    </div>
    <div ref="chartRef" :style="{ height, width }"></div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref, watch } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { basicProps } from './props';
  import { TrendData, KanbanData } from './bugData';
  import { RadioButton, RadioGroup } from 'ant-design-vue';
  import { SeriesOption } from 'echarts';
  import { pieCommonSeriesOption, mergeSeriesOption } from './commonOption';

  defineProps({
    ...basicProps,
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
  const chartType = ref<string>('缺陷数据');

  onMounted(() => {
    initEcharts1(TrendData);
  });
  watch(chartType, () => {
    console.log('chartType', chartType.value);
    let data;
    if (chartType.value === '缺陷数据') {
      data = TrendData;
      initEcharts1(data);
    } else {
      data = KanbanData;
      initEcharts2(data);
    }
  });
  function initEcharts1(data) {
    setOptions({
      legend: { show: true },
      label: { show: true },
      xAxis: {
        type: 'category',
        // boundaryGap: false,
        data: data[0].value.map((x) => x.name),
        // axisTick: {
        //   show: false,
        // },
      },
      yAxis: [
        {
          type: 'value',
          // splitNumber: 4,
          // axisTick: {
          //   show: false,
          // },
        },
      ],
      // grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
      // grid: { top: '12  %' },
      // title: [{ text: chartType.value, right: '10%' }],
      series: data.map((x) => {
        return {
          name: x.name,
          data: x.value,
          type: 'bar',
        };
      }),
    });
  }

  function initEcharts2(data) {
    let projectNum = data.length;
    let titles: Array<{ text: string; left: string }> = [];
    let seriesData: Array<SeriesOption> = [];
    data.forEach((x, index) => {
      let per = (index / projectNum) * 100;
      titles.push({ text: `${x.name}缺陷发现分布`, top: '10%', left: `${per + 7.5}%` });
      seriesData.push(
        mergeSeriesOption(pieCommonSeriesOption, {
          data: x.value,
          radius: ['5%', '30%'],
          center: [`${per + 15}%`, '50%'],
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
