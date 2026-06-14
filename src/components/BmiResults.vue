<script setup>
import { computed } from 'vue';

const props = defineProps({
  stats: {
    type: Object,
    required: true
  }
});

// Calculations
const bmi = computed(() => {
  const heightInMeters = props.stats.height / 100;
  return Number((props.stats.weight / (heightInMeters * heightInMeters)).toFixed(1));
});

// Mifflin-St Jeor Equation
const bmr = computed(() => {
  const { weight, height, age, gender } = props.stats;
  if (gender === 'male') {
    return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
  } else {
    return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
  }
});

const tdee = computed(() => {
  const factors = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    active: 1.725
  };
  const factor = factors[props.stats.activityLevel] || 1.2;
  return Math.round(bmr.value * factor);
});

const targetCalories = computed(() => {
  const { goal } = props.stats;
  if (goal === 'lose') {
    // 500 kcal deficit, floor at 1200 for safe metabolism
    return Math.max(1200, tdee.value - 500);
  } else if (goal === 'gain') {
    // 400 kcal surplus
    return tdee.value + 400;
  }
  return tdee.value; // Maintain
});

// South Asian BMI Classifications (WHO Guidelines for South Asians)
const bmiStatus = computed(() => {
  const val = bmi.value;
  if (val < 18.5) {
    return { label: 'Underweight', color: '#38bdf8', class: 'underweight', desc: 'Lower than healthy body weight. A nutritional surplus is recommended.' };
  } else if (val < 23.0) {
    return { label: 'Normal Weight', color: '#10b981', class: 'normal', desc: 'Excellent! You are in the healthy weight range for South Asian populations.' };
  } else if (val < 25.0) {
    return { label: 'Overweight (Pre-Obese)', color: '#f59e0b', class: 'overweight', desc: 'Slightly above the ideal range. Increased metabolic risks apply.' };
  } else {
    return { label: 'Obese', color: '#ef4444', class: 'obese', desc: 'Higher risk of cardiovascular conditions and insulin resistance. Calorie deficit & activity are recommended.' };
  }
});

// Ideal weight based on South Asian normal BMI range (18.5 to 22.9)
const idealWeightRange = computed(() => {
  const heightM = props.stats.height / 100;
  const min = Math.round(18.5 * heightM * heightM);
  const max = Math.round(22.9 * heightM * heightM);
  return { min, max };
});

const weightDelta = computed(() => {
  const w = props.stats.weight;
  const range = idealWeightRange.value;
  if (w < range.min) {
    return { status: 'under', diff: range.min - w, text: `Increase weight by ${range.min - w} kg to reach normal range.` };
  } else if (w > range.max) {
    return { status: 'over', diff: w - range.max, text: `Lose ${w - range.max} kg to reach normal range.` };
  }
  return { status: 'perfect', diff: 0, text: 'You are currently inside the ideal weight range!' };
});

// Pointer position in percentage on the gauge line
const gaugePercentage = computed(() => {
  const val = bmi.value;
  if (val <= 15) return 0;
  if (val >= 35) return 100;
  // Map range [15, 35] to [0, 100]
  return ((val - 15) / (35 - 15)) * 100;
});
</script>

<template>
  <div class="results-container glass-panel">
    <div class="results-grid">
      
      <!-- BMI Score Card -->
      <div class="bmi-score-card">
        <h3 class="card-title">Your BMI Score</h3>
        <div class="bmi-value-circle" :style="{ borderColor: bmiStatus.color }">
          <span class="bmi-number" :style="{ color: bmiStatus.color }">{{ bmi }}</span>
          <span class="bmi-unit">kg/m²</span>
        </div>
        <div class="bmi-badge" :style="{ backgroundColor: bmiStatus.color }">
          {{ bmiStatus.label }}
        </div>
        <p class="bmi-desc">{{ bmiStatus.desc }}</p>
      </div>

      <!-- BMI Meter & Scales -->
      <div class="bmi-meter-card">
        <h3 class="card-title">South Asian BMI scale</h3>
        <p class="scale-info">
          💡 South Asians carry higher risk of diabetes and cardiovascular illnesses at lower BMI levels. The scale below reflects regional guidelines.
        </p>

        <!-- Visual Slider Line -->
        <div class="gauge-wrapper">
          <div class="gauge-track">
            <div class="gauge-zone zone-under" style="width: 17.5%;"></div>
            <div class="gauge-zone zone-normal" style="width: 22.5%;"></div>
            <div class="gauge-zone zone-over" style="width: 10%;"></div>
            <div class="gauge-zone zone-obese" style="width: 50%;"></div>
            <div 
              class="gauge-pointer" 
              :style="{ left: gaugePercentage + '%', backgroundColor: bmiStatus.color }"
            >
              <div class="pointer-label">{{ bmi }}</div>
            </div>
          </div>
          <div class="gauge-labels">
            <span>15.0</span>
            <span>18.5</span>
            <span>23.0</span>
            <span>25.0</span>
            <span>35.0</span>
          </div>
        </div>

        <!-- Metric Details Table -->
        <div class="metrics-grid">
          <div class="metric-item">
            <span class="metric-label">Ideal Weight</span>
            <span class="metric-value">{{ idealWeightRange.min }} - {{ idealWeightRange.max }} kg</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Current Status</span>
            <span class="metric-value" :style="{ color: bmiStatus.color }">{{ weightDelta.text }}</span>
          </div>
        </div>
      </div>
      
    </div>

    <!-- Energy Summary Row -->
    <div class="energy-dashboard">
      <div class="energy-card">
        <div class="energy-icon">🔥</div>
        <div class="energy-details">
          <span class="energy-title">BMR (Basal Calories)</span>
          <span class="energy-value">{{ bmr }} kcal</span>
          <span class="energy-desc">Required to keep you alive in rest state</span>
        </div>
      </div>

      <div class="energy-card">
        <div class="energy-icon">⚡</div>
        <div class="energy-details">
          <span class="energy-title">TDEE (Maintenance)</span>
          <span class="energy-value">{{ tdee }} kcal</span>
          <span class="energy-desc">Total burned calories including activity</span>
        </div>
      </div>

      <div class="energy-card highlight">
        <div class="energy-icon">🍽️</div>
        <div class="energy-details">
          <span class="energy-title">Target Daily Intake</span>
          <span class="energy-value green-text">{{ targetCalories }} kcal</span>
          <span class="energy-desc">Calorie target optimized for your goal</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.results-container {
  padding: 2.5rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  margin-bottom: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.results-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
}

@media (max-width: 900px) {
  .results-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
}

.bmi-score-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.15);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.bmi-value-circle {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 6px solid #10b981;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.2rem;
  background: rgba(0, 0, 0, 0.2);
}

.bmi-number {
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.1;
}

.bmi-unit {
  font-size: 0.75rem;
  color: #a0aec0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.bmi-badge {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.bmi-desc {
  font-size: 0.85rem;
  color: #cbd5e1;
  line-height: 1.5;
}

.bmi-meter-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.15);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.scale-info {
  font-size: 0.85rem;
  color: #cbd5e1;
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.2);
  padding: 12px;
  border-radius: 12px;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.gauge-wrapper {
  margin: 1.5rem 0 2rem 0;
  position: relative;
}

.gauge-track {
  height: 14px;
  border-radius: 7px;
  width: 100%;
  display: flex;
  overflow: visible;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
}

.gauge-zone {
  height: 100%;
}

.zone-under {
  background-color: #38bdf8;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
}

.zone-normal {
  background-color: #10b981;
}

.zone-over {
  background-color: #f59e0b;
}

.zone-obese {
  background-color: #ef4444;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
}

.gauge-pointer {
  width: 6px;
  height: 26px;
  border-radius: 3px;
  position: absolute;
  top: -6px;
  transform: translateX(-50%);
  border: 1.5px solid #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.pointer-label {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  color: #000;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
}

.gauge-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.75rem;
  color: #a0aec0;
  font-weight: 600;
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  margin-top: 1rem;
}

@media (max-width: 600px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}

.metric-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
}

.metric-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #a0aec0;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.4;
}

.energy-dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 800px) {
  .energy-dashboard {
    grid-template-columns: 1fr;
  }
}

.energy-card {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
}

.energy-card.highlight {
  background: rgba(16, 185, 129, 0.05);
  border-color: rgba(16, 185, 129, 0.2);
}

.energy-icon {
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.energy-card.highlight .energy-icon {
  background: rgba(16, 185, 129, 0.15);
}

.energy-details {
  display: flex;
  flex-direction: column;
}

.energy-title {
  font-size: 0.85rem;
  color: #a0aec0;
  font-weight: 600;
  margin-bottom: 2px;
}

.energy-value {
  font-size: 1.6rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 4px;
}

.energy-value.green-text {
  color: #10b981;
}

.energy-desc {
  font-size: 0.75rem;
  color: #cbd5e1;
  line-height: 1.4;
}
</style>
