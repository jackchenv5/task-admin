<template>
  <el-container>
    <el-header class="head">
      <a :href="homeUrl" class="navbar-brand">看板系统</a>
      <el-link v-for="item in navList" :key="item.name" :href="`${item.href}`" :class="{ select:activeName == item.name }"
               @click="clickItem(item.name)">{{
          item.name
        }}
      </el-link>
    </el-header>
  </el-container>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import {useRoute} from "vue-router";
import {useGlobalStore} from "../stores/global";
import {storeToRefs} from "pinia";

const homeUrl = import.meta.env.VITE_MAIN_URL

const route = useRoute()

const globalStore = useGlobalStore()

const {navList} = storeToRefs(globalStore)

const {getNavList} = globalStore

onMounted(()=>{
  getNavList()
})

const props = defineProps(['activeName'])

function clickItem(item) {
  this.activeName = item
}

</script>
<style>
.select {
  background-color: #88888d;
}

.slog {
  font-size: 35px;
  line-height: 20px;
  margin-top: 100px;
}

.el-link {
  color: white;
  font-size: 12px;
  margin-right: 8px;
  padding: 0px 10px;
}

.el-link:hover {
  color: antiquewhite;
  border-bottom: 1px solid white;
}

.head {
  height: 51px;
  background: rgb(39, 39, 39);
  display: flex;
  justify-content: start;
  border-bottom: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;

}

.navbar-brand {
  float: left;
  height: 50px;
  padding: 15px 15px;
  font-size: 18px;
  line-height: 20px;
  font-family: Consolas;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 4px;
  color: #ffffff
}

</style>