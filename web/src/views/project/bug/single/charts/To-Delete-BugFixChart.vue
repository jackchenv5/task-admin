<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref, watch } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { basicProps } from './props';
  import { bugFixData } from './bugData';
  import {
    barCommonSeriesOption,
    fixCommonOption,
    mergeEchartsOption,
    mergeSeriesOption,
  } from './commonOption';
  import { useProjectBugStore } from '@/store/modules/projectBug';

  const { setBugFilter } = useProjectBugStore();

  defineProps({
    ...basicProps,
  });
  const chartRef = ref<HTMLDivElement | null>(null);

  const curGroupName = ref<string>('');
  const curMemberName = ref<string>('');
  const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
  onMounted(() => {
    initEcharts();
  });

  //curGroup => setOption initMember
  //curMember => setOPtion
  //
  watch(curGroupName, () => {
    changeGroup();
  });
  function initEcharts() {
    const seriesGroupData = mergeSeriesOption(barCommonSeriesOption(), {
      data: bugFixData.map(({ name, value }) => [value, name]).sort((x, y) => x[0] - y[0]),
    });

    //group Data
    const groupData = bugFixData[0];
    const groupName = groupData.name;
    const memberData = groupData.members;
    const seriesMemberData = mergeSeriesOption(barCommonSeriesOption(1, 1), {
      id: 'groupMemberID',
      data: memberData?.map(({ name, value }) => [value, name]).sort((x, y) => x[0] - y[0]),
    });
    const title = [
      { text: '各处平均修复时间(天）' },
      { text: `${groupName}|平均修复时间(天）`, left: '55%' },
    ];
    const initOption = mergeEchartsOption(fixCommonOption, {
      title: title,
      series: [seriesGroupData, seriesMemberData],
    });
    setOptions(initOption).then(() => {
      const chart = getInstance();
      chart?.on('click', (p) => {
        if (p.componentIndex === 0) {
          curGroupName.value = p.name;
          setBugFilter([
            { name: '过滤类型', value: '平均修复时间' },
            { name: '处', value: curGroupName.value },
          ]);
        } else {
          curMemberName.value = p.name;
          setBugFilter([
            { name: '过滤类型', value: '平均修复时间' },
            { name: '处', value: curGroupName.value },
            { name: '人员', value: curMemberName.value },
          ]);
        }
      });
    });
  }

  function changeGroup() {
    //groupData
    //seriesMember
    //title
    //setOption

    const groupData = bugFixData.filter(({ name }) => name === curGroupName.value)[0];
    const memberData = groupData.members;
    const seriesMemberData = mergeSeriesOption(barCommonSeriesOption(1, 1), {
      id: 'groupMemberID',
      data: memberData?.map(({ name, value }) => [value, name]).sort((x, y) => x[0] - y[0]),
    });
    const title = [
      { text: '各处平均修复时间(天）' },
      { text: `${curGroupName.value}|平均修复时间(天）`, left: '55%' },
    ];
    const initOption = mergeEchartsOption(fixCommonOption, {
      title: title,
      series: [seriesMemberData],
    });
    setOptions(initOption, false);
  }
</script>
