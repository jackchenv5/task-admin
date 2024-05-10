<template>
  <HeaderTrigger :theme="theme" />
</template>

<script lang="ts" setup>
  import { propTypes } from '@/utils/propTypes';
  import HeaderTrigger from './HeaderTrigger.vue';

  defineProps({
    theme: propTypes.oneOf(['light', 'dark']),
  });
</script>
