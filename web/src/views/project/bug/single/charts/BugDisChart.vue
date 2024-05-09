<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script setup lang="ts">
  import { onMounted, ref, Ref } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { basicProps } from './props';
  import { bugDisData } from './bugData';
  import { mergeSeriesOption, pieCommonOption } from './commonOption';
  import { useProjectBugStore } from '@/store/modules/projectBug';

  const { setBugFilter } = useProjectBugStore();

  defineProps({
    ...basicProps,
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
  onMounted(() => {
    const allStageSeriesData = mergeSeriesOption(pieCommonOption, {
      center: ['18%', '50%'],
      radius: ['6%', '50%'],
      roseType: 'area',
      data: bugDisData.all,
    });

    const sysStageSeriesData = mergeSeriesOption(pieCommonOption, {
      center: ['52%', '50%'],
      radius: ['26%', '50%'],
      data: bugDisData.sysTest,
    });

    const integrationSeriesData = mergeSeriesOption(pieCommonOption, {
      center: ['82%', '50%'],
      radius: ['6%', '50%'],
      roseType: 'area',
      data: bugDisData.integrationTest,
    });
    setOptions({
      title: [
        { text: '全阶段发现方式', left: '14.5%' },
        { text: '系统测试阶段发现方式', left: '45.5%' },
        { text: '集成测试阶段发现方式', left: '77%' },
      ],
      tooltip: {
        trigger: 'item',
      },
      series: [allStageSeriesData, sysStageSeriesData, integrationSeriesData],
    }).then(() => {
      const chart = getInstance();
      chart?.on('click', (p) => {
        if (p.componentIndex === 0) {
          console.log(0);
          setBugFilter([
            { name: '过滤条件', value: '全阶段' },
            { name: '缺陷发现方式', value: p.name },
          ]);
        } else if (p.componentIndex == 1) {
          setBugFilter([
            { name: '过滤条件', value: '系统测试' },
            { name: '缺陷发现方式', value: p.name },
          ]);
        } else {
          setBugFilter([
            { name: '过滤条件', value: '集成测试' },
            { name: '缺陷发现方式', value: p.name },
          ]);
        }
      });
    });
  });
</script>
