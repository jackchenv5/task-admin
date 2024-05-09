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
    title: '缺陷发现数',
    icon: 'visit-count|svg',
    value: 20,
    total: 100,
    color: 'green',
    action: '本月',
  },
  {
    title: '待解决数',
    icon: 'total-sales|svg',
    value: 10,
    total: 20,
    color: 'blue',
    action: '本月',
  },
  {
    title: '缺陷遗留数',
    icon: 'download-count|svg',
    value: 5,
    total: 20,
    color: 'orange',
    action: '生命周期',
  },
  {
    title: '平均修复周期',
    icon: 'transaction|svg',
    value: 8,
    total: 10,
    color: 'purple',
    action: '天',
  },
];
