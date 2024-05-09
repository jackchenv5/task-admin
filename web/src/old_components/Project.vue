<template>
  <PageWrapper>
    <ProjectBreadcrumb :project-name="projectName" :project-id="projectId" :project-url="projectUrl"
                       project-type="预算"></ProjectBreadcrumb>
    <el-divider/>
    <ProjectCards @click-project-un-man="showManpower=false" @click-project-man="showManpower=true"
                  :avatar="avatar"
                  :percentAll="percentAll" :projectCast="projectCast" :projectBudget="projectBudget"
                  :percent-un-man="percentUnMan" :project-un-man-cast="projectUnManCast"
                  :project-un-man-budget="projectUnManBudget"
                  :percent-man="percentMan" :project-man-cast="projectManCast"
                  :project-man-budget="projectManBudget"></ProjectCards>
    <el-card class="box-content">
      <ManTabs v-if="showManpower" :man-depart-data="manDepartData" :man-job-data="manJobData"
               :project-id="projectId"></ManTabs>
      <UnManTabs v-else :table-data="prototypeTable" :unman-change-data="unmanChangeData"
                 :unman-eip-data="unmanEipData"></UnManTabs>

    </el-card>
  </PageWrapper>
</template>
<script setup>
import { PageWrapper } from '@/components/Page'
import ProjectBreadcrumb from './ProjectBudget/ProjectBreadcrumb.vue'
import ProjectCards from "./ProjectBudget/ProjectCards.vue"
import UnManTabs from "./ProjectBudget/UnManTabs.vue"
import ManTabs from "./ProjectBudget/ManTabs.vue"
import {useTransition} from "@vueuse/core";
import {useRoute} from "vue-router";

import {ref, watch, onMounted} from "vue"
import mpServices from "../services/mpServices"

//初始化渲染数据
//项目名
let projectName = ref("")

const route = useRoute()
const projectId = ref(route.params.projectId === ":projectId" ? 610 : route.params.projectId)
const projectUrl = ref(`${import.meta.env.VITE_MAIN_URL}/project/detail/${projectId.value}`)


onMounted(() => {
  getProjectData()
})
// 当参数更改时获取用户信息
watch(
  () => {
    return route.params.projectId
  },
  projectId => {
    if (!projectId) return
    projectId.value = projectId
  }
)

watch(projectId, newProjectId => {
  getProjectData()
})

//项目头像
let avatar = ref("")

//tabs切换标记
let showManpower = ref(true)

//项目信息
let projectInfo = ref({})

//总执行
const projectCastData = ref(0)
const projectCast = useTransition(projectCastData, {
  duration: 1500,
})

//总预算
const projectBudgetData = ref(0)
const projectBudget = useTransition(projectBudgetData, {
  duration: 1500,
})

//总执行率
const percentAllData = ref(0)
const percentAll = useTransition(percentAllData, {
  duration: 100,
})

//非人力数据
const projectUnManCastData = ref(0)
const projectUnManCast = useTransition(projectUnManCastData, {
  duration: 1500,
})
const projectUnManBudget = ref(0)
const percentUnMan = ref(0)

//人力数据
const projectManCastData = ref(0)
const projectManCast = useTransition(projectManCastData, {
  duration: 1500,
})
projectManCastData.value = 500

const projectManBudget = ref(0)
const percentMan = ref(0)

//获取项目数据
//数据表
let prototypeTable = ref([])

//变动费用科目 echarts 数据
const unmanChangeData = ref({data: {}});
//Eip echarts 数据
const unmanEipData = ref({data: {}});

//人力数据
const manDepartData = ref({data: {}});
const manJobData = ref({data: {}});

const getProjectData = () => {
  console.log('================getProjectData======')
  mpServices.project('get_budget_summary', {'project_id': projectId.value}).then(ret => {
    const data = ret.data
    prototypeTable.value = data['非人力执行_研发样机列表']
    projectName.value = data['project_info']['project_name']
    avatar = data['project_info']['project_avatar']
    //总览
    projectCastData.value = data['project_budget_info']['cast']
    projectBudgetData.value = data['project_budget_info']['budget']
    percentAllData.value = data['project_budget_info']['percent']
    //非人力
    projectUnManCastData.value = data['project_unman_info']['cast']
    projectUnManBudget.value = data['project_unman_info']['budget']
    percentUnMan.value = data['project_unman_info']['percent']

    //人力
    projectManCastData.value = data['project_man_info']['cast']
    projectManBudget.value = data['project_man_info']['budget']
    percentMan.value = data['project_man_info']['percent']

    //table
    prototypeTable.value = data['unman_prototype_data']

    //变动费用科目数据
    unmanChangeData.value.data = data['unman_change_data'].sort((x, y) => y.value - x.value);
    //Eip echarts 数据
    unmanEipData.value.data = data['unman_eip_data'].sort((x, y) => y.value[1] - x.value[1]);

    manDepartData.value.data = data['man_depart_data'].sort((x, y) => y['工时'] - x['工时'])
    manJobData.value.data = data['man_job_data'].sort((x, y) => y['工时'] - x['工时'])
  })
}

</script>

<style>


.box-content {
  height: 60vh;
  margin: 0 2%;
}


</style>
