<template>
  <Card title="关注项目对比" :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '@/hooks/web/useECharts';

  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '400px',
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      setOptions({
        legend: {
          bottom: 0,
          data: ['项目一', '项目二'],
        },
        tooltip: {},
        radar: {
          radius: '60%',
          splitNumber: 8,
          indicator: [
            {
              name: '总预算',
            },
            {
              name: '人力执行',
            },
            {
              name: '非人力执行',
            },
            {
              name: '总执行',
            },
            {
              name: '科目费用',
            },
            {
              name: '研发样机',
            },
          ],
        },
        series: [
          {
            type: 'radar',
            symbolSize: 0,
            areaStyle: {
              shadowBlur: 0,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1,
            },
            data: [
              {
                value: [120, 50, 86, 40, 50, 20],
                name: '项目一',
                itemStyle: {
                  color: '#b6a2de',
                },
              },
              {
                value: [120, 75, 70, 76, 20, 85],
                name: '项目二',
                itemStyle: {
                  color: '#67e0e3',
                },
              },
            ],
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
