<template>
  <PageWrapper>
    <template #headerContent> <Header /> </template>
      <EditRowTable/>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import Header from './components/Header.vue';
  import EditRowTable from './components/EditRowTable.vue'

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
