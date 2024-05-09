<template>
  <el-tabs tab-position="top" class="demo-tabs" v-model="activeTabName" @tab-click="handleClick">
    <el-tab-pane label="部门投入" name="depart" style="display: flex">
      <div ref="departPieContainer" style="width: 25vw; height: 50vh"></div>
      <div ref="subDepartContainer" style="width: 53vw; height: 50vh;"></div>
      <div style="width: 22vw; height: 50vh;display: flex;flex-direction: column;justify-content:space-around;">
        <el-card v-if="overThresholdDepart.length" shadow="hover" style="height: 13vh">
          <div class="card-header">
            <span>人力超预算部门：</span>
          </div>
          <div  style="display: flex;height: 8vh; justify-content: space-around;margin-top: 7px;flex-wrap: wrap;align-content: space-around">
            <el-tag  v-for="item in overThresholdDepart" :type="item.type" effect="dark" @click="selectedDepart=item.depart">{{ item.depart }}</el-tag>
          </div>


        </el-card>
        <el-card shadow="hover">
          <div>当前选中部门：{{ selectedDepart }}</div>
          <div v-if="selectedSubDepart">当前选中二级部门：{{ selectedSubDepart }}</div>

        </el-card>
        <el-card shadow="hover">
          <MpStatistic :percent="selectedPercent" progress-label="执行率" statistic-title="执行"
                       :statistic-value="selectedCast"
                       :statistic-footer-info="footInfo" :statistic-footer-number="selectedBudget"></MpStatistic>
        </el-card>
        <el-card shadow="hover">
          <el-text class="mx-1">调整人力预算：</el-text>
          <el-input-number v-model="selectedBudget" step="10"/>
          <el-button style="margin-left: 20px" @click="handleCommit">提交</el-button>
        </el-card>
      </div>
    </el-tab-pane>
    <el-tab-pane label="开发活动" name="job" style="display: flex">
      <div ref="jobPieContainer" style="width: 25vw; height: 50vh"></div>
      <div ref="subJobContainer" style="width: 73vw; height: 50vh"></div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
//组件属性
const props = defineProps(['manDepartData', 'manJobData', 'projectId'])

import {onMounted, ref, computed, watch} from "vue"
import * as echarts from "echarts"
import MpStatistic from "../customs/MpStatistic.vue"
import mpServices from "../../services/mpServices"
import {ElMessage} from 'element-plus'
//tabs属性
const activeTabName = ref('depart')

watch(props.manDepartData, () => {
  initTab(activeTabName.value)
})


const handleClick = (tab) => {
  // activeTabName.value = ""
  initTab(tab.paneName)
}

const handleCommit = () => {
  setDepartCustomData(selectedBudget.value, selectedDepart.value, selectedSubDepart.value)
}

const departPieContainer = ref() // 使用ref创建虚拟DOM引用，departPieContainer.value
const subDepartContainer = ref()
const jobPieContainer = ref()
const subJobContainer = ref()


//当前选中部门和二级部门初始化
const selectedDepart = ref("")
const selectedSubDepart = ref("")
const selectedCast = ref(0)
const selectedBudget = ref(0)
const overThresholdDepart = ref([])

const selectedPercent = computed(() => {
  if (selectedBudget.value === 0 || selectedBudget.value === "") return 0
  return Math.round(100 * selectedCast.value / selectedBudget.value)
})

const footInfo = computed(() => {
  return (selectedBudget.value === 0 || selectedBudget.value === "") ? `预算未配置` : '预算'
})

//监听部门
watch(selectedDepart, (newDepart) => {
  //初始化部门柱状图
  initDepartStatus(newDepart)

})

//监听二级部门
watch(selectedSubDepart, () => {
  initSubDepartStatus()
})

//部门数据初始化
async function initManDepart() {

  if (!(props.manDepartData.data instanceof Array)) return

  //设置初始化部门属性值

  const departData = props.manDepartData.data[0]
  selectedDepart.value = departData['部门']

  //初始化部门饼图
  initDepartPie()

  //初始化超预算部门
  initOverThresholdDepart()

}

//
const types = ['success','info','danger','warning','']
function initOverThresholdDepart() {
  overThresholdDepart.value = []
  props.manDepartData.data.forEach(x => {
    const depart = x['部门']
    const cast = x['工时']
    mpServices.project("get_custom_man_month", {
      "depart": depart,
      "sub_depart": "",
      "project_id": props.projectId,
    }).then(
        (ret) => {
          const budget = ret.data['man_month'] ? ret.data['man_month'] : 0
          if (!budget) return
          const remain = Number(budget - cast)
          if (remain > 0) return
          const remainPercent = 100 * remain / budget
          if( overThresholdDepart.value.filter(x=>x['depart'] === depart).length === 1) return
          overThresholdDepart.value.push({depart: x['部门'], cast: x['工时'],type:types[remain%(types.length)], percent: remainPercent})
        })
  })
}


function initDepartStatus(newDepart) {

  //1.清空selectedSubDepart.value值
  selectedSubDepart.value = ""


  //获取部门echarts option 和执行工时
  const [option, cast] = getDepartBarOptions(newDepart)

  //部门执行工时
  selectedCast.value = cast

  //渲染部门柱状图,先清理、后台渲染
  echarts.dispose(subDepartContainer.value)
  const manSubDepartBar = echarts.init(subDepartContainer.value)
  manSubDepartBar.setOption(option)

  //初始化柱状图点击事件
  manSubDepartBar.on('click', function (params) {
    selectedSubDepart.value = params.name
  })

  //初始化部门预算
  getDepartCustomData(newDepart)
}

// 获取部门柱状图选项和执行工时
function getDepartBarOptions(depart) {
  const departData = props.manDepartData.data.filter(x => x['部门'] === depart)[0]
  const subDepartData = departData['二级部门列表'].sort((x, y) => y['工时'] - x['工时']).filter(z=>z['工时'] > 0)
  //option 数据
  const title = departData['部门']
  const subDepartNamesList = subDepartData.map(x => (x['二级部门']))
  const subDepartDataList = subDepartData.map(x => (x['工时']))
  let optionManSubDepartBar = {
    title: {
      text: title,
      left: "8%",
    },
    xAxis: {
      type: 'category',
      data: subDepartNamesList
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      top: "55%",
      left: "3%",
      right: "3%",
      bottom: "4.5%"
    },
    series: [
      {
        data: subDepartDataList,
        label:{
          show:true,
        },
        type: 'bar'
      },
    ]
  };
  return [optionManSubDepartBar, departData['工时']]
}

function initDepartPie() {
  //渲染部门饼图
  const manDepartPie = echarts.init(departPieContainer.value)
  const optionManDepartPie = {
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '部门投入',
        type: 'pie',
        radius: ['28%', '48%'],
        center: ['50%', '60%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter:(p)=>{
            return `${p.name}(${p.value}/人月)`
          }
        },
        labelLine: {
          length:5,
          length2:5
        },
        data: props.manDepartData.data.map(x => ({name: x['部门'], value: x['工时']})).filter(x=>x.value > 0)
      }
    ]
  }
  manDepartPie.setOption(optionManDepartPie)
  //初始化点击行为
  manDepartPie.on('click', function (params) {
    let curDepart = params.name
    selectedDepart.value = curDepart
    initDepartStatus(selectedDepart.value)
  })
}

async function initManJob() {
  // 基于准备好的dom，初始化echarts实例

  if (!(props.manJobData.data instanceof Array)) return

  //开发活动初始化
  let manDevelopPie = echarts.init(jobPieContainer.value);
  let manDevelopBar = echarts.init(subJobContainer.value);
  //先初始化化开发活动饼图
  let optionManDevelopPie = {
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '部门投入',
        type: 'pie',
        radius: ['28%', '48%'],
        center: ['50%', '60%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter:(p)=>{
            return `${p.name}(${p.value}/人月)`
          }
        },
        labelLine: {
          length:5
        },
        data: props.manJobData.data.map(x => ({name: x['岗位'], value: x['工时']}))
      }
    ]
  }
  manDevelopPie.setOption(optionManDevelopPie)
  manDevelopPie.on('click', function (params) {
    const job = params.name
    const manJobInitData = props.manJobData.data.filter(x => x['岗位'] === job)[0]
    const subManJobInitData = manJobInitData['岗位细分列表'].sort((x, y) => y['工时'] - x['工时']).filter(x=>x['工时'] > 0)
    echarts.dispose(subJobContainer.value)
    let clickManSubJobBar = echarts.init(subJobContainer.value)
    let manJobOption = {
      title: {
        text: manJobInitData['岗位'],
        left: "8%",
      },
      xAxis: {
        type: 'category',
        data: subManJobInitData.map(x => (x['岗位细分']))
      },
      yAxis: {
        type: 'value'
      },
      label:{show:true},
      grid: {
        top: "55%",
        bottom: "4.5%"
      },
      series: [
        {
          data: subManJobInitData.map(x => (x['工时'])),
          label:{
            show:true,
          },
          type: 'bar'
        },
      ]
    };
    clickManSubJobBar.setOption(manJobOption);
    clickManSubJobBar.on('click', function (params) {
      const subJob = params.name
      setSubJobPieEchartsSeries(clickManSubJobBar, job, subJob)
    })
  })

  // 开发活动默认
  const manJobInitData = props.manJobData.data[0]
  const subManJobInitData = manJobInitData['岗位细分列表'].sort((x, y) => y['工时'] - x['工时'])
  let manJobOption = {
    title: {
      text: manJobInitData['岗位'],
      left: "8%",
    },
    xAxis: {
      type: 'category',
      data: subManJobInitData.map(x => (x['岗位细分']))
    },
    yAxis: {
      type: 'value'
    },
    label:{show:true},
    grid: {
      top: "55%",
      bottom: "4.5%"
    },
    series: [
      {
        data: subManJobInitData.map(x => (x['工时'])),
        type: 'bar'
      },
    ]
  };
  manDevelopBar.setOption(manJobOption);

  manDevelopBar.on('click', function (params) {
    const subJob = params.name
    setSubJobPieEchartsSeries(manDevelopBar, manJobInitData['岗位'], subJob)
  })

}

//更新二级部门饼图
function initSubDepartStatus() {
  //1. 获取二级部门option
  //2. 渲染二级部门岗位投入饼图
  //3. 获取二级部门人力预算

  const depart = selectedDepart.value
  const subDepart = selectedSubDepart.value
  if (subDepart === "") return
  const manSubDepartEcharts = echarts.getInstanceByDom(subDepartContainer.value);
  const myDepartData = props.manDepartData.data.filter(x => x['部门'] === depart)[0]
  const mySubDepartData = myDepartData['二级部门列表'].filter(x => x['二级部门'] === subDepart)[0]
  const jobData = mySubDepartData['岗位细分列表'].map(x => ({'name': x['岗位细分'], 'value': x['工时']})).filter(x=>x.value > 0)
  const seriesData = {
    title: {subtext: `${subDepart} | 岗位投入`},
    series: {
      id: 1,
      name: '岗位细分',
      type: 'pie',
      radius: '35%',
      center: ['55%', '25%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        formatter: function (params) {
          return `${params.name} (${params.value}/人月)`
        }
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      data: jobData
    }
  }
  manSubDepartEcharts.setOption(seriesData)

  //更新二级部门执行工时
  selectedCast.value = mySubDepartData['工时']

  //更新二级部门预算
  let curDepartBudget = getDepartCustomData(depart, subDepart)
  selectedBudget.value = curDepartBudget ? curDepartBudget : 0

}

//更新二级岗位饼图
function setSubJobPieEchartsSeries(echartsObj, Job, subJob) {
  const myJobData = props.manJobData.data.filter(x => x['岗位'] === Job)[0]
  const mySubJobData = myJobData['岗位细分列表'].filter(x => x['岗位细分'] === subJob)[0]
  const departData = mySubJobData['部门列表'].map(x => ({'name': x['部门'], 'value': x['工时']})).filter(x=>x.value > 0)
  let seriesData = {
    title: {subtext: `${subJob}岗位投入`},
    series: {
      id: 1,
      name: '部门细分',
      type: 'pie',
      radius: '35%',
      center: ['50%', '25%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        formatter: function (params) {
          return `${params.name} (${params.value}/人月)`
        }
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      data: departData
    }
  }
  echartsObj.setOption(seriesData)
}

//获取部门自定义人月
function getDepartCustomData(depart, subDepart = "") {
  mpServices.project("get_custom_man_month", {
    "depart": depart,
    "sub_depart": subDepart,
    "project_id": props.projectId,
  }).then(ret => {
    selectedBudget.value = ret.data['man_month'] ? ret.data['man_month'] : 0
  })
}

//设置部门自定义人月
function setDepartCustomData(data, depart, subDepart = "") {
  mpServices.project("set_custom_man_month", {
    "depart": depart,
    "sub_depart": subDepart,
    "project_id": props.projectId,
    "man_month": data
  }).then(ret => {
    if (ret.status === 500 || ret.status == 404) {
      ElMessage.error(`${depart} 设置预算失败！`)
      return
    }
    ElMessage({
      message: `${depart}设置预算值:${data}完成！`,
      duration: 2000,
      type: 'success',
    })
    initOverThresholdDepart()
  })
}

function initTab(panName = "") {
  if (panName === "job") {
    initManJob()
  } else {
    initManDepart()
  }
}

//切换完成后去要初始化
onMounted(
    () => {
      initTab()
    }
)

</script>

<style scoped>

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
</style>