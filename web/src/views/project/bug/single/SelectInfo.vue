<template>
  <div class="outer-line inline-block p-1" style="background-color:#f4f8ec">
  <span class="px-2">
    <Button @click="openDrawerLoading" type="primary" class="mr-2" >详情</Button>

    <Tag v-for="item in bugFilter" :key="item.name" color="blue">{{
      `${item.name}:${item.value}`
    }}</Tag>
  </span>
  <BasicDrawer @register="register1" v-bind="$attrs" title="缺陷详情" width="50%">
    <div class="h-full">
      <VxeBasicTable ref="tableRef" v-bind="gridOptions">
        <template #action="{ row }">
          <TableAction outside :actions="createActions(row)" />
        </template>
      </VxeBasicTable>
    </div>
  </BasicDrawer>

  </div>
</template>
<script setup lang="ts">
  import { reactive, ref, computed } from 'vue';
  import { ActionItem, TableAction } from '@/components/Table';
  import { vxeTableColumns, vxeTableFormSchema } from './tableData';
  import { BasicTableProps, VxeBasicTable, VxeGridInstance } from '@/components/VxeTable';
  import { demoListApi } from '@/api/demo/table';
  import { Tag, Button } from 'ant-design-vue';
  import { BasicDrawer, useDrawer } from '@/components/Drawer';
  import { useProjectBugStore } from '@/store/modules/projectBug';

  const { getBugFilter } = useProjectBugStore();
  const bugFilter = computed(() => {
    return getBugFilter;
  });
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
    height: '800',
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
          // location.href = 'http://dmp.maipu.com/ticket/298468';
          open('http://dmp.maipu.com/ticket/298468');
        },
      },
    ];

    return actions;
  };

  const [register1, { openDrawer: openDrawer1, setDrawerProps }] = useDrawer();
  function openDrawerLoading() {
    openDrawer1(true);
    setDrawerProps({ loading: true });
    setTimeout(() => {
      setDrawerProps({ loading: false });
    }, 1000);
  }
</script>

<style scoped>
.outer-line {
    flex-basis: 25%;border:1px solid #d9dfe4;border-radius: 5px;
}

</style>