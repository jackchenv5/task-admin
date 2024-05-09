<template>
  <div class="static-container">
    <el-progress :percentage="percent" type="dashboard" stroke-width=15 :color="colors">
      <template #default="">
        <span class="percentage-value">{{ percent }}%</span>
        <span class="percentage-label">{{ progressLabel }}</span>
      </template>
    </el-progress>
    <div class="statistic-card">
      <el-statistic :value="statisticValue">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            {{ statisticTitle }}
            <el-tooltip effect="dark" :content="statisticTitle" placement="top"></el-tooltip>
          </div>
        </template>
      </el-statistic>
      <div class="statistic-footer">
        <div class="footer-item">
          <span>{{ statisticFooterInfo }}</span>
          <span class="green">
                  {{statisticFooterNumber}}
                  <el-icon>
                    <User />
                  </el-icon>
                </span>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
defineProps(['percent','progressLabel','statisticValue','statisticTitle','statisticFooterInfo','statisticFooterNumber'])
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: 'red', percentage: 90 },
]

</script>

<style scoped>
.el-statistic {
  --el-statistic-content-font-size: 30px;
}
.static-container{
  display: flex;
  justify-content: space-around;

}
.statistic-card {
  height: 100%;
  padding: 20px;
  background-color: var(--el-bg-color-overlay);

}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 16px;
  font-weight: 200;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}

.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
</style>