<template>
  <div class="flex">
    <div class="flex-col p-2 outer-line">
      <div>
        <span class="mx-4">时间粒度:</span>
        <RadioGroup v-model:value="dataType">
          <RadioButton value="1" style="background-color: rgb(89 143 245); color: white"
            >周</RadioButton
          >
          <RadioButton value="2" style="background-color: rgb(86 153 84); color: white"
            >月</RadioButton
          >
        </RadioGroup>
      </div>
      <div class="my-4">
        <span class="mx-4">时间段:</span>
        <RadioGroup v-model:value="chartType">
          <RadioButton value="3" style="background-color: rgb(162 184 38); color: white"
            >全阶段</RadioButton
          >
          <RadioButton value="4" style="background-color: rgb(89 143 245); color: white"
            >近半年</RadioButton
          >
          <RadioButton value="5" style="background-color: rgb(86 153 84); color: white"
            >近三月</RadioButton
          >
        </RadioGroup>
      </div>
      <div>
        <span class="mx-4">自定义开始时间点:</span>
        <span class="my-4">
          <DatePicker style="width: 120px" v-model:value="valueTimePicker" picker="week" />
        </span>
      </div>
      <!-- <div class="flex flex-wrap my-4" style="width: 300px; height: 20vh"> -->

      <div class="mx-4 my-4">预估值设定:</div>
      <div class="flex flex-col my-4" style="height: 29vh; overflow-y: auto">
        <span class="mx-6 my-1" v-for="item in generateRandomObjects(17)" :key="item.name">
          <InputNumber style="width: 220px" :min="0" step="10" :value="item.value">
            <template #addonBefore>
              <div class="inline-block" style="width: 120px">
                {{ `第${item.name}周 | 实际值 | ${item.value}` }}</div
              >
            </template>
          </InputNumber>
        </span>
      </div>
      <!-- <div style="height: 40vh" ref="chartAllRef"></div> -->
    </div>
    <div style="flex-basis: 75%" ref="chartRef" :style="{ height }"></div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref, watch } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { basicProps } from './props';
  import { bugTrendData } from './bugData';
  import { RadioButton, RadioGroup, DatePicker, InputNumber } from 'ant-design-vue';
  import type { Dayjs } from 'dayjs';
  import { fa } from 'element-plus/es/locale/index.mjs';

  const valueTimePicker = ref<Dayjs>();

  const dataType = ref<string>('1');
  const chartType = ref<string>('3');
  const startEnd = ref({ start: 0, end: 100 });
  const chartRef = ref<HTMLDivElement | null>(null);
  const chart = useECharts(chartRef as Ref<HTMLDivElement>);

  const generateRandomObjects = (length) => {
    const randomObjects = [];
    for (let i = 0; i < length; i++) {
      const name = i + 1; // 假设name是1到100之间的随机数
      const value = Math.floor(Math.random() * 100) + 1; // 假设value也是1到100之间的随机数
      randomObjects.push({ name, value });
    }
    return randomObjects;
  };

  defineProps({
    ...basicProps,
  });

  watch(dataType, () => {
    let data;
    if (dataType.value === '1') {
      data = bugTrendData[0];
    } else {
      data = bugTrendData[1];
    }
    initEcharts(data);
  });
  watch(chartType, () => {
    if (chartType.value === '3') {
      startEnd.value.start = 0;
      startEnd.value.end = 100;
    } else if (chartType.value === '4') {
      startEnd.value.start = 60;
      startEnd.value.end = 100;
    } else if (chartType.value === '5') {
      startEnd.value.start = 90;
      startEnd.value.end = 100;
    }
    chart.setOptions(
      {
        dataZoom: [
          {
            type: 'slider',
            start: startEnd.value.start,
            end: startEnd.value.end,
            zoomLock: true,
            brushSelect: false,
            // minSpan: 50,
            minSpan: 10,
          },
        ],
      },
      false,
    );
  });
  onMounted(() => {
    initEcharts(bugTrendData[0]);
  });
  function initEcharts(data) {
    chart.setOptions({
      title: { text: '缺陷趋势' },
      legend: {
        show: true,
        selected: {
          // 选中'系列1'
          缺陷解决预估: false,
          // 缺陷解决: true,
          // 不选中'系列2'
          遗留缺陷: false,
        },
      },
      tooltip: { show: true },
      xAxis: {
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
        data: data.all.map((_, index) => `第${index + 1}${data.name}`),
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false,
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
          },
        },
      },
      dataZoom: [
        {
          type: 'slider',
          start: startEnd.value.start,
          end: startEnd.value.end,
          zoomLock: true,
          brushSelect: false,
          minSpan: 50,
        },
      ],
      series: [
        {
          name: '缺陷解决预估',
          data: data.schedule,
          type: 'line',
          smooth: true,
          areaStyle: {},
          itemStyle: {
            color: 'yellow',
          },
        },
        {
          name: '缺陷解决',
          data: data.solved,
          type: 'line',
          smooth: true,
          areaStyle: {},
          itemStyle: {
            color: 'green',
          },
        },
        {
          name: '总发现缺陷',
          data: data.all,
          type: 'line',
          smooth: true,
          areaStyle: {},
          itemStyle: {
            color: '#5ab1ef',
          },
        },
        {
          name: '遗留缺陷',
          data: data.remain,
          type: 'line',
          smooth: true,
          areaStyle: {},
          itemStyle: {
            color: 'blue',
          },
        },
      ],
    });
  }
</script>
<style scoped>
  .outer-line {
    flex-basis: 25%;
    border: 1px solid #d9dfe4;
    border-radius: 5px;
  }
</style>
