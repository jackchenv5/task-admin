<template>
  <PageWrapper>
    <template #headerContent> <Header /> </template>
    <div class="flex">
      <div style="width: 20%;" class="mr-2">
        <Card title="我的工作流">
          <p v-for="item in curJobList"><a>{{`${item.name}:${item.status_name}`}}</a></p>
        </Card>
        <Card title="相关信息" class="mt-2">
          <p>执行人：陈成</p>
          <p>关联任务：</p>
          <p v-for="item in curRelatedTasks"><a>{{ `${item.name}:${item.start_time}~${item.deadline_time}` }}</a></p>
          <p>剩余总工时：8/22 天</p>
        </Card>
        <Card title="任务自述" class="mt-2">
            <Textarea rows="7"></Textarea>
        </Card>
      </div>
      <div style="width:80%" >
        <TaskTable/>
        <div class="flex mt-4  flex">
          <div class="flex flex-row flex-grow" style="height:18vh">
            <div class="flex flex-col w-full">
              <h1 class="text-md">任务内容：</h1>
              <Textarea class="flex-grow"></Textarea>
            </div>
          </div>
          <div class="flex flex-row flex-grow" style="height:18vh">
            <div class="flex flex-col w-full">
              <h1 class="text-md">挑战目标：</h1>
              <Textarea class="flex-grow"></Textarea>
            </div>
          </div>
        </div>
      </div>

    </div>

  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref,computed,watch,onMounted } from 'vue';
  import {Textarea,Card } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import Header from './components/Header.vue';
  import { useTaskStore } from '@/store/modules/task';
  import TaskTable from './components/TaskTable.vue';
  const store = useTaskStore()

  const curJobList = computed(()=> store.getJobList )
  const curTaskInfo = computed(()=>store.getTaskInfo)
  const curRelatedTasks = computed(()=> store.getRelatedTasksList)
  console.log('curJobList',curJobList.value)
  console.log('curTaskInfo',curTaskInfo.value)
  console.log('curRelatedTasks',curRelatedTasks.value)
  watch(curJobList,()=>{
    console.log('curJobList=>',curJobList.value)
  })
  watch(curTaskInfo,()=>{
    console.log('curTaskInfo=>',curTaskInfo.value)
  })

  onMounted(() => {
    store.init()
  });

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
