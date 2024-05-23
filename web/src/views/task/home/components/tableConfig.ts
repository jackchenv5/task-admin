import {
  BasicColumn,
} from '@/components/Table';

import {taskListApi,categoryListApi, taskStatusListApi } from '@/api/task/task';
import { userListApi } from '@/api/task/user';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
  title: '名称',
  dataIndex: 'name',
  editRow: true,
  width: 200,
  fixed: 'left',
},
{
    title: '下发者',
    dataIndex: 'creater_name',
    width: 150,
  },
  {
    title: '执行者',
    dataIndex: 'receiver_name',
    editRow: true,
    width: 150,
    editComponent: 'ApiSearchSelect',
    editComponentProps: {
      api: userListApi,
      resultField: 'items',
      labelField: 'username',
      valueField: 'id',
    },
  },
  {
title: '开始时间',
dataIndex: 'start_time',
editRow: true,
editComponent: 'DatePicker',
editComponentProps: {
  valueFormat: 'YYYY-MM-DD',
  format: 'YYYY-MM-DD',
},
width: 150,
},
{
title: '截止时间',
dataIndex: 'deadline_time',
editRow: true,
editComponent: 'DatePicker',
editComponentProps: {
  valueFormat: 'YYYY-MM-DD',
  format: 'YYYY-MM-DD',
},
width: 150,
},
{
  title: '状态',
  dataIndex: 'status_name',
  editRow: true,
  editComponent: 'ApiSelect',
  editComponentProps: {
    api: taskStatusListApi,
    resultField: 'items',
    labelField: 'name',
    valueField: 'id',
  },
  width: 150,
},
{
  title: '工作量',
  dataIndex: 'workload',
  editRow: true,
  width: 60,
},
{
  title: '关联任务ID',
  dataIndex: 'related_task_name',
  editRow: true,
  width: 200,
  editComponent: 'ApiSearchSelect',
  editComponentProps: {
    api: taskListApi,
    resultField: 'items',
    labelField: 'name',
    valueField: 'id',
  },
},
{
    title: '项目',
    dataIndex: 'category_name',
    editRow: true,
    width: 400,
    editComponent: 'ApiSelect',
    editComponentProps: {
      api: categoryListApi,
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
    },
  },
];