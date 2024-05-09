<template>
  <div>
    <div class="cardContent">
      <div style="margin-right: 10px;">项目执行分布</div>
      <div class="disItem" v-for="item in items">
        <el-popover placement="bottom" title="项目列表" :width="500" trigger="hover">
          <template #reference>
            <div class="progress-item" :style="{backgroundColor:item.color,width:item.width+'vw'}"></div>
          </template>
          <p v-for="project in item.projects">{{ project }}</p>
        </el-popover>

        <div class="info-item">
          <span class="item-flag" :style="{backgroundColor: item.color}"></span>
          <span class="dis-item-text">{{ item.content }}</span>
          <span class="dis-item-per">{{ item.count }}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref, computed, watch,onMounted} from 'vue'
const props = defineProps(['data'])
const COLORS = ["#206bc4", "#4299e1", "#2fb344"]
const WIDTH = 42
// const data = ref(props.data)



const items = computed(() => {
  return handleItemData()
})

const getIndex = (originLength) => {
  const count1 = parseInt(originLength * 0.5)
  const count2 = parseInt(originLength * 0.3)
  const count3 = originLength - count1 - count2

  return [count1, count2, count3]
}

const handleItemData = () => {
  const ret = []
  const originLength = props.data.length
  props.data.sort((x,y)=>x.value-y.value)
  console.log('data',props.data)
  if (originLength == 0) return ret
  switch (originLength) {
    case 1:
      ret.push({
        width: WIDTH,
        color: COLORS[0],
        content: `${Math.round(props.data[0]['value'])}万元`,
        count: `项目数：1`,
        projects: [props.data[0]['name']]
      })
      break
    case 2:
      ret.push({
        width: WIDTH / 2,
        color: COLORS[0],
        content: `${Math.round(props.data[0]['value'])}万元`,
        count: `项目数：1`,
        projects: [props.data[0]['name']]
      })
      ret.push({
        width: WIDTH / 2,
        color: COLORS[1],
        content: `${Math.round(props.data[1]['value'])}万元`,
        count: `项目数：1`,
        projects: [props.data[1]['name']]
      })
      break
    case 3:
      ret.push({
        width: WIDTH / 3,
        color: COLORS[0],
        content: `${Math.round(props.data[0]['value'])}万元`,
        count: `项目数：1`,
        projects: [props.data[0]['name']]
      })
      ret.push({
        width: WIDTH / 3,
        color: COLORS[1],
        content: `${Math.round(props.data[1]['value'])}万元`,
        count: `项目数：1`,
        projects: [props.data[1]['name']]
      })
      ret.push({
        width: WIDTH / 3,
        color: COLORS[2],
        content: `${Math.round(props.data[2]['value'])}万元`,
        count: `项目数：1`,
        projects: [props.data[2]['name']]
      })
      break
    default:
      const indexList = getIndex(originLength)
      const w1 = WIDTH * indexList[0] / originLength
      const w2 = WIDTH * indexList[1] / originLength
      const w3 = WIDTH * indexList[2] / originLength
      const index2 = indexList[0] + indexList[1]
      const index3 = index2 + indexList[2]
      const projects1 = props.data.slice(0, indexList[0]).map(x => x.name)
      const projects2 = props.data.slice(indexList[0], index2).map(x => x.name)
      const projects3 = props.data.slice(index2, index3).map(x => x.name)
      const index1Value = Math.round(props.data[indexList[0]]['value'])
      const index2Value = Math.round(props.data[index2]['value'])
      ret.push({
        width: w1,
        color: COLORS[0],
        content: `小于${index1Value}万元`,
        count: `项目数：${indexList[0]}`,
        projects: projects1
      })
      ret.push({
        width: w2,
        color: COLORS[1],
        content: `${index1Value}~${index2Value}万元`,
        count: `项目数：${indexList[1]}`,
        projects: projects2
      })
      ret.push({
        width: w3,
        color: COLORS[2],
        content: `大于${index2Value}万元`,
        count: `项目数：${indexList[2]}`,
        projects: projects3
      })
  }
  return ret

}


</script>

<style scoped>
.cardContent {
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: start;
}

.disItem {
  display: flex;
  flex-direction: column;
  margin-left: 2px;
  justify-content: space-around
}

.dis-item-text {
  font-size: 12px;
  color: #26282a;
  margin-left: 5px;
}

.dis-item-per {
  font-size: 10px;
  color: #616e83;
  margin-left: 2px;
}

.progress-item {
  height: 1.5vh;
  min-width: 180px;
}

.info-item {
  margin-top: 5px;
  display: flex;
  justify-content: start;
}

.item-flag {
  width: 15px;
  height: 15px;
  border-radius: 2px
}
</style>