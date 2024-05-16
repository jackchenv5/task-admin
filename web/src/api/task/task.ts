import { api } from '@/utils/http/axios';

enum Api {
  TASK_LIST = '/tasks',
  TASKSTATUS_LIST = '/task_status',
  GRANULARITY_LIST = '/granularity',
}

export const granularityListApi = () =>
  api.get({
    url: Api.GRANULARITY_LIST,
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

export const taskListApi = () =>
  api.get({
    url: Api.TASK_LIST,
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

export const taskAddApi =  () =>
    api.post({
      url: `${Api.TASK_LIST}/`,
      params:{name:'请输入名称'}
    });