<template>
  <PageWrapper>
    <template #headerContent> <Title /> </template>
    <GrowCard :loading="loading" class="enter-y" />
    <BugAnalysisContainer class="!my-1 enter-y" :loading="loading" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import Title from './single/Title.vue';
  import GrowCard from './single/GrowCard.vue';
  import BugAnalysisContainer from './single/BugAnalysisContainer.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1000);
</script>
