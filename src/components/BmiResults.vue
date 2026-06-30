<script setup>
defineProps({
  result: Object,
  bmiCategory: String,
  idealWeightRange: String
});
</script>

<template>
  <div v-if="result" class="result-card">
    <div class="result-header">
      <h2>Your result</h2>
      <span class="badge" :class="bmiCategory.toLowerCase()">{{ bmiCategory }}</span>
    </div>
    <div class="result-grid">
      <div class="result-item">
        <span class="label">BMI</span>
        <strong>{{ result.bmi }}</strong>
      </div>
      <div class="result-item">
        <span class="label">Ideal Weight</span>
        <strong>{{ idealWeightRange }}</strong>
      </div>
      <div class="result-item">
        <span class="label">BMR</span>
        <strong>{{ result.bmr }} kcal/day</strong>
      </div>
      <div class="result-item">
        <span class="label">TDEE</span>
        <strong>{{ result.tdee }} kcal/day</strong>
      </div>
      <div class="result-item full">
        <span class="label">{{ result.goalLabel }}</span>
        <strong>{{ result.goalCalories }} kcal/day</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge.underweight {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.2) 100%);
  border-color: rgba(59, 130, 246, 0.3);
}
.badge.healthy {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%);
  border-color: rgba(16, 185, 129, 0.3);
}
.badge.overweight {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%);
  border-color: rgba(245, 158, 11, 0.3);
}
.badge.obese {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%);
  border-color: rgba(239, 68, 68, 0.3);
}
</style>
