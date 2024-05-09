import { defHttp } from '@/utils/http/axios';
import { DemoOptionsItem, selectParams } from './model/optionsModel';

enum Api {
  OPTIONS_LIST = '/select/getDemoOptions',
  FIX_LIST = '/select/fixLists',
  Detect_LIST = '/select/detectLists',
  Status_LIST = '/select/statusLists',
}

/**
 * @description: Get sample options value
 */
export const optionsListApi = (params?: selectParams) =>
  defHttp.get<DemoOptionsItem[]>({ url: Api.OPTIONS_LIST, params });

/**
 * @description: Get sample options value
 */
export const fixListApi = (params?: selectParams) =>
  defHttp.get<DemoOptionsItem[]>({ url: Api.FIX_LIST, params });

/**
 * @description: Get sample options value
 */
export const ListDetectApi = (params?: selectParams) =>
  defHttp.get<DemoOptionsItem[]>({ url: Api.Detect_LIST, params });

/**
 * @description: Get sample options value
 */
export const optionsStatusApi = (params?: selectParams) =>
  defHttp.get<DemoOptionsItem[]>({ url: Api.Status_LIST, params });
