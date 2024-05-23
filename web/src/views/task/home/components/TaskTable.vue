<template>
  <div class="p-0">
    <BasicTable @register="registerTable" @edit-change="onEditChange" @row-click="handleRowClick"  >
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增任务 </a-button>
        <a-button type="primary" @click="handleCreate" disabled> 转为未发布 </a-button>
        <a-button type="primary" @click="handleCreate" disabled> 发布 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record)" />
        </template>
      </template>
    </BasicTable>
  </div>
  <Modal v-model:open="open" title="复制任务" @ok="handleOk">
    <div class="flex justify-center items-center">
      <p class="mt-3 ml-4 font-bold">指定用户：</p>
      <ApiMultiSelect style="width: 400px" v-model:value="selectedUser" :api="userListApi" result-field="items" value-field="id" label-field="username"></ApiMultiSelect>
    </div>
    </Modal>
</template>
<script lang="ts" setup>
  import { ref,computed,watch } from 'vue';
  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ActionItem,
    EditRecordRow,
    ColumnChangeParam,
  } from '@/components/Table';
  import { taskAddApi, taskDeleteApi, taskListApi, taskModifyApi,categoryListApi, taskStatusListApi } from '@/api/task/task';
  import { cloneDeep,debounce  } from 'lodash-es';
  import { useMessage } from '@/hooks/web/useMessage';
  import { userListApi } from '@/api/task/user';
  import {Modal,Select} from 'ant-design-vue';
  import { useTaskStore } from '@/store/modules/task';
  import  ApiMultiSelect  from '@/components/Form/src/components/ApiMultiSelect.vue'
  import _ from 'lodash-es';  
  const store = useTaskStore();
  const curFilterInfo = computed(() => store.filterInfo)
  const filterInfo = store.filterInfo
  watch(filterInfo,()=>{
    methods.reload({filterInfo:filterInfo})
    // debounce(()=>{
    //   methods.reload()
    // },300)
    
  })
  const columns: BasicColumn[] = [
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
  const { createMessage: msg } = useMessage();
  
  const currentEditKeyRef = ref('');
  const currentCopyRow = ref();

  watch(currentEditKeyRef,()=>{
    console.log('currentEditKeyRef',currentEditKeyRef.value)
      if(currentEditKeyRef.value === ''){
        store.setDisabled(true)
      }else{
        store.setDisabled(false)
      }
  })
  const [registerTable,methods] = useTable({
    // title: '可编辑行示例',
    // titleHelpMessage: [
    //   '本例中修改[数字输入框]这一列时，同一行的[远程下拉]列的当前编辑数据也会同步发生改变',
    // ],
    api: taskListApi,
    columns: columns,
    canResize: true,
    // resizeHeightOffset:200,
    bordered: false,
    showIndexColumn: false,
    showTableSetting: true,
    tableSetting: { fullScreen: false },
    actionColumn: {
      width: 160,
      title: 'Action',
      dataIndex: 'action',
    },
    pagination:{
      defaultPageSize: 100,
      pageSize: 100,
      hideOnSinglePage: true,
      showSizeChanger: false,
      showQuickJumper: false
    }
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
        const postData = {
          name:record.name,start_time:record.start_time,deadline_time:record.deadline_time,workload:record.workload,
          content:record.content,challenge:record.challenge,feedback:record.feedback
        }
        //没修改
        console.log('record',record)
        console.log('data',data)
        if(data.receiver_name !== "未指定" && (!record.receiver || record.receiver_name !== data.receiver_name)) postData['receiver'] = data.receiver_name
        if(data.category_name !== "未指定" && (!record.category || record.category_name !== data.category_name || record.category === record.category_name)) postData['category'] = data.category_name
        // if(data.status_name !== "未指定" && (!record.status || record.status !== data.status_name)) postData['status'] = data.status_name
        if(data.related_task_name !== "未指定" && (!record.related_task || record.related_task_name !== data.related_task_name)) postData['related_task'] = data.related_task_name
        console.log(postData);
        //TODO 此处将数据提交给服务器保存
        taskModifyApi(record.id,postData)
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
        await taskDeleteApi(record.id);
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
        {
          label: '复制',
          disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
          onClick: handleCreatePrompt.bind(null, record),
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
    console.log('size===>',methods.getSize())
    // methods.scrollTo()
    console.log(column, value, record);
  }

  function handleRowClick(record) {
    store.setTaskInfo(record)
    //
  }
  
  async function handleCreate(){
    await taskAddApi()
    // 刷新
    await methods.reload()
    const data = methods.getDataSource()
    const curRow = data[data.length-1]
    currentEditKeyRef.value = curRow.key
    curRow.onEdit?.(true);
  }

  //复制按钮
  const open = ref<boolean>(false);
  const selectedUser = ref([]);

  watch(selectedUser,()=>{
    console.log('selectedUser=>',selectedUser.value)
  })

  const handleCreatePrompt = (record: EditRecordRow) => {
    selectedUser.value = []
    currentCopyRow.value = record
    open.value = true;
  };
  const handleOk = (e: MouseEvent) => {
    console.log(e);
    //获取用户列表
    console.log('selectedUser.value',selectedUser.value)

    //获取行信息，替换user
    console.log('currentCopyRow.value',currentCopyRow.value)
    //状态设置为草稿
    selectedUser.value.forEach(x=>{
      const postData = {};
      const postItem = ["name","receiver","creater","category","content","challenge","feedback","start_time","deadline_time","workload","status","related_task"]
      postItem.forEach(
        y=>{
          if(y === 'receiver'){
            postData['receiver'] = x
          }else if(y === 'status'){
            postData['status'] = 3 //草稿
          }else if(y === 'creater'){
            postData['creater'] = 1 //零时
          }else{
            postData[y] = currentCopyRow.value[y]
          }
          taskAddApi(postData)
        }
      )
    })
    open.value = false;
  };
  const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
</script>