<template>
  <Layout :class="prefixCls">
    <Layout :class="[layoutClass, `${prefixCls}-out`]">
      <LayoutSideBar />
      <Layout :class="`${prefixCls}-main`">
        <LayoutMultipleHeader />
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Layout } from 'ant-design-vue';
  import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';

  import LayoutContent from './content/index.vue';
  import LayoutSideBar from './sider/index.vue';
  import LayoutMultipleHeader from './header/MultipleHeader.vue';

  import { useDesign } from '@/hooks/web/useDesign';

  const LayoutFooter = createAsyncComponent(() => import('@/layouts/default/footer/index.vue'));

  defineOptions({ name: 'DefaultLayout' });

  const { prefixCls } = useDesign('default-layout');

  const layoutClass = computed(() => {
    let cls: string[] = ['ant-layout'];
      cls.push('ant-layout-has-sider');
    return cls;
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-default-layout';

  .@{prefix-cls} {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    background-color: @content-bg;

    > .ant-layout {
      min-height: 100%;
    }

    &-main {
      width: 100%;
      margin-left: 1px;
    }
  }

  .@{prefix-cls}-out {
    &.ant-layout-has-sider {
      .@{prefix-cls} {
        &-main {
          margin-left: 1px;
        }
      }
    }
  }
</style>
