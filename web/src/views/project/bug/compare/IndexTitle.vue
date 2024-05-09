<template>
  <div class="lg:flex">
    <!-- <Avatar :src="userinfo.avatar || headerImg" :size="60" class="!mx-auto !block" /> -->
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-1">
      <h1 class="md:text-lg text-md">项目级缺陷对比</h1>
      <span class="text-secondary"> 缺陷总体情况：对比项目间的缺陷数据 </span>
    </div>
    <div class="flex flex-1 justify-end md:mt-0 mt-1">
      <!-- <div class="flex flex-col justify-center text-right">
        <span class="text-secondary"> 待解决缺陷数 </span>
        <span class="text-2xl">50</span>
      </div> -->

      <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
        <span class="text-secondary"> 对比项目数 </span>
        <span class="text-2xl">5个</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-10 mr-4">
        <span class="text-secondary"> 总项目数 </span>
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
