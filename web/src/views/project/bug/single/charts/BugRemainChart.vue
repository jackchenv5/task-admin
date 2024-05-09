<template>
  <div class="flex">
    <div style="flex-basis: 40%" class="flex-col">
      <div style="height: 2vh">
        <RadioGroup v-model:value="chartType">
          <RadioButton value="遗留缺陷" style="background-color: rgb(153 175 102); color: white"
            >遗留500个(50%)</RadioButton
          >
          <RadioButton value="带测试缺陷" style="background-color: rgb(135 216 219); color: white"
            >待测试300个(30%)</RadioButton
          >
          <RadioButton value="解决缺陷" style="background-color: rgb(40 80 107); color: white"
            >已解决200个(20%)</RadioButton
          >
        </RadioGroup>
      </div>
      <div style="height: 43vh" ref="chartAllRef"></div>
    </div>
    <div style="flex-basis: 60%" ref="chartRef" :style="{ height }"></div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref, watch } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { basicProps } from './props';
  import { bugRemainData, bugToTestData, bugSolvedData } from './bugData';
  import { RadioButton, RadioGroup } from 'ant-design-vue';
  import {
    singleGridBarOption,
    remainCommonOption,
    mergeEchartsOption,
    mergeSeriesOption,
    barCommonSeriesOption,
  } from './commonOption';
  import { useProjectBugStore } from '@/store/modules/projectBug';

  const chartType = ref<string>('遗留缺陷');
  const chartRef = ref<HTMLDivElement | null>(null);
  const chartAllRef = ref<HTMLDivElement | null>(null);
  const chartMain = useECharts(chartAllRef as Ref<HTMLDivElement>);
  const chart = useECharts(chartRef as Ref<HTMLDivElement>);
  const { setBugFilter } = useProjectBugStore();

  const curMainName = ref<string>('');
  const curGroupName = ref<string>('');
  const curMemberName = ref<string>('');
  const curData = ref<Recordable>({ data: bugRemainData });

  defineProps({
    ...basicProps,
  });

  watch(chartType, () => {
    if (chartType.value === '遗留缺陷') {
      curData.value.data = bugRemainData;
    } else if (chartType.value === '带测试缺陷') {
      curData.value.data = bugToTestData;
    } else {
      curData.value.data = bugSolvedData;
    }
    initAllEcharts(curData.value.data);
  });

  watch(curMainName, () => {
    initMainChange();
  });
  watch(curGroupName, () => {
    initGroupChange();
  });

  onMounted(() => {
    initAllEcharts(bugRemainData);
  });

  //已解决缺陷|缺陷遗留 切换
  function initAllEcharts(data) {
    //comonecharts
    const chartAllOption = mergeEchartsOption(singleGridBarOption, {
      series: [
        {
          type: 'bar',
          stack: 'bar1',
          label: { show: true },
          data: data.map((x) => [x.value, x.name]).reverse(),
        },
        {
          type: 'bar',
          stack: 'bar1',
          label: { show: true },
          data: data.map((x) => [x.fix, x.name]).reverse(),
        },
      ],
    });
    chartMain.setOptions(chartAllOption);

    curMainName.value = data[0].name;
    const groupData = data[0]['group'].sort((x, y) => x.value - y.value);
    const memberData = groupData[0]['members'].sort((x, y) => x.value - y.value);
    const groupName = groupData[0]['name'];
    const groupSeriesData = mergeSeriesOption(barCommonSeriesOption(), {
      id: 'slaveGroupID',
      stack: 'bar2',
      data: groupData.map(({ name, value }) => [value, name]),
    });
    const groupSeriesFixData = mergeSeriesOption(barCommonSeriesOption(), {
      id: 'slaveGroupFixID',
      stack: 'bar2',
      data: groupData.map(({ name, fix }) => [fix, name]),
    });
    const memberSeriresData = mergeSeriesOption(barCommonSeriesOption(1, 1), {
      id: 'slaveMemberID',
      stack: 'bar3',
      data: memberData.map(({ name, value }) => [value, name]),
    });
    const memberSeriresFixData = mergeSeriesOption(barCommonSeriesOption(1, 1), {
      id: 'slaveMemberFixID',
      stack: 'bar3',
      data: memberData.map(({ name, fix }) => [fix, name]),
    });
    const initOption = mergeEchartsOption(remainCommonOption, {
      title: [
        { text: `${data[0].name}|${chartType.value}` },
        { text: `${groupName}|人员统计`, left: '50%' },
      ],
      series: [groupSeriesData, groupSeriesFixData, memberSeriresData, memberSeriresFixData],
    });

    chart.setOptions(initOption);

    let maintInstance = chartMain.getInstance();
    let slaveInstance = chart.getInstance();
    maintInstance?.on('click', (p) => {
      curMainName.value = p.name;
      setBugFilter([{ name: chartType.value, value: curMainName.value }]);
    });

    slaveInstance?.on('click', (p) => {
      if (p.componentIndex === 0) {
        curGroupName.value = p.name;
        setBugFilter([
          { name: chartType.value, value: curMainName.value },
          { name: '处', value: curGroupName.value },
        ]);
      } else {
        curMemberName.value = p.name;
        setBugFilter([
          { name: chartType.value, value: curMainName.value },
          { name: '处', value: curGroupName.value },
          { name: '成员', value: curMemberName.value },
        ]);
      }
    });
  }
  //chart 1 变化
  function initMainChange() {
    const data = curData.value.data;
    console.log('curMainName', curMainName.value);
    console.log(data);
    const majorData = data.filter(({ name }) => name === curMainName.value)[0];
    const groupData = majorData['group'].sort((x, y) => x.value - y.value);
    const memberData = groupData[0]['members'].sort((x, y) => x.value - y.value);
    const groupName = groupData[0]['name'];

    const groupSeriesData = mergeSeriesOption(barCommonSeriesOption(), {
      id: 'slaveGroupID',
      stack: 'bar2',
      data: groupData.map(({ name, value }) => [value, name]),
    });
    const groupSeriesFixData = mergeSeriesOption(barCommonSeriesOption(), {
      id: 'slaveGroupFixID',
      stack: 'bar2',
      data: groupData.map(({ name, fix }) => [fix, name]),
    });
    const memberSeriresData = mergeSeriesOption(barCommonSeriesOption(1, 1), {
      id: 'slaveMemberID',
      stack: 'bar3',
      data: memberData.map(({ name, value }) => [value, name]),
    });
    const memberSeriresFixData = mergeSeriesOption(barCommonSeriesOption(1, 1), {
      id: 'slaveMemberFixID',
      stack: 'bar3',
      data: memberData.map(({ name, fix }) => [fix, name]),
    });

    const initOption = mergeEchartsOption(remainCommonOption, {
      title: [
        { text: `${curMainName.value}|${chartType.value}` },
        { text: `${groupName}|人员统计`, left: '50%' },
      ],
      series: [groupSeriesData, groupSeriesFixData, memberSeriresData, memberSeriresFixData],
    });
    console.log('============initOption', initOption);
    chart.setOptions(initOption);

    let slaveInstance = chart.getInstance();

    slaveInstance?.on('click', (p) => {
      if (p.componentIndex === 0) {
        curGroupName.value = p.name;
        setBugFilter([
          { name: chartType.value, value: curMainName.value },
          { name: '处', value: curGroupName.value },
        ]);
      } else {
        curMemberName.value = p.name;
        setBugFilter([
          { name: chartType.value, value: curMainName.value },
          { name: '处', value: curGroupName.value },
          { name: '成员', value: curMemberName.value },
        ]);
      }
    });
  }
  //chart 2 变化
  function initGroupChange() {
    const data = curData.value.data;
    const majorData = data.filter(({ name }) => name === curMainName.value)[0];
    console.log('curMainName', curMainName.value);
    const groupData = majorData['group'];
    const memberData = groupData
      .filter(({ name }) => name === curGroupName.value)[0]
      ['members'].sort((x, y) => x.value - y.value);

    const memberSeriresData = mergeSeriesOption(barCommonSeriesOption(1, 1), {
      id: 'slaveMemberID',
      data: memberData.map(({ name, value }) => [value, name]),
    });
    const memberSeriresFixData = mergeSeriesOption(barCommonSeriesOption(1, 1), {
      id: 'slaveMemberFixID',
      stack: 'bar3',
      data: memberData.map(({ name, fix }) => [fix, name]),
    });
    const initOption = mergeEchartsOption(remainCommonOption, {
      title: [
        { text: `${curMainName.value}|${chartType.value}` },
        { text: `${curGroupName.value}|人员统计`, left: '50%' },
      ],
      series: [memberSeriresData, memberSeriresFixData],
    });

    chart.setOptions(initOption, false);

    let slaveInstance = chart.getInstance();

    slaveInstance?.on('click', (p) => {
      if (p.componentIndex === 0) {
        curGroupName.value = p.name;
        setBugFilter([
          { name: chartType.value, value: curMainName.value },
          { name: '处', value: curGroupName.value },
        ]);
      } else {
        curMemberName.value = p.name;
        setBugFilter([
          { name: chartType.value, value: curMainName.value },
          { name: '处', value: curGroupName.value },
          { name: '成员', value: curMemberName.value },
        ]);
      }
    });
  }
</script>
