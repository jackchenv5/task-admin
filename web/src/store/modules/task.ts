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

interface TaskState {
  // Permission code list
  // 权限代码列表
  jobList: Recordable[];
  //当前任务信息
  taskInfo:Recordable;
  relatedTasks: RelatedTask[],
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
    taskInfo:{},
    relatedTasks:[],
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
    getRelatedTasksList(state){
      return state.relatedTasks;
    },
  },
  actions: {
    async setjobList(userId) {
      //TODO
      const data = await jobByUserListApi(userId)
      console.log('job by user data:',data)
      this.jobList = data
    },
    setCurTaskId(curTaskId) {
      this.curTaskId = curTaskId
      this.setTaskInfo(this.curTaskId)
    },
    async setTaskInfo(taskId) {
      //TODO
      const data = await taskDetailApi(taskId)
      this.taskInfo = data
      console.log('taskInfo data===>',data)
    },
    async setRelatedTasks(userId) {
      //TODO
      const data = await taskByUserListApi(userId)
      this.relatedTasks = data
      console.log('taskInfo data===>',data)
    },
    init(){
      //根据当前用户获取关联Job列表
      this.setjobList(2)
      //根据用户Job激活状态选取默认Job
      //根据Job获取任务列表
      this.setTaskInfo(1)
      //获取默认显示的任务信息
      this.setRelatedTasks(2)
    }
  }
  });

// Need to be used outside the setup
// 需要在设置之外使用
export function useTaskStoreWithOut() {
  return useTaskStore(store);
}
