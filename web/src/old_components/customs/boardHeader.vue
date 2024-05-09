<template>
  <div class="card-header">
    <template v-for="(item,index) in data">
      <div class="card-item">
        <div class="card-item-title">{{ item.title }}</div>
        <div class="card-item-content">{{ item.value }}</div>
      </div>
      <div v-if="index != data.length-1" class="divider"></div>
    </template>

  </div>
</template>

<script setup>
const props = defineProps(['data'])



</script>

<style scoped>


.card-header {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 10vh;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 3%), 0 1px 6px -1px rgb(0 0 0 / 2%), 0 2px 4px 0 rgb(0 0 0 / 2%);
  padding: 5px;
}


.card-item {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1
}

.card-item-title {
  margin-bottom: 4px;
  color: rgba(0, 0, 0, 0.55);
  font-size: 16px
}

.card-item-content {
  font-size: 24px
}

.divider {
  width: 2px;
  height: 100%;
  background-color: #dcdfe5;
}
</style>