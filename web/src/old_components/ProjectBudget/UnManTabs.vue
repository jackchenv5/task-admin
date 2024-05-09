<template>
  <el-tabs>
    <el-tab-pane label="变动费用科目">
      <div ref="main" id="mainBar" class="tabContent"></div>
    </el-tab-pane>
    <el-tab-pane label="研发样机">
      <el-table :data="tableData" class="tabContent">
        <el-table-column v-for="item in tableHeader" :prop="item" :label="item"/>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="EIP科目">
      <div ref="main5" class="tabContent"></div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import {nextTick, watch, onMounted, computed, ref} from "vue";
import * as echarts from "echarts";

const props = defineProps(['tableData', 'unmanChangeData', 'unmanEipData'])
// console.log('tableData',props.tableData.value)
let tableHeader = computed(() => {
  return props.tableData.length != 0 ? Object.keys(props.tableData[0]) : []
})
const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value
const main5 = ref() // 使用ref创建虚拟DOM引用，使用时用main.value
async function initUnman() {
  // 基于准备好的dom，初始化echarts实例
  await nextTick()
  // tableHeader = props.tableData.length != 0 ? Object.keys(props.tableData[0]):[]
  // console.log(tableHeader)
  if (!(props.unmanChangeData.data instanceof Array) || !(props.unmanEipData.data instanceof Array)) return
  const myChart = echarts.init(main.value)
  const myChart5 = echarts.init(main5.value)
  // 指定图表的配置项和数据
  const option = {
    title: {
      text: ''
    },
    grid: {
      left: "2%",
      bottom: "5%"
    },
    tooltip: {},
    legend: {},
    xAxis: {
      data: props.unmanChangeData.data.map(x => x.name)
    },
    yAxis: {},
    series: [
      {
        name: '费用',
        type: 'bar',
        data: props.unmanChangeData.data.map(x => x.value)
      }
    ]
  };
  const option5 = {
    title: {
      text: ''
    },
    grid: {
      left: "2%",
      bottom: "5%"
    },
    tooltip: {},
    legend: {},
    xAxis: {
      data: props.unmanEipData.data.map((x) => x.name)
    },
    yAxis: {},
    series: [
      {
        name: '执行',
        type: 'bar',
        data: props.unmanEipData.data.map((x) => x.value[1])
      },
      {
        name: '预算',
        type: 'bar',
        data: props.unmanEipData.data.map((x) => x.value[0])
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  myChart5.setOption(option5);
}

onMounted(
    () => {
      initUnman()
    }
)

//监听option变化
watch([props.unmanChangeData, props.unmanEipData], (newData) => {
  console.log('newData', newData)
  initUnman()
})

</script>

<style scoped>
.tabContent {
  width: 98vw;
  height: 47vh;
}
</style>