<template>
  <div class="my-2">
    <Card size="small">
      <span class="mx-2">
        <span>管理视角：</span>
        <RadioGroup v-model:value="chartType">
          <RadioButton value="1">重点缺陷分布</RadioButton>
          <RadioButton value="2">缺陷遗留数</RadioButton>
          <RadioButton value="4">缺陷发现分布方式</RadioButton>
        </RadioGroup>
      </span>
      <span class="mx-2">
        <span>开发视角：</span>
        <RadioGroup v-model:value="chartType">
          <RadioButton value="5">开发视角缺陷分布</RadioButton>
          <RadioButton value="6">缺陷发现趋势图</RadioButton>
          <RadioButton value="7">缺陷遗留趋势图</RadioButton>
        </RadioGroup>
      </span>
      <span><SelectInfo /></span>
    </Card>
  </div>
  <Card>
    <template v-if="chartType === '1'">
      <BugMajorChart />
    </template>
    <template v-if="chartType === '2'">
      <BugRemainChart />
    </template>
    <!-- <template v-if="chartType === '3'">
      <BugFixChart />
    </template> -->
    <template v-if="chartType === '4'">
      <BugDisChart />
    </template>
    <template v-if="chartType === '5'">
      <BugModuleCharVue />
    </template>
    <template v-if="chartType === '6'">
      <BugTrendChartVue />
    </template>
    <template v-if="chartType === '7'">
      <BugRemainTrend />
    </template>
  </Card>
</template>
<script lang="ts" setup>
  import { Card, RadioButton, RadioGroup } from 'ant-design-vue';
  import BugMajorChart from './charts/BugMajorChart.vue';
  import BugRemainChart from './charts/BugRemainChart.vue';
  // import BugFixChart from './charts/BugFixChart.vue';
  import BugDisChart from './charts/BugDisChart.vue';
  import BugModuleCharVue from './charts/BugModuleChar.vue';
  import BugTrendChartVue from './charts/BugTrendChart.vue';
  import BugRemainTrend from './charts/BugRemainTrend.vue';
  import SelectInfo from './SelectInfo.vue';
  import { ref, watch } from 'vue';
  import { useProjectBugStore } from '@/store/modules/projectBug';

  const chartType = ref<string>('7');
  const { clearBugFilter } = useProjectBugStore();

  watch(chartType, () => {
    clearBugFilter();
  });
</script>
