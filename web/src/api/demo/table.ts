import { defHttp } from '@/utils/http/axios';
import { DemoParams, DemoListGetResultModel } from './model/tableModel';

enum Api {
  DEMO_LIST = '/table/getTaskList',
  JOB_LIST = '/table/getJobList',
}

/**
 * @description: Get sample list value
 */

export const demoListApi = (params: DemoParams) =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.DEMO_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
  export const demoJobApi = (params: DemoParams) =>
    defHttp.get<DemoListGetResultModel>({
      url: Api.JOB_LIST,
      params,
      headers: {
        // @ts-ignore
        ignoreCancelToken: true,
      },
    });