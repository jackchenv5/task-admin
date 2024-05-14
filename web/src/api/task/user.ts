import { api } from '@/utils/http/axios';

enum Api {
  USER_LIST = '/users',
  USER_IDS = '/users/ids/by_usernames',
}
export const userIDApi = (usernames) =>
  api.get({
    url: `${Api.USER_IDS}/${usernames}`,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

export const userListApi = () =>
  api.get({
    url: Api.USER_LIST,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

export const userDeleteApi =  (pk) =>
  api.delete({
    url: `${Api.USER_LIST}/${pk}`
  });

export const userModifyApi =  (pk,data) =>
  api.put({
    url: `${Api.USER_LIST}/${pk}/`,
    params:data
  });

export const userAddApi =  () =>
    api.post({
      url: `${Api.USER_LIST}/`,
      params:{username:'请输入新角色名'}
    });