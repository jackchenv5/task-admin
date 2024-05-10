<template>
  <PageWrapper>
    <template #headerContent> <Header /> </template>
      <EditRowTable/>
      <div class="flex flex-row" style="height:20vh">
          <Textarea>任务内容</Textarea>
          <Textarea>挑战目标</Textarea>
      </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Button,Textarea } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import Header from './components/Header.vue';
  import EditRowTable from './components/EditRowTable.vue'

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
