import { api } from '@/utils/http/axios';

enum Api {
  JOB_LIST = '/jobs',
  USER_LIST = '/users',
  GROUP_LIST = '/jobs',
  ROLE_LIST = '/roles',
}

/**
 * @description: Get sample list value
 */

export const jobListApi = (params) =>
  api.get({
    url: Api.JOB_LIST,
    // params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

export const roleListApi = (params) =>
  api.get({
    url: Api.ROLE_LIST,
    // params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

export const roleDeleteApi =  (pk) =>
  api.delete({
    url: `${Api.ROLE_LIST}/${pk}`
  });


    export const groupListApi = (params) =>
      api.get({
        url: Api.GROUP_LIST,
        // params,
        headers: {
          // @ts-ignore
          ignoreCancelToken: true,
        },
      });

      export const userListApi = (params) =>
        api.get({
          url: Api.USER_LIST,
          // params,
          headers: {
            // @ts-ignore
            ignoreCancelToken: true,
          },
        });