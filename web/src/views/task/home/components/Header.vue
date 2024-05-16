<template>
  <div class="lg:flex">
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 my-2">
      <Button size="large" danger type="primary" >下发任务</Button>
    </div>
    <div class="flex flex-1 mt-4 my-2 justify-end">
      <Button type="primary" size="large" class="mr-4">我的任务</Button>
      <Button type="primary" size="large"  class="mr-4">所有任务</Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Button } from 'ant-design-vue';
</script>
