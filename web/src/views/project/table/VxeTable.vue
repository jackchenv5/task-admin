<template>
  <PageWrapper
    title="当前项目： 缺陷分析测试项目"
    content="缺陷总体情况：项目总缺陷数、测试缺陷数、项目遗留缺陷数（状态是待测试之前）"
    contentFullHeight
    fixedHeight
  >
    <VxeBasicTable ref="tableRef" v-bind="gridOptions">
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
    </VxeBasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { ActionItem, TableAction } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useMessage } from '@/hooks/web/useMessage';
  import { vxeTableColumns, vxeTableFormSchema } from './tableData';
  import { BasicTableProps, VxeBasicTable, VxeGridInstance } from '@/components/VxeTable';
  import { demoListApi } from '@/api/demo/table';

  const { createMessage } = useMessage();

  const tableRef = ref<VxeGridInstance>();

  const gridOptions = reactive<BasicTableProps>({
    id: 'VxeTable',
    keepSource: true,
    editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
    columns: vxeTableColumns,
    toolbarConfig: {},
    formConfig: {
      enabled: true,
      items: vxeTableFormSchema,
    },
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page, form }) => {
          return demoListApi({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...form,
          });
        },
        queryAll: async ({ form }) => {
          return await demoListApi(form);
        },
      },
    },
  });

  // 操作按钮（权限控制）
  const createActions = (record) => {
    const actions: ActionItem[] = [
      {
        label: '详情',
        onClick: () => {
          location.href = "http://dmp.maipu.com/ticket/298468"
        },
      },
      {
        label: '编辑',
        onClick: () => {},
      },
      {
        label: '删除',
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          confirm: () => {
            tableRef.value?.remove(record);
          },
        },
      },
    ];

    return actions;
  };
</script>
