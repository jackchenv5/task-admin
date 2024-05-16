<template>
  <div class="p-0">
    <BasicTable @register="registerTable" @edit-change="onEditChange">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增工作流 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record)" />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ActionItem,
    EditRecordRow,
  } from '@/components/Table';
  import { granularityListApi, jobAddApi, jobDeleteApi, jobListApi, jobModifyApi, jobStatusListApi } from '@/api/task/job';
  import { cloneDeep } from 'lodash-es';
  import { useMessage } from '@/hooks/web/useMessage';
import { userListApi } from '@/api/task/user';
import { groupListApi } from '@/api/task/group';

  const columns: BasicColumn[] = [
        {
          title: 'ID',
          dataIndex: 'id',
          width: 80,
        },
        {
          title: '名称',
          dataIndex: 'name',
          editRow: true,
          width: 150,
        },
        {
          title: '属主',
          dataIndex: 'creater_name',
          editRow: true,
          width: 150,
          editComponent: 'ApiSelect',
          editComponentProps: {
            api: userListApi,
            resultField: 'items',
            labelField: 'username',
            valueField: 'id',
          },
        },
        {
          title: '是否激活',
          dataIndex: 'status_name',
          editRow: true,
          width: 150,
          editComponent: 'ApiSelect',
          editComponentProps: {
            api: jobStatusListApi,
            resultField: 'items',
            labelField: 'name',
            valueField: 'id',
          },
        },
        {
          title: '任务粒度',
          dataIndex: 'granularity_name',
          editRow: true,
          width: 150,
          editComponent: 'ApiSelect',
          editComponentProps: {
            api: granularityListApi,
            resultField: 'items',
            labelField: 'name',
            valueField: 'id',
          },
        },
        {
          title: '工作组',
          dataIndex: 'group_name',
          editRow: true,
          width: 150,
          editComponent: 'ApiSelect',
          editComponentProps: {
            api: groupListApi,
            resultField: 'items',
            labelField: 'name',
            valueField: 'id',
          },
        },
        // {
        //   title: '最近修改时间',
        //   dataIndex: 'modifydate',
        //   editRow: true,
        //   editComponent: 'DatePicker',
        //   editComponentProps: {
        //     valueFormat: 'YYYY-MM-DD',
        //     format: 'YYYY-MM-DD',
        //   },
        //   width: 150,
        // },
        {
          title: '描述信息',
          dataIndex: 'description',
          editRow: true,
          width: 150,
        },
  ];

  const { createMessage: msg } = useMessage();
  const currentEditKeyRef = ref('');
  const [registerTable,methods] = useTable({
    // title: '可编辑行示例',
    // titleHelpMessage: [
    //   '本例中修改[数字输入框]这一列时，同一行的[远程下拉]列的当前编辑数据也会同步发生改变',
    // ],
    api: jobListApi,
    columns: columns,
    canResize: true,
    // resizeHeightOffset:500,
    bordered: false,
    showIndexColumn: false,
    showTableSetting: true,
    tableSetting: { fullScreen: false },
    actionColumn: {
      width: 160,
      title: 'Action',
      dataIndex: 'action',
    },
  });

  function handleEdit(record: EditRecordRow) {
    currentEditKeyRef.value = record.key;
    record.onEdit?.(true);
  }

  function handleCancel(record: EditRecordRow) {
    currentEditKeyRef.value = '';
    record.onEdit?.(false, false);
  }

  async function handleSave(record: EditRecordRow) {
    // 校验
    msg.loading({ content: '正在保存...', duration: 0, key: 'saving' });
    const valid = await record.onValid?.();
    if (valid) {
      try {
        const data = cloneDeep(record.editValueRefs);
        const postData = {name:record.name,description:record.description}
        //没修改
        console.log('record',record)
        console.log('data',data)
        console.log('record.group_name === data.group_name',record.group_name,data.group_name)
        if( !record.creater || record.creater_name !== data.creater_name) postData['creater'] = data.creater_name
        if(!record.status || record.status_name !== data.status_name) postData['status'] = data.status_name
        if(!record.granularity || record.granularity_name !== data.granularity_name) postData['granularity'] = data.granularity_name
        if(!record.group || record.group !== data.group_name) postData['group'] = data.group_name
        console.log(postData);
        //TODO 此处将数据提交给服务器保存
        jobModifyApi(record.id,postData)
        // ...
        // 保存之后提交编辑状态
        const pass = await record.onEdit?.(false, true);
        if (pass) {
          currentEditKeyRef.value = '';
        }
        msg.success({ content: '数据已保存', key: 'saving' });
      } catch (error) {
        msg.error({ content: '保存失败', key: 'saving' });
      }
    } else {
      msg.error({ content: '请填写正确的数据', key: 'saving' });
    }
  }
  async function handleDelete(record: EditRecordRow) {
    // 校验
      // msg.loading({ content: '正在删除...', duration: 0, key: 'delete' });
      //TODO 此处将数据提交给服务器保存
      // methods.reload()
      try{
        await jobDeleteApi(record.id);
        msg.success({ content: `${record.name}删除成功！`, key: 'delete' });
      } catch (e){
        msg.success({ content: `${record.name}删除失败！`, key: 'delete' });
      }finally{
        currentEditKeyRef.value = '';
        // 刷新
        methods.reload()
      }
        

  }
  function createActions(record: EditRecordRow): ActionItem[] {
    if (!record.editable) {
      return [
        {
          label: '编辑',
          disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
          onClick: handleEdit.bind(null, record),
        },
        {
          label: '删除',
          disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
          onClick: handleDelete.bind(null, record),
        },
      ];
    }
    return [
      {
        label: '保存',
        onClick: handleSave.bind(null, record),
      },
      {
        label: '取消',
        popConfirm: {
          title: '是否取消编辑',
          confirm: handleCancel.bind(null, record),
        },
      },
    ];
  }

  function onEditChange({ column, value, record }) {
    // 本例
    if (column.dataIndex === 'id') {
      record.editValueRefs.name4.value = `${value}`;
    }
    console.log(column, value, record);
  }

  async function handleCreate(){
    await jobAddApi()
    // 刷新
    await methods.reload()
    const data = methods.getDataSource()
    const curRow = data[data.length-1]
    currentEditKeyRef.value = curRow.key
    curRow.onEdit?.(true);
  }
</script>
