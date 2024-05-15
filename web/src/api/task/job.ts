import { api } from '@/utils/http/axios';

enum Api {
  JOB_LIST = '/jobs',
  JOBSTATUS_LIST = '/job_status',
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

export const jobStatusListApi = () =>
  api.get({
    url: Api.JOBSTATUS_LIST,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

export const jobListApi = () =>
  api.get({
    url: Api.JOB_LIST,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

export const jobDeleteApi =  (pk) =>
  api.delete({
    url: `${Api.JOB_LIST}/${pk}`
  });

export const jobModifyApi =  (pk,data) =>
  api.put({
    url: `${Api.JOB_LIST}/${pk}/`,
    params:data
  });

export const jobAddApi =  () =>
    api.post({
      url: `${Api.JOB_LIST}/`,
      params:{name:'请输入名称',creater:1,group:1,create_time:"1991-01-01 00:00",done_time:"1991-01-01 00:00"}
    });