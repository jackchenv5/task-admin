import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { resultPageSuccess } from '../_util';

const demoList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 200; index++) {
    result.push({
      id: `${index}`,
      owner: '@cname()',
      'group|1': ['产品部测试1', '产品部测试1', '测试处2', '工具组', '效率组'],
      'depart|1': ['测试部', '平台部', '软件部', '产品部'],
      'mod|1': [
        'Support::CM::ZTP',
        'TEST::CM::ZTP',
        'BUILD::CM::ZTP',
        'CMM::CM::ZTP',
        'SFT::CM::ZTP',
      ],
      'type|1': ['用例发现', '自动化发现', '探索发现', '测试方案发现', '专项测试发现'],
      project: 'RT-V008R012C000(PR072)_信创核心路由器产品开发',
      dmpTicket: '@number',
      'issueType|1': ['攻关缺陷', '阻塞缺陷', '不易重现缺陷', '严重缺陷'],
      detectTime: `@date()`,
      solveTime: `@date()`,
      'spendTime|1': ['1天', '3天', '一周', '一个月以上'],
      'status|1': ['处理中', '待测试'],
    });
  }
  return result;
})();

export default [
  {
    url: '/basic-api/table/getBugList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, demoList);
    },
  },
] as MockMethod[];
