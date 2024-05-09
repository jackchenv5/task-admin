import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

const demoList = [
  { id: 1, name: '攻关缺陷' },
  { id: 2, name: '阻塞缺陷' },
  { id: 3, name: '不易重现缺陷' },
  { id: 4, name: '严重缺陷' },
];
const fixedList = [
  { id: 1, name: '一天以内' },
  { id: 2, name: '一周以内' },
  { id: 3, name: '一个月以内' },
  { id: 4, name: '半年以内' },
];
const detectList = [
  { id: 1, name: '用例发现' },
  { id: 2, name: '自动化发现' },
  { id: 3, name: '探索发现' },
  { id: 4, name: '测试方案发现' },
  { id: 5, name: '专项测试发现' },
];
const statusList = [
  { id: 1, name: '处理中' },
  { id: 2, name: '待测试' },
];

export default [
  {
    url: '/basic-api/select/getDemoOptions',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { keyword, count } = query;
      console.log(keyword);
      return resultSuccess(demoList);
    },
  },
  {
    url: '/basic-api/select/fixLists',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { keyword, count } = query;
      console.log(keyword);
      return resultSuccess(fixedList);
    },
  },
  {
    url: '/basic-api/select/detectLists',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { keyword, count } = query;
      console.log(keyword);
      return resultSuccess(detectList);
    },
  },
  {
    url: '/basic-api/select/statusLists',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { keyword, count } = query;
      console.log(keyword);
      return resultSuccess(statusList);
    },
  },
] as MockMethod[];
