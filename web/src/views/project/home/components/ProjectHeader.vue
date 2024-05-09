<template>
  <div class="lg:flex">
    <Avatar :src="userinfo.avatar || headerImg" :size="72" class="!mx-auto !block" />
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
      <h1 class="md:text-lg text-md">测试项目名-测试项目</h1>
      <span class="text-secondary"> 当前阶段：待验证</span>
    </div>
    <div class="flex flex-1 justify-end md:mt-0 mt-4">
      <div class="flex flex-col justify-center text-right">
        <span class="text-secondary"> 预算 </span>
        <span class="text-2xl">100万</span>
      </div>

      <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
        <span class="text-secondary"> 所属部门 </span>
        <span class="text-2xl">产品部</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-10 mr-4">
        <span class="text-secondary"> 团队人员 </span>
        <span class="text-2xl">30</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { Avatar } from 'ant-design-vue';
  import { useUserStore } from '@/store/modules/user';
  import headerImg from '@/assets/images/header.jpg';

  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
</script>
