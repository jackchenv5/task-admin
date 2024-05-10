<template>
  <PageWrapper>
    <template #headerContent> <IndexTitle /> </template>
    <GrowCard :loading="loading" class="enter-y" />
    <CompareInfo />
    <CompareContainer class="!my-4 enter-y" :loading="loading" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import IndexTitle from './compare/IndexTitle.vue';
  // import GrowCard from './components/GrowCard.vue';
  import CompareInfo from './compare/CompareInfo.vue';
  import CompareContainer from './compare/CompareContainer.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
