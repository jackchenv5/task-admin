import { api } from '@/utils/http/axios';

enum Api {
  TASK_LIST = '/tasks',
  TASKSTATUS_LIST = '/task_status',
  CATEGORY_LIST = '/task_category',
  TASK_BY_UER_LIST = '/tasks/by-user/',
}

export const taskByUserListApi = (userId) =>
  api.get({
    url: `${Api.TASK_BY_UER_LIST}/${userId}`,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

export const categoryListApi = () =>
  api.get({
    url: Api.CATEGORY_LIST,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

export const taskStatusListApi = () =>
  api.get({
    url: Api.TASKSTATUS_LIST,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

export const taskListApi = (params) =>
  api.get({
    url: Api.TASK_LIST,
    params:params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
  export const taskDetailApi = (taskId) =>
    api.get({
      url: `${Api.TASK_LIST}/${taskId}`,
      headers: {
        // @ts-ignore
        ignoreCancelToken: true,
      },
    });
  

export const taskDeleteApi =  (pk) =>
  api.delete({
    url: `${Api.TASK_LIST}/${pk}`
  });

export const taskModifyApi =  (pk,data) =>
  api.put({
    url: `${Api.TASK_LIST}/${pk}/`,
    params:data
  });


export const taskAddApi = (params:Recordable = { name: '请输入名称' }) => {  
  // 使用默认参数语法来提供默认值  
  return api.post({  
      url: `${Api.TASK_LIST}/`, // 直接使用Api.TASK_LIST常量  
      data: params // 通常POST请求的主体使用data或body作为键名  
  });  
};