<template>
  <PageWrapper>
    <div class="flex" >
    <!-- <div class="flex flex-col justify-center ">
      <Button size="large" danger type="primary" >下发当前任务</Button>
    </div> -->
    <div style="width: 0%;"><p ></p></div>
    <div class="flex flex-1  justify-start items-center" style="width: 100%;">
      <p class="font-bold mt-3">开始：</p>
      <DatePicker v-model:value="filterInfo.start_time" :format="dateFormat" size="middle" style="width: 115px"/>
      <p class="font-bold mt-3 ml-4">截止：</p>
      <DatePicker v-model:value="filterInfo.deadline_time" :format="dateFormat" size="middle" style="width: 115px;"/>
      <p class="mt-3 ml-4 font-bold">组：</p>
      <ApiSearchSelect style="width: 115px"  v-model:value="filterInfo.group" :api="groupListApi" result-field="items" value-field="id" label-field="name"></ApiSearchSelect>
    <p class="mt-3 ml-4 font-bold">执行者：</p>
    <ApiSearchSelect style="width: 115px" v-model:value="filterInfo.receiver" :api="userListApi" result-field="items" value-field="id" label-field="username"></ApiSearchSelect>
    <p class="mt-3 ml-4 font-bold">状态：</p>
    <ApiSelect style="width: 115px" v-model:value="filterInfo.status" :api="taskStatusListApi" result-field="items" value-field="id" label-field="name"></ApiSelect>
    <p class="mt-3 ml-4 font-bold">查询：</p>
    <Input v-model:value="filterInfo.search_text" style="min-width: 200px;width: 300px" placeholder="支持任务名、工作内容、挑战目标、任务自述"/>
    <Button @click="cleanFilter">清空</Button>  
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
        <TaskTable style="min-height: 600px"/>
        <div class="flex mt-4  flex">
          <div class="flex flex-row flex-grow-2" style="height:18vh">
            <div class="flex flex-col w-full">
              <h1 class="text-md">任务内容：</h1>
              <Textarea class="flex-grow" v-model:value="curTaskInfo.content" :disabled="disabled"></Textarea>
            </div>
          </div>
          <div class="flex flex-row flex-grow-2" style="height:18vh">
            <div class="flex flex-col w-full">
              <h1 class="text-md">挑战目标：</h1>
              <Textarea class="flex-grow"  v-model:value="curTaskInfo.challenge" :disabled="disabled"></Textarea>
            </div>
          </div>
          <div class="flex flex-row flex-grow-1" style="height:18vh">
            <div class="flex flex-col w-full">
              <h1 class="text-md">任务自述：</h1>
              <Textarea class="flex-grow"  v-model:value="curTaskInfo.feedback" :disabled="disabled"></Textarea>
            </div>
          </div>
        </div>
      </div>

    </div>

  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref,computed,watch,onMounted,reactive } from 'vue';
  import {Textarea,Card,Button,TypographyTitle,RangePicker,Select,SelectOption,DatePicker,Input } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import Header from './components/Header.vue';
  import TaskTable from './components/TaskTable.vue';
  import  ApiSelect  from '@/components/Form/src/components/ApiSelect.vue'
  import  ApiSearchSelect  from '@/components/Form/src/components/ApiSearchSelect.vue'
  import type { Dayjs } from 'dayjs';
  import { groupListApi } from '@/api/task/group';
  import { userListApi } from '@/api/task/user';
  import { taskAddApi, taskDeleteApi, taskListApi, taskModifyApi,categoryListApi, taskStatusListApi } from '@/api/task/task';

  import { useTaskStore } from '@/store/modules/task';
  const store = useTaskStore()
  const disabled = computed(()=>store.getDisabled)
  const curTaskInfo = computed(()=>store.getTaskInfo)
  const curRelatedTasks = computed(()=> store.getRelatedTasksList)
  const dateFormat = 'YYYY-MM-DD';
  const filterInfo = reactive({
      receiver:"",
      start_time:null,
      deadline_time:null,
      status:"",
      group:"",
      search_text:""
  })
  const cleanFilter = ()=>{
      //TODO
    for (const key in filterInfo) {  
      filterInfo[key]="";  
    }  
  }  
  watch(filterInfo,()=>{
    console.log('filterInfo===>',filterInfo)
    store.setFilterInfo(filterInfo)
    // const data = taskListApi(buildQueryParams(filterInfo))
    // console.log('===========data:',data)
  })
  onMounted(() => {
    store.init()
  });

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);

  function buildQueryParams(paramsObj) {  
  const queryParams = [];  
  
  for (let key in paramsObj) {  
    if (paramsObj.hasOwnProperty(key) && paramsObj[key] !== '') {  
      // 转换 key 为 snake_case（如果需要） 
      console.log('key','data',key,paramsObj[key]);
      const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();  
      queryParams.push(encodeURIComponent(snakeCaseKey) + '=' + encodeURIComponent(paramsObj[key]));  
    }  
  }  
  return queryParams.join('&');  
}  
</script>
