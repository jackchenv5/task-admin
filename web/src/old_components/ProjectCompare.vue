<template>
  <PageWrapper>
    <CompareBreadcrumb project-type="项目对比"/>
    <el-divider/>
    <div style="display: flex;flex-direction: column;justify-content: space-between;height: 82vh">
      <div style="display: flex;justify-content:space-around;height: 25vh;">
        <div class="card1">
          <div style="width: 48vw;height:20vh; display: flex;flex-direction: column;justify-content: space-around">
            <BoardHeader :data="compareData.cardData"></BoardHeader>
            <DistributionProgress :data="compareData.progressData"></DistributionProgress>
          </div>
        </div>
        <Collapse :data="focusProjectItems"></Collapse>
      </div>
      <el-card style="height: 55vh;">
        <el-tabs
          v-model="activeTab" tabPosition="top"
          class="demo-tabs"
        >
          <el-tab-pane label="总览" name="allTab">
            <AllTab :data="compareData.allData"></AllTab>
          </el-tab-pane>
          <el-tab-pane label="部门投入" name="manDepartTab">
            <ManTab :data="compareData.departData" title="部门投入"></ManTab>
          </el-tab-pane>
          <el-tab-pane label="开发活动" name="manJobTab">
            <ManTab :data="compareData.jobData" title="开发活动"></ManTab>
          </el-tab-pane>
          <el-tab-pane label="变动费用" name="changeTab">
            <ChangeTab :data="compareData.change" title="变动费用"></ChangeTab>
          </el-tab-pane>
          <el-tab-pane label="EIP数据" name="eipTab">
            <ChangeTab :data="compareData.eip"></ChangeTab>
          </el-tab-pane>
          <el-tab-pane label="研发样机" name="prototypeTab">
            <UnManTab :data="compareData.prototype"></UnManTab>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </PageWrapper>
</template>

<script setup>
import { PageWrapper } from '@/components/Page'
import CompareBreadcrumb from './ProjectCompare/CompareBreadcrumb.vue'
import CompareCard from './customs/CompareCard.vue'
import AllTab from "./ProjectCompare/AllTab.vue"
import ManTab from "./ProjectCompare/ManTab.vue"
import ChangeTab from "./ProjectCompare/ChangeTab.vue"
import Collapse from "./ProjectCompare/Collapse.vue"
import DistributionProgress from "./customs/DistributionProgress.vue"
import BoardHeader from "./customs/boardHeader.vue"

import {ref, computed, onMounted, watch, h} from 'vue'
import * as echarts from "echarts";

import {userProjectStore} from "../stores/Project"
import {storeToRefs} from "pinia";

import {getBriefName} from "../common/util"

import {ElDivider} from 'element-plus'

const size = ref(10)
const spacer = h(ElDivider, {direction: 'vertical'})

const projectStore = userProjectStore()

const {updateFocusProjects} = projectStore
const {focusProjectIds, focusProjects, focusProjectItems, allProjectBudgetDataDone} = storeToRefs(projectStore)

// 响应数据定义区

//当前激活的tab页 可能的值：allTab manDepartTab
const activeTab = ref('manDepartTab')

const compareData = ref({
  progressData: [],
  cardData: [],
  allData: [],
  departData: [],
  jobData: [],
  change: [],
  prototype: [],
  eip: []
})

// 响应数据定义区 END


// 监控对比数据加载
// updateFocusProjects()
watch([allProjectBudgetDataDone, focusProjectIds], () => {
  let tmpALL = 0
  let tmpMax = 0
  let tmpMin = 0
  let tmpNum = focusProjectIds.value.length

  if (allProjectBudgetDataDone.value) {
    Object.values(focusProjects.value).forEach((x, index) => {
      const tmpCast = x['budgetData']['project_budget_info']['cast']
      if (tmpMax < tmpCast) tmpMax = tmpCast
      if (index === 0) tmpMin = tmpCast
      if (tmpMin > tmpCast) tmpMin = tmpCast
      tmpALL += tmpCast
    })
    compareData.value.cardData = ref([
      {title: '对比项目数', value: `${tmpNum}个`},
      {title: '平均执行', value: `${parseInt(tmpALL / tmpNum)}万元`},
      {title: '最大执行', value: `${parseInt(tmpMax)}万元`},
      {title: '最小执行', value: `${parseInt(tmpMin)}万元`}
    ])

    // 清理数据,不能用新的数组替换，会破坏数据的响应性
    focusProjectIds.value.forEach(() => {
      compareData.value.progressData.pop()
      compareData.value.allData.pop()
      compareData.value.departData.pop()
      compareData.value.jobData.pop()
      compareData.value.change.pop()
      compareData.value.prototype.pop()
      compareData.value.eip.pop()
    })
    const comPareNum = focusProjectIds.value.length
    for (let projectId in focusProjects.value) {
      //根据算法生成项目代号：前6个字符加后4个字符：getBriefName(name)
      const projectName = focusProjects.value[projectId]['name']
      const projectBudgetData = focusProjects.value[projectId]['budgetData']
      const name = getBriefName(projectName, comPareNum)

      //追加总览数据
      const allData = projectBudgetData['project_budget_info']
      const manData = projectBudgetData['project_man_info']
      const unManData = projectBudgetData['project_unman_info']
      if (!allData || !manData || !unManData) continue
      const allChartData = {all: allData['cast'], man: manData['cast'], unMan: unManData['cast']}
      compareData.value.allData.push({name: name, data: allChartData})
      //追加总览数据 END
      //追加项目分布数据
      compareData.value.progressData.push({name: projectName, value: allData['cast']})

      //追加人力数据
      const departData = projectBudgetData['man_depart_data']
      const convertDepartData = departData.map(x => ({
        name: x['部门'],
        value: x['工时'],
        child: x['二级部门列表'].map(y => ({
          name: y['二级部门'].length > 5 ? `${y['二级部门'].substring(0, 5)}..` : y['二级部门'],
          value: y['工时'],
          child: y['岗位细分列表'].map(z => ({
            name: z['岗位细分'],
            value: z['工时'],
          }))
        }))
      }))
      compareData.value.departData.push({name: name, data: convertDepartData})
      // tmpDepartData.push({name: name, data: convertDepartData})
      const jobData = projectBudgetData['man_job_data']
      const convertJobData = jobData.map(x => ({
        name: x['岗位'],
        value: x['工时'],
        child: x['岗位细分列表'].map(y => ({
          name: y['岗位细分'],
          value: y['工时'],
          child: y['部门列表'].map(z => ({
            name: z['部门'],
            value: z['工时']
          }))
        }))
      }))
      compareData.value.jobData.push({name: name, data: convertJobData})
      //追加人力数据 END

      //追加非人力数据
      const changeData = projectBudgetData['unman_change_data']
      compareData.value.change.push({name: name, data: changeData})

      const prototypeData = projectBudgetData['unman_prototype_data']
      compareData.value.prototype.push({name: name, data: prototypeData})

      const eipData = projectBudgetData['unman_eip_data']
      compareData.value.eip.push({name: name, data: eipData})
      //追加非人力数据 END

    }
  }

})

// 监控对比数据加载  END


onMounted(() => {
  updateFocusProjects()
})


</script>

<style scoped>
.card1 {
  background-color: #ffffff;
  padding: 20px;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 20px;
  font-weight: 600;
}


</style>
