import type { AppRouteRecordRaw, Menu } from '@/router/types';

import { defineStore } from 'pinia';
import { store } from '@/store';
import { useUserStore } from './user';
import { number } from 'vue-types';

interface TaskInfo {
  reciver: string;
  workload:number;
  all:number;
  related_tasks: RelatedTask[],
  content:string;
  challege:string;
}
interface RelatedTask {
  id:string;
  startime:string;
  deadline:string;
  workload:string;
}

interface Job {
  id:string;
  role:string;
  name:string;
}
interface TaskState {
  // Permission code list
  // 权限代码列表
  jobList: Job[];
  //当前任务信息
  taskInfo:TaskInfo;
  // //任务列表
  // taskList:TaskInfo[];
  curJobID:number;
  curTaskId:number;
  //生产环境从userStore获取。
  curUserID:number;
}
export const useTaskStore = defineStore({
  id: 'app-task',
  state: (): TaskState => ({
    // 我的Job列表
    taskInfo:{reciver:"",related_tasks:[],workload:0,all:0,  content:"",challege:""},
    curJobID:0,
    curTaskId:0,
    jobList: [],
    // taskList:[],
    curUserID:2
  }),
  getters: {
    getJobList(state){
      return state.jobList;
    },
    getCurTaskId(state){
      return state.curTaskId;
    },
    getTaskInfo(state){
      return state.taskInfo;
    },
  },
  actions: {
    setjobList(userId) {
      //TODO
    },
    setCurTaskId(curTaskId) {
      this.curTaskId = curTaskId
    },
    setTaskInfo() {
      //TODO
    },
    init(){
      //根据当前用户获取关联Job列表
      //根据用户Job激活状态选取默认Job
      //根据Job获取任务列表
      //获取默认显示的任务信息
    }
  }
  });

// Need to be used outside the setup
// 需要在设置之外使用
export function useTaskStoreWithOut() {
  return useTaskStore(store);
}
