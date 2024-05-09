<template>
  <div class="flex flex-justify-around">
    <Card size="small" style="width: 49.5%">
      <div class="flex">
        <Select
          v-model:value="compareProject.choice"
          mode="multiple"
          style="width: 100%"
          placeholder="Please select"
          :options="[...Array(25)].map((_, i) => ({ value: '项目' + (i + 1) }))"
          @change="handleChange"
        />
        <Button class="mx-2" type="primary" @click="pushCompareHandler">加入对比</Button>
      </div>
      <div class="flex my-4 flex-wrap">
        <Tag closable v-for="item in compareProject.selected" color="blue" :key="item">{{
          item
        }}</Tag>
      </div>
    </Card>
    <Card size="small" style="width: 49.5%">
      <Carousel autoplay>
        <div v-for="item in compareProject.selected" :key="item"
          ><h3>{{ item }}</h3></div
        >
      </Carousel>
    </Card>
  </div>
</template>
<script setup lang="ts">
  import { reactive } from 'vue';
  import { Tag, Card, Carousel, Select, Button } from 'ant-design-vue';

  const compareProject = reactive<{ selected: string[]; choice: string[] }>({
    selected: ['项目1', '项目2'],
    choice: ['项目1', '项目2'],
  });

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  const pushCompareHandler = () => {
    console.log(compareProject.choice);
    console.log(compareProject.selected);
    compareProject.choice.forEach((x) => {
      if (compareProject.selected.indexOf(x) === -1) {
        console.log('x', x);
        console.log(compareProject.selected);
        compareProject.selected.push(x);
      }
    });
  };
  // const value = ref();
</script>
<style scoped>
  /* For demo */
  :deep(.slick-slide) {
    height: 180px;
    overflow: hidden;
    background: #070b24;
    line-height: 160px;
    text-align: center;
  }

  :deep(.slick-slide h3) {
    color: #fff;
  }
</style>
