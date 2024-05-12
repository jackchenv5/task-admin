<template>
  <PageWrapper>
    <!-- <template #headerContent> <Header /> </template> -->
    <div class="flex">
      <Card>
        <RadioGroup v-model:value="value1" button-style="solid">
          <RadioButton value="1">工作流</RadioButton>
          <RadioButton value="2">用户</RadioButton>
          <RadioButton value="3">组</RadioButton>
          <RadioButton value="4">角色</RadioButton>
        </RadioGroup>
      </Card>

    </div>
      <EditRowTable/>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import Header from './components/Header.vue';
  import EditRowTable from './components/EditRowTable.vue'

  import {RadioGroup,RadioButton,Card } from 'ant-design-vue';
  const value1 = ref<string>('1');
  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
