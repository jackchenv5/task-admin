import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';
// import {t} from '@/hooks/web/useI18n';

const project: AppRouteModule = {
  path: '/project',
  name: 'Project',
  component: LAYOUT,
  redirect: '/project/index',
  meta: {
    orderNo: 11,
    icon: 'ion:home',
    title: '看板',
  },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('@/views/project/home/index.vue'),
      meta: {
        // affix: true,
        title: '首页',
      },
    },
    {
      path: 'bug',
      name: '项目缺陷',
      redirect: '/project/bug/index',
      meta: {
        title: '项目缺陷',
      },
      children: [
        {
          path: 'index',
          name: 'bug-index',
          component: () => import('@/views/project/bug/CompareIndex.vue'),
          meta: {
            title: '项目对比',
          },
        },
        {
          path: 'index/:projectId',
          name: 'bug',
          component: () => import('@/views/project/bug/SingleIndex.vue'),
          meta: {
            title: '缺陷分析',
          },
        },
        {
          path: 'table',
          name: '缺陷数据',
          component: () => import('@/views/project/table/VxeTable.vue'),
          meta: {
            title: '缺陷数据',
          },
        },
      ],
    },
  ],
};

export default project;
