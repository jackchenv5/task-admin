<template>
  <el-card class="box-card" >
    <div style="display:flex;justify-content:space-between;min-width:30vw">
      <el-progress :percentage="percentAll" type="dashboard" stroke-width=15 :color="colors" style="margin-left:15px;">
        <template #default="">
          <span class="percentage-value">{{ percentAll }}%</span>
          <span class="percentage-label">总执行</span>
        </template>
      </el-progress>
      <div class="statistic-card">
        <el-statistic :value="projectCast">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              总执行/万元
              <el-tooltip effect="dark" content="包括人力和非人力执行" placement="top">
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>剩余预算</span>
            <span class="red">
                  {{ 100 - percentAll  }} %
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
          </div>
        </div>
      </div>
      <div class="statistic-card">
        <el-statistic :value="projectBudget">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              总预算/万元
              <el-tooltip effect="dark" content="包括人力和非人力执行" placement="top">
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>包括人力与非人力</span>
<!--            <span class="green">-->
<!--                  22%-->
<!--                  <el-icon>-->
<!--                    <CaretTop />-->
<!--                  </el-icon>-->
<!--                </span>-->
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
const props = defineProps(['percentAll','colors','projectCast','projectBudget'])
</script>

<style scoped>
.box-card {
  width:100%;
  height: 20vh;
  border: 20px;
  display: flex;
  flex-direction: row;
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

.red {
  color: red;
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
