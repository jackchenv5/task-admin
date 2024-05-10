import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';
// import {t} from '@/hooks/web/useI18n';

const task: AppRouteModule = {
  path: '/task',
  name: 'task',
  component: LAYOUT,
  redirect: '/task/index',
  meta: {
    orderNo: 11,
    icon: 'ion:home',
    title: '任务系统',
  },
  children: [
    {
      path: 'index',
      name: 'index',
      // component: () => import('@/views/task/home/index.vue'),
      meta: {
        // affix: true,
        title: '任务下发',
      },
    },
    {
      path: 'config',
      name: 'config',
      // component: () => import('@/views/task/home/index.vue'),
      meta: {
        // affix: true,
        title: '配置',
      },
    },
  ],
};

export default task;
