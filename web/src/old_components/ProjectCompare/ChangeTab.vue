<template>
  <div style="display: flex;">
    <div ref="chartDom" style="width: 98vw; height: 45vh;"></div>
  </div>
</template>

<script setup>
import {watch, ref, onMounted} from "vue"

import {useArrayFactory, getSeries, getOption, deleteZeroIndex} from "../../common/util"
import * as echats from "echarts";

const props = defineProps(['data', 'title'])
const chartDom = ref()
watch(props.data, () => {
  init()
})

function init() {
  let nameList = []
  let seriesData = {}
  const seriesChartData = []
  props.data.forEach(x => {
    seriesData[x.name] = []
    const proxyDepart = useArrayFactory(x.data)
    const tmpDeparts = proxyDepart['allNames']
    //获取所有的name
    tmpDeparts.forEach(x => {
      if (nameList.indexOf(x) == -1) nameList.push(x)
    })
  })
  nameList.forEach(x => {
    props.data.forEach(y => {
      const proxyTmpData = useArrayFactory(y.data)
      const tmpData = proxyTmpData[x]
      let tmpValue
      if(tmpData)  tmpValue = tmpData['value'] instanceof Array ? tmpData['value'][0]:tmpData['value']
      else tmpValue = 0
      seriesData[y.name].push(tmpValue)
    })
  })

  //去除都为0的
  const [retDataList, retSeriesData] = deleteZeroIndex(nameList, seriesData)
  for (let item in retSeriesData) {
    seriesChartData.push(getSeries(retSeriesData[item], item))
  }
  const option = getOption(props.title, retDataList, seriesChartData, true)
  const chart = echats.init(chartDom.value)
  chart.setOption(option)
}

</script>

<style scoped>

</style>