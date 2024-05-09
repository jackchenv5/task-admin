<template>
  <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tab-change="onTabChange"
  >
    <p v-if="activeKey === 'tab1'">
      <VisitAnalysis />
    </p>
    <p v-if="activeKey === 'tab2'">
      <VisitAnalysisBar />
    </p>
    <p v-if="activeKey === 'tab3'">
      <BugAnalysisBar />
    </p>
    <p v-if="activeKey === 'tab4'">
      <VisitAnalysis />
    </p>
  </Card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import VisitAnalysis from './VisitAnalysis.vue';
  import VisitAnalysisBar from './VisitAnalysisBar.vue';
  import BugAnalysisBar from './BugAnalysisBar.vue';

  const activeKey = ref('tab1');

  const tabListTitle = [
    {
      key: 'tab1',
      tab: '缺陷发现趋势图',
    },
    {
      key: 'tab2',
      tab: '缺陷遗留趋势',
    },
    {
      key: 'tab3',
      tab: '开发视角缺陷分布图',
    },
    {
      key: 'tab4',
      tab: '遗留缺陷趋势',
    },
  ];

  function onTabChange(key) {
    activeKey.value = key;
  }
</script>
