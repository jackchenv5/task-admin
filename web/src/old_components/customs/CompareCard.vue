<template>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <el-button :icon="Delete" circle/>
      </div>
    </template>
    <div class="text item" v-for="item in projectItems">{{ `${item.name}:${item.value} ` }}</div>
  </el-card>
</template>
<script lang="ts" setup>
import {
  Delete,
} from '@element-plus/icons-vue'


defineProps(['projectItems'])
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 20vw;
}
</style>