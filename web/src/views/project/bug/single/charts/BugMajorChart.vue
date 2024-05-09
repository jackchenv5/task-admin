<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref, watch } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { basicProps } from './props';
  import { bugData } from './bugData';
  import {
    commonOption,
    pieCommonOption,
    barCommonSeriesOption,
    mergeSeriesOption,
    mergeEchartsOption,
  } from './commonOption';
  import type { BarSeriesOption, EChartsOption, PieSeriesOption } from 'echarts';
  import { useProjectBugStore } from '@/store/modules/projectBug';

  const { setBugFilter } = useProjectBugStore();
  defineProps({
    ...basicProps,
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
  const curMajorName = ref<string>('');
  const curGroupName = ref<string>('');
  const curMemberName = ref<string>('');

  enum CompIndex {
    MajorComp,
    GroupComp,
    MemberComp,
  }
  const selectHander = {
    [CompIndex.MajorComp]: (value) => {
      curMajorName.value = value;
      setBugFilter([{ name: 'major', value: curMajorName.value }]);
    },
    [CompIndex.GroupComp]: (value) => {
      curGroupName.value = value;
      setBugFilter([
        { name: 'major', value: curMajorName.value },
        { name: 'group', value: curGroupName.value },
      ]);
    },
    [CompIndex.MemberComp]: (value) => {
      curMemberName.value = value;
      setBugFilter([
        { name: 'major', value: curMajorName.value },
        { name: 'group', value: curGroupName.value },
        { name: 'member', value: curMemberName.value },
      ]);
    },
  };

  watch(curMajorName, () => {
    setOptions(initSelectMajor(curMajorName.value), false);
  });
  watch(curGroupName, () => {
    setOptions(initSelectGroup(curMajorName.value, curGroupName.value), false);
  });
  watch(curMemberName, () => {});
  onMounted(() => {
    setOptions(initEchartsOptions()).then(() => {
      let chartInstance = getInstance();
      chartInstance?.on('click', (p) => {
        let ComponentIndex = p.componentIndex;
        selectHander[ComponentIndex](p.name);
      });
    });
  });
  function initEchartsOptions() {
    //pie initData
    bugData.sort((x, y) => y.value - x.value);
    const initPieData = bugData
      .map(({ name, value }) => ({ name, value }))
      .sort((x, y) => y.value - x.value);
    const initPieSeries = mergeSeriesOption<PieSeriesOption>(pieCommonOption, {
      id: 'pieID',
      center: ['13%', '50%'],
      radius: ['6%', '50%'],
      roseType: 'area',
      data: initPieData,
    });

    const initMajorName = bugData[0].name;
    const initGroupOption = initSelectMajor(initMajorName);
    const mergeOption: EChartsOption = {
      title: initGroupOption.title,
      series: [initPieSeries, ...initGroupOption.series],
    };
    const initOption: EChartsOption = mergeEchartsOption(commonOption, mergeOption);
    return initOption;
  }
  function initSelectMajor(majorName) {
    //get select major type data
    //get init group and members option
    // set option
    const majorData = bugData.filter(({ name }) => name === majorName)[0];
    const initGroupData = majorData.group
      .map(({ name, value }) => [value, name])
      .sort((x, y) => x[0] - y[0]);
    const initGroupSeries = mergeSeriesOption<BarSeriesOption>(barCommonSeriesOption(), {
      id: 'groupID',
      data: initGroupData,
    });
    const initMemberData = majorData.group[0].members
      .map(({ name, value }) => [value, name])
      //@ts-ignore
      .sort((x, y) => x[0] - y[0]);
    const initMemberSeries = mergeSeriesOption<BarSeriesOption>(barCommonSeriesOption(1, 1), {
      id: 'memberID',
      data: initMemberData,
    });
    //iniTitle
    const initTitle = [
      { text: '重点缺陷分布' },
      { text: `${majorData.name}|各处缺陷统计`, left: '28%' },
      { text: `${majorData.group[0].name}|人员缺陷统计`, left: '70%' },
    ];
    return {
      title: initTitle,
      xAxis: [
        { gridIndex: 0, type: 'value' },
        { gridIndex: 1, type: 'value' },
      ],
      yAxis: [
        { gridIndex: 0, type: 'category' },
        { gridIndex: 1, type: 'category' },
      ],
      series: [initGroupSeries, initMemberSeries],
    };
  }
  function initSelectGroup(majorName, groupName) {
    //get select group name data
    //get init  members option
    // set option
    const majorData = bugData.filter(({ name }) => name === majorName)[0];
    const groupData = majorData.group.filter(({ name }) => name === groupName)[0];
    const initMemberData = groupData.members
      .map(({ name, value }) => [value, name])
      .sort((x, y) => x[0] - y[0]);
    const initMemberSeries = mergeSeriesOption<BarSeriesOption>(barCommonSeriesOption(1, 1), {
      id: 'memberID',
      data: initMemberData,
    });
    //iniTitle
    const initTitle = [
      { text: '重点缺陷分布' },
      { text: `${majorData.name}|各处缺陷统计`, left: '28%' },
      { text: `${groupData.name}|人员缺陷统计`, left: '70%' },
    ];
    return {
      title: initTitle,
      xAxis: [
        { gridIndex: 0, type: 'value' },
        { gridIndex: 1, type: 'value' },
      ],
      yAxis: [
        { gridIndex: 0, type: 'category' },
        { gridIndex: 1, type: 'category' },
      ],
      series: initMemberSeries,
    };
  }
</script>
