<template>
  <PageWrapper>
    <!-- <template #headerContent> <Header /> </template> -->
    <div class="flex w-full">
      <div class="w-full">
        <Card>
        <RadioGroup v-model:value="value1" size="large" button-style="solid" >
          <!-- <RadioButton value="1" size="large">工作流</RadioButton> -->
          <RadioButton value="2" size="large">组</RadioButton>
          <RadioButton value="3" size="large">用户</RadioButton>
          <RadioButton value="4" size="large">角色</RadioButton>
        </RadioGroup>
      </Card>
      </div>

    </div>
    
    <!-- <template  v-if="value1 === '1' ">
      <JobTable/>
    </template> -->

    <template  v-if="value1 === '2' ">
      <GroupTable/>
    </template>

    <template  v-if="value1 === '3' ">
      <UserTable/>
    </template>

    <template  v-if="value1 === '4' ">
      <RoleTable/>
    </template>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '@/components/Page';
  // import Header from './components/Header.vue';
  import JobTable from './components/JobTable.vue'
  import UserTable from './components/UserTable.vue'
  import GroupTable from './components/GroupTable.vue'
  import RoleTable from './components/RoleTable.vue'

  import {RadioGroup,RadioButton,Card } from 'ant-design-vue';
  const value1 = ref<string>('2');
  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
