export interface GrowCardItem {
  icon: string;
  title: string;
  value: number;
  total: number;
  color: string;
  action: string;
}

export const growCardList: GrowCardItem[] = [
  {
    title: '总缺陷数',
    icon: 'eos-icons:counting',
    value: 200,
    total: 1010,
    color: 'green',
    action: '本月',
  },
  {
    title: '待测试缺陷数',
    icon: 'ri:todo-line',
    value: 80,
    total: 500,
    color: 'blue',
    action: '本月',
  },
  {
    title: '遗留缺陷数',
    icon: 'maki:danger',
    value: 56,
    total: 200,
    color: 'orange',
    action: '本月',
  },
  {
    title: '平均修复周期',
    icon: 'mdi:clock-outline',
    value: 8,
    total: 10,
    color: 'purple',
    action: '天',
  },
];
