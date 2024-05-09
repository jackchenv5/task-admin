<template>
  <div class="my-collapse">
    <el-collapse v-model="activeName" accordion >
      <el-collapse-item :title="project[0].value" v-for="project in data">
        <div style="background-color: #5c7fa4;border: 1px solid #f3f5f8;border-radius: 5px;color: white;padding: 8px">
          <p v-for="item in project"><span>{{item.name}}:</span> <span>{{item.value}}</span></p>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const props = defineProps(['data'])
console.log(props.data)
const activeName = ref('')




</script>

<style scoped>
.my-collapse {
  background-color: #ffffff;
  padding-left: 10px;
  padding-right: 10px;
  width: 48vw;
  height: 25vh;
  overflow-y: auto;
}

.my-collapse::-webkit-scrollbar
{
  /*滚动条整体样式*/
  width: 10px;
  /*高宽分别对应横竖滚动条的尺寸*/
  /*height: 10px;*/
}
.my-collapse::-webkit-scrollbar-thumb
{
  /*滚动条里面小方块*/
  border-radius: 10px;
  background: #2a2929;
  box-shadow: inset 0 0 5px rgb(42, 41, 41);
}
.my-collapse::-webkit-scrollbar-track
{
  border-radius: 10px;  background: #e1ec77;

  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgb(249, 250, 255);
}
</style>