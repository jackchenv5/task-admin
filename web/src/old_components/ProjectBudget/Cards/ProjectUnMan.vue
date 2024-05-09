<template>
  <el-card class="box-card" @click="$emit('showUnManCard')">
    <div style="min-width: 19vw;display:flex;justify-content:space-between;">
      <el-progress :percentage="percentUnMan" type="dashboard" :stroke-width=15 :color="colors" style="margin-left:15px;">
        <template #default="">
          <span class="percentage-value">{{ percentUnMan }}%</span>
          <span class="percentage-label">非人力执行</span>
        </template>
      </el-progress>
      <div class="statistic-card">
        <el-statistic :value="projectUnManCast">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              非人力执行/万元
              <el-tooltip effect="dark" content="Number of users who logged into the product in one day"
                          placement="top">
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>非人力预算</span>
            <span class="green">
                  {{ projectUnManBudget }} 万元
                  <el-icon>
                    <Wallet />
                  </el-icon>
                </span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
 defineProps(['percentUnMan','colors','projectUnManCast','projectUnManBudget'])
</script>

<style scoped>
.box-card {
  height: 20vh;
  border: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.el-statistic {
  --el-statistic-content-font-size: 33px;
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