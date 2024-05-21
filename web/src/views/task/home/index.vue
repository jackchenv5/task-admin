<template>
  <PageWrapper>
    <div class="flex" >
    <!-- <div class="flex flex-col justify-center ">
      <Button size="large" danger type="primary" >下发当前任务</Button>
    </div> -->
    <div style="width: 0%;"><p ></p></div>
    <div class="flex flex-1  justify-start items-center" style="width: 100%;">
      <p class="font-bold mt-3">开始：</p>
      <DatePicker v-model:value="filterInfo.startTime" size="middle" style="width: 115px"/>
      <p class="font-bold mt-3 ml-4">截止：</p>
      <DatePicker v-model:value="filterInfo.deadlineTime" size="middle" style="width: 115px;"/>
      <p class="mt-3 ml-4 font-bold">组：</p>
      <ApiSearchSelect style="width: 115px"  v-model:value="filterInfo.group" :api="groupListApi" result-field="items" value-field="id" label-field="name"></ApiSearchSelect>
    <p class="mt-3 ml-4 font-bold">执行者：</p>
    <ApiSearchSelect style="width: 115px" v-model:value="filterInfo.receiver" :api="userListApi" result-field="items" value-field="id" label-field="username"></ApiSearchSelect>
    <p class="mt-3 ml-4 font-bold">状态：</p>
    <ApiSelect style="width: 115px" v-model:value="filterInfo.status" :api="taskStatusListApi" result-field="items" value-field="id" label-field="name"></ApiSelect>
    <p class="mt-3 ml-4 font-bold">查询：</p>
    <InputSearch class=""
    v-model:value="filterInfo.searchText" style="min-width: 200px;width: 300px"
      placeholder="支持任务名、工作内容、挑战目标、任务自述"
      enter-button
    />
    </div>
    <div class="justify-end mr-2"><Button size="middle" danger type="primary" >下发当前任务</Button></div>
  </div>
    <div class="lg:flex  mt-1" style="min-width: 1357px!important">
      <div style="width: 18%;" class="mr-2">
        <Card title="相关信息" class="">
          <p>执行人：陈成</p>
          <p>关联任务：</p>
          <p v-for="item in curRelatedTasks"><a>{{ `${item.name}:${item.start_time}~${item.deadline_time}` }}</a></p>
          <p>剩余总工时：8/22 天</p>
        </Card>
      </div>
      <div style="width:82%" >
        <TaskTable/>
        <div class="flex mt-4  flex">
          <div class="flex flex-row flex-grow-2" style="height:18vh">
            <div class="flex flex-col w-full">
              <h1 class="text-md">任务内容：</h1>
              <Textarea class="flex-grow"></Textarea>
            </div>
          </div>
          <div class="flex flex-row flex-grow-2" style="height:18vh">
            <div class="flex flex-col w-full">
              <h1 class="text-md">挑战目标：</h1>
              <Textarea class="flex-grow"></Textarea>
            </div>
          </div>
          <div class="flex flex-row flex-grow-1" style="height:18vh">
            <div class="flex flex-col w-full">
              <h1 class="text-md">任务自述：</h1>
              <Textarea class="flex-grow"></Textarea>
            </div>
          </div>
        </div>
      </div>

    </div>

  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref,computed,watch,onMounted,reactive } from 'vue';
  import {Textarea,Card,Button,TypographyTitle,RangePicker,Select,SelectOption,DatePicker,InputSearch } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import Header from './components/Header.vue';
  import { useTaskStore } from '@/store/modules/task';
  import TaskTable from './components/TaskTable.vue';
  import  ApiSelect  from '@/components/Form/src/components/ApiSelect.vue'
  import  ApiSearchSelect  from '@/components/Form/src/components/ApiSearchSelect.vue'
  import type { Dayjs } from 'dayjs';
  import { groupListApi } from '@/api/task/group';
  import { userListApi } from '@/api/task/user';
  import { taskAddApi, taskDeleteApi, taskListApi, taskModifyApi,categoryListApi, taskStatusListApi } from '@/api/task/task';
  type RangeValue = [Dayjs, Dayjs];
  const value1 = ref();
  const value4 = ref();
  const value2 = ref('lucy');
  const value3 = ref('lucy');
  const groupSeleted = ref('');

  const store = useTaskStore()
  const curTaskInfo = computed(()=>store.getTaskInfo)
  const curRelatedTasks = computed(()=> store.getRelatedTasksList)
  const getFilterInfo = computed(()=> store.getFilterInfo)
  const filterInfo = reactive({
      receiver:"",
      startTime:"",
      deadlineTime:"",
      status:"",
      group:"",
      searchText:""
  })
  watch(getFilterInfo,()=>{
    console.log('==========================================getFilterInfo===>',filterInfo)
  })

  watch(filterInfo,()=>{
    console.log('filterInfo===>',filterInfo)
    store.setFilterInfo(filterInfo)
  })
  onMounted(() => {
    store.init()
  });

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
