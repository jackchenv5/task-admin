<template>
  <el-row :gutter="10" class="margin20" style="margin: 1% 2%;">
    <el-col :span="2">
      <ProjectAvatar :avatar="avatar"></ProjectAvatar>
    </el-col>
    <el-col :span="10">
      <ProjectAll :colors="colors" :percentAll="percentAll" :projectCast="projectCast" :projectBudget="projectBudget"></ProjectAll>
    </el-col>
    <el-col :span="6">
      <ProjectMan @click="$emit('clickProjectMan')" :colors="colors" :percent-man="percentMan" :project-man-cast="projectManCast" :project-man-budget="projectManBudget"></ProjectMan>
    </el-col>
    <el-col :span="6">
      <ProjectUnMan @click="$emit('clickProjectUnMan')" :colors="colors" :percent-un-man="percentUnMan" :project-un-man-cast="projectUnManCast" :project-un-man-budget="projectUnManBudget"></ProjectUnMan>
    </el-col>
  </el-row>
</template>

<script setup>
import ProjectAvatar from "./Cards/ProjectAvatar.vue"
import ProjectAll from "./Cards/ProjectAll.vue"
import ProjectUnMan from "./Cards/ProjectUnMan.vue"
import ProjectMan from "./Cards/ProjectMan.vue"
defineProps(['avatar','percentAll','projectCast','projectBudget','percentUnMan','projectUnManCast','projectUnManBudget','percentMan','projectManCast','projectManBudget'])


const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: 'red', percentage: 90 },
]
</script>