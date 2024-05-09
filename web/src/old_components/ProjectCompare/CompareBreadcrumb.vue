<template>
  <el-container>
    <el-row style="width: 95vw">
      <el-col :span="12">
        <el-autocomplete
          v-model="queryStringInput"
          style="width: 600px"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入项目名"
          @select="handleSelect"
        >
          <template #append>
            <el-button :icon="Check" type="primary" @click="handleSubmit('add')" />
          </template>
        </el-autocomplete>
        <el-button :icon="Delete" type="primary" @click="handleSubmit('delete')" />
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { Check, Delete } from '@element-plus/icons-vue';

  import { userProjectStore } from '../../stores/Project';
  import { storeToRefs } from 'pinia';
  import { ElMessage } from 'element-plus';

  const projectStore = userProjectStore();

  const { searchProject, setFocusProject } = projectStore;

  const HomeUrl = ref(`${import.meta.env.VITE_MAIN_URL}`);
  const projectUrl = ref(`${import.meta.env.VITE_MAIN_URL}/project/index`);
  const queryStringInput = ref('');
  const selectedProjectId = ref(0);
  const selectedProjectName = ref('');
  const querySearchAsync = (queryString, cb) => {
    searchProject(queryString).then((data) => cb(data.map((x) => ({ value: x.name, id: x.id }))));
  };

  const handleSelect = (item) => {
    selectedProjectId.value = item.id;
    selectedProjectName.value = item.value;
  };
  const handleSubmit = (opt) => {
    setFocusProject(selectedProjectId.value, opt).then((x) => {
      const action = opt === 'add' ? '加入关注列表' : '移出关注列表';
      if (x)
        ElMessage({
          message: `${selectedProjectName.value}已${action}！`,
          duration: 2000,
          type: 'success',
        });
      queryStringInput.value = '';
    });
  };
</script>

<style scoped>
  .margin20 {
    margin-left: 20px;
  }
</style>
