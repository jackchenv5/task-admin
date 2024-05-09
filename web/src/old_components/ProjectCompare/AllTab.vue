<template>
  <div style="display: flex;">
    <div ref="chartAll" style="width: 93vw; height: 45vh;"></div>
    <div ref="switchMan" style="width: 5vw; height: 45vh;display: flex;flex-direction: column ">
      <el-button style="margin-top: 10px;" @click="selectType='all'">总投入</el-button>
      <el-button style="margin-top: 10px;" @click="selectType='man'">总人力</el-button>
      <el-button style="margin-top: 10px;" @click="selectType='unMan'">非人力</el-button>
    </div>
  </div>

</template>

<script setup>
//监控切换显示类型事件
import {watch, ref, onMounted} from "vue";
import * as echarts from "echarts";

const selectType = ref('all')

const props = defineProps(['data'])

const chartAll = ref()

watch(props.data, () => {
  //初始化三个图表
  initCharts()

})

watch(selectType, (type) => {
  initCharts()
})

function initCharts() {
  const chart = echarts.init(chartAll.value)
  const option = getOption(selectType.value)
  chart.setOption(option)
}

function getOption(type) {
  const xData = []
  let title
  let seriesData
  const dataAll = []
  const dataMan = []
  const dataUnMan = []

  props.data.forEach(x => {
    xData.push(x.name)
    dataAll.push(Math.round(x.data.all))
    dataMan.push(Math.round(x.data.man))
    dataUnMan.push(Math.round(x.data.unMan))
  })

  switch (type) {
    case "all":
      title = "总投入/万元"
      seriesData = getSeries(dataAll)
      break
    case "man":
      title = "人力投入/万元"
      seriesData = getSeries(dataMan)
      break
    case "unMan":
      title = "非人力/万元"
      seriesData = getSeries(dataUnMan)
      break
    default:
      console.log(`${type} not support!`)
  }
  const option = {
    title: {text: title},
    xAxis: {
      type: 'category',
      data: xData
    },
    yAxis: {
      type: 'value'
    },
    series: seriesData
  }
  return option
}

function getSeries(data, type = 'bar') {
  return {
    data: data,
    type: type,
    label: {show: true},
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(180, 180, 180, 0.2)'
    }
  }
}
</script>

<style scoped>

</style>