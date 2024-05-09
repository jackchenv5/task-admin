<template>
  <div style="display: flex;">
    <div ref="chart1" style="width: 52vw; height: 45vh;"></div>
    <div style="width: 48vw; height: 45vh;display: flex;flex-direction: column">
      <div ref="chart3" style="width: 48vw; height: 22.5vh;"></div>
      <div ref="chart2" style="width: 48vw; height: 22.5vh;"></div>
    </div>
  </div>
</template>

<script setup>

import {watch,computed, ref} from "vue";
import {useArrayFactory, getSeries, getOption, deleteZeroIndex} from "../../common/util"
import * as echats from "echarts";

const props = defineProps(['data','title'])



watch(props.data, () => {
  initL1Status()
})


const chart1 = ref()
const chart2 = ref()
const chart3 = ref()
//当前选中的部门
const selectedL1 = ref('')

//当前选中的二级部门
const selectedL2 = ref('')


//监控部门变化
watch(selectedL1, (newDepart) => {
  initL2Status()
})

//监控二级部门变化
watch(selectedL2, () => {
  initL3Status()
})


function initL1Status() {
  const l1Data = props.data
  let l1NameList = []
  let seriesData = {}
  const seriesChartData = []
  //获取所有项目名和 部门列表
  l1Data.forEach(x => {
    seriesData[x.name] = []
    const proxyDepart = useArrayFactory(x.data)
    const tmpDeparts = proxyDepart['allNames']
    //获取所有的部门
    tmpDeparts.forEach(x => {
      if (l1NameList.indexOf(x) == -1) l1NameList.push(x)
    })
  })

  l1NameList.forEach(x => {
    l1Data.forEach(y => {
      const proxyTmpData = useArrayFactory(y.data)
      const tmpl1Data = proxyTmpData[x]
      seriesData[y.name].push(tmpl1Data['value'])
    })
  })
  //去除都为0的部门
  const [retDataList, retSeriesData] = deleteZeroIndex(l1NameList, seriesData)
  for (let item in retSeriesData) {
    seriesChartData.push(getSeries(retSeriesData[item], item))
  }
  const option = getOption(props.title, retDataList, seriesChartData, true,"5%")
  const chartL1 = echats.init(chart1.value)
  chartL1.setOption(option)
  //设置一个默认选中的部门
  selectedL1.value = retDataList[0]
  //部门点击事件
  chartL1.on('click', (params) => {
    selectedL1.value = params.name
  })
}

function initL2Status() {
  // {name:'p1',data:[name,value,child]}
  const subL1Data = getL1Data()
  const l2NameList = []
  const seriesData = {}
  const seriesChartData = []

  //获取所有二级部门列表
  subL1Data.forEach(x => {
    seriesData[x.name] = []
    const proxySubDepart = useArrayFactory(x.data)
    const tmpSubDeparts = proxySubDepart['allNames']
    //获取所有的部门
    tmpSubDeparts.forEach(x => {
      if (l2NameList.indexOf(x) == -1) l2NameList.push(x)
    })
  })
  l2NameList.forEach(x => {
    subL1Data.forEach(y => {
      const proxyTmpData = useArrayFactory(y.data)
      const tmpl1Data = proxyTmpData[x]
      seriesData[y.name].push(tmpl1Data ? tmpl1Data['value'] : 0)
    })
  })
  //去除都为0的二级部门
  const [retDataList, retSeriesData] = deleteZeroIndex(l2NameList, seriesData)
  for (let item in retSeriesData) {
    seriesChartData.push(getSeries(retSeriesData[item], item))
  }
  const option = getOption(`${selectedL1.value}|二级部门对比`, retDataList, seriesChartData)
  const chartSubDepart = echats.init(chart2.value)
  chartSubDepart.setOption(option)

  //设置一个默认选中的二级部门
  selectedL2.value = retDataList[0]
  //部门点击事件
  chartSubDepart.on('click', (params) => {
    selectedL2.value = params.name
  })

}

function initL3Status() {
  const l3Data = getL3Data()
  const l2NameList = []
  const seriesData = {}
  const seriesChartData = []

  //获取所有二级部门列表
  l3Data.forEach(x => {
    seriesData[x.name] = []
    const proxySubDepart = useArrayFactory(x.data)
    const tmpSubDeparts = proxySubDepart['allNames']
    //获取所有的部门
    tmpSubDeparts.forEach(x => {
      if (l2NameList.indexOf(x) == -1) l2NameList.push(x)
    })
  })
  l2NameList.forEach(x => {
    l3Data.forEach(y => {
      const proxyTmpData = useArrayFactory(y.data)
      const tmpl1Data = proxyTmpData[x]
      seriesData[y.name].push(tmpl1Data ? tmpl1Data['value'] : 0)
    })
  })
  //去除都为0的二级部门
  const [retDataList, retSeriesData] = deleteZeroIndex(l2NameList, seriesData)
  for (let item in retSeriesData) {
    seriesChartData.push(getSeries(retSeriesData[item], item))
  }
  const option = getOption(`${selectedL2.value}|活动对比`, retDataList, seriesChartData)
  const chartSubDepart = echats.init(chart3.value)
  chartSubDepart.setOption(option)
}

function getL1Data() {
  return props.data.map(x => {
    const proxyL1Data = useArrayFactory(x.data) //当前项目数据
    const selectedL1Data = proxyL1Data[selectedL1.value] //当前部门数据
    return {name: x.name, data: selectedL1Data['child']}
  })
}

function getL3Data() {
  return props.data.map(x => {
    const proxyL1Data = useArrayFactory(x.data) //当前项目数据
    const selectedL1Data = proxyL1Data[selectedL1.value] //当前部门数据
    const proxySubL1Data = useArrayFactory(selectedL1Data['child']) //当前二级部门数据
    const proxySubDepartJob = proxySubL1Data[selectedL2.value] //当前二级部门数据
    const proxyL3Data =proxySubDepartJob?proxySubDepartJob['child']:[]  //当前二级部门投入数据
    return {name: x.name, data: proxyL3Data}
  })
}


</script>

<style scoped>

</style>