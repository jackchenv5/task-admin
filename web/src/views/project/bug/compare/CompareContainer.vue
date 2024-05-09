<template>
  <div class="my-2">
    <Card size="small">
      <span class="mx-4">
        <RadioGroup v-model:value="chartType">
          <RadioButton value="1">缺陷平均修复周期</RadioButton>
          <RadioButton value="2">缺陷发现效率</RadioButton>
          <RadioButton value="3">缺陷发现分布</RadioButton>
          <RadioButton value="4">缺陷发现趋势</RadioButton>
        </RadioGroup>
      </span>
      <span><SelectInfo /></span>
    </Card>
  </div>

  <Card>
    <template v-if="chartType === '1'">
      <FixChart />
    </template>
    <template v-if="chartType === '2'">
      <Efficient />
    </template>
    <template v-if="chartType === '3'">
      <Dis />
    </template>
    <template v-if="chartType === '4'">
      <Trend />
    </template>
  </Card>
</template>
<script lang="ts" setup>
  import { Card, RadioButton, RadioGroup } from 'ant-design-vue';
  import SelectInfo from './SelectInfo.vue';
  import { ref, watch } from 'vue';
  import { useProjectBugStore } from '@/store/modules/projectBug';
  import FixChart from './charts/Fix.vue';
  import Efficient from './charts/Efficient.vue';
  import Dis from './charts/Dis.vue';
  import Trend from './charts/Trend.vue';

  const chartType = ref<string>('3');
  const { clearBugFilter } = useProjectBugStore();

  watch(chartType, () => {
    clearBugFilter();
  });
</script>
