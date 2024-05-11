import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { resultPageSuccess } from '../_util';

function getRandomPics(count = 10): string[] {
  const arr: string[] = [];
  for (let i = 0; i < count; i++) {
    arr.push(Random.image('800x600', Random.color(), Random.color(), Random.title()));
  }
  return arr;
}

const demoList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 200; index++) {
    result.push({
      id: `${index}`,
      receiver: '@cname()',
      'category|1': ['项目', '特征', '学习', '分享'],
      start_time: '@date',
      deadline_time: '@date',
      'status|1': ['未发布', '发布', '进行中','已超期'],
      related_task: `${index}`,
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
] as MockMethod[];
