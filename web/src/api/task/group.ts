import { api } from '@/utils/http/axios';

enum Api {
  GROUP_LIST = '/groups',
}

export const groupListApi = () =>
  api.get({
    url: Api.GROUP_LIST,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

export const groupDeleteApi =  (pk) =>
  api.delete({
    url: `${Api.GROUP_LIST}/${pk}`
  });

export const groupModifyApi =  (pk,data) =>
  api.put({
    url: `${Api.GROUP_LIST}/${pk}/`,
    params:data
  });

export const groupAddApi =  () =>
    api.post({
      url: `${Api.GROUP_LIST}/`,
      params:{name:'请输入新角色名'}
    });