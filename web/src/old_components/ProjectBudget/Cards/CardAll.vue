<template>
  <el-card class="box-card-avator"　shadow="hover" >
    <el-avatar :size="90"
               style="--el-avatar-text-size: 30px;--el-avatar-bg-color: #fbfdff;color:rgb(137, 139, 145)">{{ ProjectAvator }}
    </el-avatar>
  </el-card>
</template>

<script setup>
defineProps(['ProjectAvator'])
</script>

<style scoped>

</style>