<template>
  <el-card class="box-card-avatar" >
    <el-avatar :size="90" style="--el-avatar-text-size: 30px;--el-avatar-bg-color: #484b4d;color:rgb(249,250,255)">
      {{ avatar }}
    </el-avatar>
  </el-card>
</template>

<script setup>
let props = defineProps(['avatar'])
console.log(props.avatar)
</script>

<style scoped>
.box-card-avatar {
  height: 20vh;
  border: 20px;
  display: flex;
  align-items: center;
  border-radius: 100px;
  justify-content: center;
  background-color: rgb(227, 230, 238);
}

</style>