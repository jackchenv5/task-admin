<template>
  <el-container>
    <el-row style="width: 100vw;margin-top:2vh">
      <el-col :span="12">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item><a :href="projectUrl">项目:{{ projectName }}</a></el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="12">
        <el-button @click="handlerEdit" :icon="Edit" circle style="margin-right: 20px"/>
        <el-popover placement="top-start" title="关注列表" width="600" trigger="hover">
          <template #reference>
            <el-badge :value=focusNum>
              <el-button :icon="List" circle @click="getFocus"/>
            </el-badge>
          </template>
          <div>
            <el-alert v-for="item in focusProjectNames" :title="item" type="info" :closable="false"/>
          </div>
        </el-popover>
        <el-button :type="isFocusType" @click="handlerFocus" :icon="Star" circle style="margin-left: 20px"/>
        <el-button @click="handleCompare" :icon="Histogram"  circle style="margin-right: 20px"></el-button>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup>
import {ref, onMounted, computed,} from "vue"
import {ElMessage, ElMessageBox} from 'element-plus'
import {
  List,
  Star,
  Histogram,
  Edit
} from '@element-plus/icons-vue'
import {userProjectStore} from "../../stores/Project"
import {storeToRefs} from "pinia";

const props = defineProps(['projectName', 'projectId', 'projectUrl', 'projectType'])

// const focusProjects = ref({data: []})
const homeUrl = import.meta.env.VITE_MAIN_URL
const projectStore = userProjectStore()
const {focusProjectNames} = storeToRefs(projectStore)
const {updateFocusProjects,setFocusProject, isFocusProject, getAlias, setAlias} = projectStore

const isFocusType = ref("")

const focusNum = computed(() => {
  return focusProjectNames.value.length
})

onMounted(() => {
  updateFocusProjects()
  isFocusProject(props.projectId).then((x) => {
    isFocusType.value = x ? 'warning' : ''
  })
})

const handlerFocus = () => {
  //根据当前状态设置操作类型
  const opt = isFocusType.value === "warning" ? "delete" : "add"
  //根据操作类型设置成功后的type值
  const successStatus = opt === "add" ? "warning" : ""
  setFocusProject(props.projectId, opt).then(x => {
    if (x) isFocusType.value = successStatus
  })
}

const handlerEdit = async () => {
  const ret = await getAlias(props.projectId)
  const tip = '只用于后端查询,不改变界面显示'
  const inputValue = ret['alias'] ? ret['alias']:''
  ElMessageBox.prompt(tip, '请输入别名', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',
    inputValue:inputValue
  }).then( async ({value}) => {
    const status = await setAlias(props.projectId,value)
    console.log('status',status)
    if (status) ElMessage({type: 'success',message: `别名已提交:${value}`,})
    else ElMessage({type: 'error',message: `别名提交失败:${value}`,})
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '操作取消！',
    })
  })
}

const handleCompare = () =>{
  location.href = `#/project/budget/compare`
}
</script>


<style scoped>
.margin20 {
  margin-left: 20px;
}
</style>
