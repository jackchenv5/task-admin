<template>
  <el-card class="box-card" >
    <div style="min-width: 19vw;display:flex;justify-content:space-between;">
      <el-progress :percentage="percentMan" type="dashboard" stroke-width=15 :color="colors" style="margin-left:15px;">
        <template #default="">
          <span class="percentage-value">{{ percentMan }}%</span>
          <span class="percentage-label">人力执行</span>
        </template>
      </el-progress>
      <div class="statistic-card">
        <el-statistic :value="projectManCast">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              人力执行/万元
              <el-tooltip effect="dark" content="人力执行" placement="top">
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>人力总预算</span>
            <span class="green">
                  {{projectManBudget}} 万元
                  <el-icon>
                    <User />
                  </el-icon>
                </span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
defineProps(['percentMan','colors','projectManCast','projectManBudget'])
</script>

<style scoped>
.box-card {
  height: 20vh;
  border: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
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