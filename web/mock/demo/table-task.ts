import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess } from '../_util';

const demoList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 200; index++) {
    result.push({
      id: `${index}`,
      receiver: '@cname()',
      'category|1': ['项目', '特征', '学习', '分享'],
      start_time: '@date',
      deadline_time: '@date',
      'status|1': ['未发布', '发布', '进行中','已超期','编辑中'],
      related_task: `${index}`,
    });
  }
  return result;
})();

const jobList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 200; index++) {
    result.push({
      id: `${index}`,
      creater: '@cname()',
      name: '@string',
      'granularity|1': ['周', '双周', '月', '天'],
      'group|1': ['陈成，乔志，张涛', '王俊坤，陈成，乔志', '王俊坤，陈成','乔志，张涛'],
      'status|1': ['未激活', '激活'],
      modifydate: '@date',
      'description|1': ['未发布', '发布', '进行中','已超期','编辑中'],
    });
  }
  return result;
})();

export default [
  {
    url: '/basic-api/table/getTaskList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 12 } = query;
      return resultPageSuccess(page, pageSize, demoList);
    },
  },
  {
    url: '/basic-api/table/getJobList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 12 } = query;
      return resultPageSuccess(page, pageSize, jobList);
    },
  },
] as MockMethod[];
