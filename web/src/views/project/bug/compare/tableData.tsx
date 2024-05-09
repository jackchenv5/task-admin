import { optionsListApi, fixListApi, ListDetectApi, optionsStatusApi } from '@/api/demo/select';
import { VxeFormItemProps, VxeGridPropTypes } from '@/components/VxeTable';
import { ref } from 'vue';
import { Input } from 'ant-design-vue';

export const vxeTableColumns: VxeGridPropTypes.Columns = [
  {
    title: '序号',
    type: 'seq',
    fixed: 'left',
    width: '50',
    align: 'center',
  },
  {
    title: '属主',
    field: 'owner',
    width: '70',
    showOverflow: 'tooltip',
    fixed: 'left',
  },
  {
    title: '组',
    field: 'group',
    width: '120',
  },
  {
    title: '部门',
    field: 'depart',
    width: '120',
  },
  {
    title: '所属模块',
    field: 'mod',
    // width: '160',
  },
  {
    title: '状态',
    field: 'status',
    // width: '80',
  },
  {
    title: '发现方式',
    field: 'type',
    // width: 180,
    showOverflow: 'tooltip',
    align: 'center',
  },
  {
    title: '问题类别',
    field: 'issueType',
    // width: 180,
    showOverflow: 'tooltip',
    align: 'center',
    sortable: true,
  },
  {
    width: 80,
    title: '操作',
    align: 'center',
    slots: { default: 'action' },
    // fixed: 'right',
    // fixed: 'center',
  },
];

export const vxeTableFormSchema: VxeFormItemProps[] = [
  {
    field: 'owner',
    title: '属主：',
    itemRender: {
      name: 'AInput',
    },
    span: 4,
  },
  {
    field: 'group',
    title: '组：',
    itemRender: {
      name: 'AInput',
    },
    span: 4,
  },
  {
    field: 'status',
    title: '状态：',
    itemRender: {
      name: 'AApiSelect',
      props: {
        api: optionsStatusApi,
        resultField: 'list',
        labelField: 'name',
        valueField: 'id',
      },
    },
    span: 4,
  },
  {
    field: 'type',
    title: '类型：',
    itemRender: {
      name: 'AApiSelect',
      props: {
        api: optionsListApi,
        resultField: 'list',
        labelField: 'name',
        valueField: 'id',
      },
    },
    span: 6,
  },
  {
    field: 'find',
    title: '发现方式：',
    itemRender: {
      name: 'AApiSelect',
      props: {
        api: ListDetectApi,
        resultField: 'find',
        labelField: 'name',
        valueField: 'id',
      },
    },
    span: 6,
  },
  // {
  //   span: 4,
  //   align: 'right',
  //   className: '!pr-0',
  //   itemRender: {
  //     name: 'AButtonGroup',
  //     children: [
  //       {
  //         props: { type: 'primary', content: '查询', htmlType: 'submit' },
  //         attrs: { class: 'mr-2' },
  //       },
  //       { props: { type: 'default', htmlType: 'reset', content: '重置' } },
  //     ],
  //   },
  // },
];
