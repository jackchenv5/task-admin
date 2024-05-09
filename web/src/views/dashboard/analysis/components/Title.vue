<template>
  <div class="lg:flex">
    <Avatar :src="userinfo.avatar || headerImg" :size="60" class="!mx-auto !block" />
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
      <h1 class="md:text-lg text-md">当前项目： 缺陷分析测试项目</h1>
      <span class="text-secondary">
        缺陷总体情况：项目总缺陷数、测试缺陷数、项目遗留缺陷数（状态是待测试之前）
      </span>
    </div>
    <div class="flex flex-1 justify-end md:mt-0 mt-4">
      <div class="flex flex-col justify-center text-right">
        <span class="text-secondary"> 待测试 </span>
        <span class="text-2xl">20/100</span>
      </div>

      <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
        <span class="text-secondary"> 项目 </span>
        <span class="text-2xl">8</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-10 mr-4">
        <span class="text-secondary"> 修复率 </span>
        <span class="text-2xl">20%</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { Avatar } from 'ant-design-vue';
  import { useUserStore } from '@/store/modules/user';
  import headerImg from '@/assets/images/m.jpg';

  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
</script>
