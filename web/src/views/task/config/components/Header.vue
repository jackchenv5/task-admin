<template>
  <div class="lg:flex">

    <div class=" my-1 mx-2">
      <RadioGroup v-model:value="value1" button-style="solid">
        <RadioButton value="1">工作流</RadioButton>
        <RadioButton value="2">用户</RadioButton>
        <RadioButton value="3">组</RadioButton>
        <RadioButton value="4">角色</RadioButton>
      </RadioGroup>
    </div>

    </div>
</template>
<script lang="ts" setup>
import { Button } from 'ant-design-vue';
import {RadioGroup,RadioButton } from 'ant-design-vue';
import { ref } from 'vue';
const value1 = ref<string>('1');
</script>
