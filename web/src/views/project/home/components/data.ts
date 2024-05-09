interface GroupItem {
  title: string;
  icon: string;
  color: string;
  desc: string;
  date: string;
  group: string;
}

interface NavItem {
  title: string;
  icon: string;
  color: string;
}

interface DynamicInfoItem {
  avatar: string;
  name: string;
  date: string;
  desc: string;
}

export const navItems: NavItem[] = [
  {
    title: '首页',
    icon: 'ion:home-outline',
    color: '#1fdaca',
  },
  {
    title: '仪表盘',
    icon: 'ion:grid-outline',
    color: '#bf0c2c',
  },
  {
    title: '',
    icon: 'ion:layers-outline',
    color: '#e18525',
  },
  {
    title: '项目管理',
    icon: 'ion:settings-outline',
    color: '#3fb27f',
  },
  {
    title: '预算看板',
    icon: 'ion:key-outline',
    color: '#4daf1bc9',
  },
  {
    title: '统计分析',
    icon: 'ion:bar-chart-outline',
    color: '#00d8ff',
  },
];

export const dynamicInfoItems: DynamicInfoItem[] = [
  {
    avatar: 'dynamic-avatar-1|svg',
    name: '张涛',
    date: '刚刚',
    desc: `在 <a>产品部</a> 创建了项目 <a>测试项目A</a>`,
  },
  {
    avatar: 'dynamic-avatar-2|svg',
    name: '陈成',
    date: '1个小时前',
    desc: `关注了 <a>测试项目A</a> `,
  },
  {
    avatar: 'dynamic-avatar-3|svg',
    name: '张世伟',
    date: '1天前',
    desc: `修改了预算<a>80万==>100万</a> `,
  },
  {
    avatar: 'dynamic-avatar-4|svg',
    name: '陈成F',
    date: '2天前',
    desc: `将项目<a>测试项目A</a>状态设置为<a>待测试</a> `,
  },
  {
    avatar: 'dynamic-avatar-5|svg',
    name: '乔志',
    date: '3天前',
    desc: `向 <a>王俊坤</a> 下发任务： <a>超预算，如何进行项目优化？</a>`,
  },
];

export const groupItems: GroupItem[] = [
  {
    title: '进展',
    icon: 'streamline:business-progress-bar-2',
    color: '',
    desc: '带论证阶段',
    group: '项目经理：陈成F',
    date: '2024-03-06',
  },
  {
    title: '风险',
    icon: 'ion:warning',
    color: '#3fb27f',
    desc: 'XXX不愿意签订合同',
    group: '负责人：乔志',
    date: '2024-03-06',
  },
  {
    title: '预算',
    icon: 'bx:bxl-react',
    color: '#e18525',
    desc: '已执行20万',
    group: '总预算：100万',
    date: '2024-03-06',
  },
  {
    title: '任务',
    icon: 'icon-park-outline:schedule',
    color: '#bf0c2c',
    desc: '4个任务正在进行中',
    group: '总任务数：10',
    date: '2024-03-06',
  },
  {
    title: '概览',
    icon: 'bx:bxl-react',
    color: '#00d8ff',
    desc: '项目评分：80分',
    group: '总分：项目任务：0.5 + DI统计*0.5',
    date: '2024-03-06',
  },
  {
    title: '统计',
    icon: 'solar:chart-bold',
    color: '#EBD94E',
    desc: '开发活动、部门投入等数据',
    group: '数据已加载',
    date: '2024-03-06',
  },
];
