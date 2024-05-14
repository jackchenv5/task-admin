import { api } from '@/utils/http/axios';

enum Api {
  ROLE_LIST = '/roles',
}

export const roleListApi = () =>
  api.get({
    url: Api.ROLE_LIST,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

export const roleDeleteApi =  (pk) =>
  api.delete({
    url: `${Api.ROLE_LIST}/${pk}`
  });

export const roleModifyApi =  (pk,data) =>
  api.put({
    url: `${Api.ROLE_LIST}/${pk}/`,
    params:data
  });

export const roleAddApi =  () =>
    api.post({
      url: `${Api.ROLE_LIST}/`,
      params:{name:'请输入新角色名'}
    });