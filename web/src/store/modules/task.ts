import type { AppRouteRecordRaw, Menu } from '@/router/types';

import { defineStore } from 'pinia';
import { store } from '@/store';
import { useUserStore } from './user';
import { number } from 'vue-types';
import { jobByUserListApi } from '@/api/task/job';
import { taskByUserListApi, taskDeleteApi, taskDetailApi } from '@/api/task/task';

interface RelatedTask {
  id:string;
  startime:string;
  deadline:string;
  workload:string;
}
interface FilterInfo {
  receiver:number;
  start_time:string;
  deadline_time:string;
  status:number;
  group:number;
  search_text:string;
}

interface TaskState {
  // Permission code list
  // 权限代码列表
  jobList: Recordable[];
  //当前任务信息
  taskInfo:Recordable;
  disabled:boolean;
  relatedTasks: RelatedTask[],
  // //任务列表
  // taskList:TaskInfo[];
  curJobID:number;
  curTaskId:number;
  //生产环境从userStore获取。
  curUserID:number;
  filterInfo:FilterInfo;
}
export const useTaskStore = defineStore({
  id: 'app-task',
  state: (): TaskState => ({
    // 我的Job列表
    taskInfo:{},
    disabled:true,
    relatedTasks:[],
    curJobID:0,
    curTaskId:0,
    jobList: [],
    filterInfo:{
      receiver:"",
      start_time:"",
      deadline_time:"",
      status:"",
      group:"",
      search_text:""
  },
    // taskList:[],
    curUserID:4
  }),
  getters: {
    getDisabled(state){
      return state.disabled;
    },
    getJobList(state){
      return state.jobList;
    },
    getCurTaskId(state){
      return state.curTaskId;
    },
    getTaskInfo(state){
      return state.taskInfo;
    },
    getRelatedTasksList(state){
      return state.relatedTasks;
    },
    getFilterInfo(state){
      return state.filterInfo;
    },
  },
  actions: {
    async setjobList(userId) {
      //TODO
      const data = await jobByUserListApi(userId)
      console.log('job by user data:',data)
      this.jobList = data
    },
    // setCurTaskId(curTaskId) {
    //   this.curTaskId = curTaskId
    //   this.setTaskInfo(this.curTaskId)
    // },
    async setTaskInfo(taskInfo) {
      //TODO
      this.taskInfo = taskInfo
      console.log('taskInfo data===>',taskInfo)
    },
    async setRelatedTasks(userId) {
      //TODO
      const data = await taskByUserListApi(userId)
      this.relatedTasks = data
      console.log('taskInfo data===>',data)
    },
    async setFilterInfo(filterInfo:FilterInfo) {
      //TODO
      for (const key in filterInfo) { 

        // 检查filterInfoB是否包含此属性，并且属性值是否与filterInfoA不同  
        if (!(key in this.filterInfo) || this.filterInfo[key] !== filterInfo[key]) {  
          // 如果不存在或值不同，将filterInfoA的属性值复制到filterInfoB 
          if (key === 'start_time' || key === 'deadline_time') {
            this.filterInfo[key] = filterInfo[key] ? filterInfo[key].format('YYYY-MM-DD'):""
          }else{
            this.filterInfo[key] = filterInfo[key]; 
          }
           
        }  
      }  
    },
    setDisabled(isDisabled:boolean) {
      //TODO
      console.log('==========disabled=>',isDisabled);
      this.disabled = isDisabled
    },
    init(){
      //根据当前用户获取关联Job列表
      // this.setjobList(1)
      //根据用户Job激活状态选取默认Job
      //根据Job获取任务列表
      // this.setTaskInfo(4)
      //获取默认显示的任务信息
      this.setRelatedTasks(4)
    }
  }
  });

// Need to be used outside the setup
// 需要在设置之外使用
export function useTaskStoreWithOut() {
  return useTaskStore(store);
}