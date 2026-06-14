<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['calculate']);

// Form states
const gender = ref('male');
const age = ref(25);
const activityLevel = ref('sedentary');
const goal = ref('lose');

// Unit systems ('metric' or 'imperial')
const unitSystem = ref('metric');

// Metric states
const weightKg = ref(70);
const heightCm = ref(170);

// Imperial states
const weightLbs = ref(154);
const heightFt = ref(5);
const heightIn = ref(7);

// Synchronize metric and imperial weights
const syncWeight = (fromUnit) => {
  if (fromUnit === 'metric') {
    weightLbs.value = Math.round(weightKg.value * 2.20462);
  } else {
    weightKg.value = Math.round(weightLbs.value / 2.20462);
  }
};

// Synchronize metric and imperial heights
const syncHeight = (fromUnit) => {
  if (fromUnit === 'metric') {
    const totalInches = heightCm.value / 2.54;
    heightFt.value = Math.floor(totalInches / 12);
    heightIn.value = Math.round(totalInches % 12);
  } else {
    const totalCm = (heightFt.value * 12 + heightIn.value) * 2.54;
    heightCm.value = Math.round(totalCm);
  }
};

const handleUnitChange = (unit) => {
  unitSystem.value = unit;
};

const submitForm = () => {
  // Emit final metric values for consistent BMI and BMR calculation
  const finalWeight = weightKg.value;
  const finalHeight = heightCm.value;

  emit('calculate', {
    gender: gender.value,
    age: age.value,
    weight: finalWeight,
    height: finalHeight,
    activityLevel: activityLevel.value,
    goal: goal.value,
  });
};

const activityOptions = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise, desk job', factor: 1.2, icon: '🛋️' },
  { value: 'lightly_active', label: 'Lightly Active', desc: 'Light exercise/sports 1-3 days/week', factor: 1.375, icon: '🚶' },
  { value: 'moderately_active', label: 'Moderately Active', desc: 'Moderate exercise/sports 3-5 days/week', factor: 1.55, icon: '🏃' },
  { value: 'active', label: 'Very Active', desc: 'Hard exercise/sports 6-7 days/week', factor: 1.725, icon: '🏋️' }
];

const goalOptions = [
  { value: 'lose', label: 'Lose Weight', desc: 'Burn fat with a healthy calorie deficit', icon: '📉' },
  { value: 'maintain', label: 'Maintain Weight', desc: 'Keep your current weight and optimize health', icon: '⚖️' },
  { value: 'gain', label: 'Gain Weight', desc: 'Build lean muscle mass and strength', icon: '📈' }
];
</script>

<template>
  <div class="calculator-card glass-panel">
    <h2 class="section-title">📊 Tell Us About Yourself</h2>
    <p class="section-subtitle">We will customize your Pakistani diet plan based on your metabolic stats.</p>

    <!-- Unit Selector Toggle -->
    <div class="toggle-container">
      <button 
        class="toggle-btn" 
        :class="{ active: unitSystem === 'metric' }" 
        @click="handleUnitChange('metric')"
      >
        Metric (kg, cm)
      </button>
      <button 
        class="toggle-btn" 
        :class="{ active: unitSystem === 'imperial' }" 
        @click="handleUnitChange('imperial')"
      >
        Imperial (lbs, ft/in)
      </button>
    </div>

    <form @submit.prevent="submitForm" class="calculator-form">
      
      <!-- Gender Selection -->
      <div class="form-group">
        <label class="input-label">Gender</label>
        <div class="gender-cards">
          <label class="gender-card" :class="{ selected: gender === 'male' }">
            <input type="radio" v-model="gender" value="male" class="hidden-radio" />
            <span class="gender-icon">👨</span>
            <span class="gender-text">Male</span>
          </label>
          <label class="gender-card" :class="{ selected: gender === 'female' }">
            <input type="radio" v-model="gender" value="female" class="hidden-radio" />
            <span class="gender-icon">👩</span>
            <span class="gender-text">Female</span>
          </label>
        </div>
      </div>

      <!-- Age & Weight Section -->
      <div class="form-row">
        <!-- Age Field -->
        <div class="form-group flex-1">
          <label for="age-input" class="input-label">Age (years)</label>
          <input 
            id="age-input"
            type="number" 
            v-model.number="age" 
            min="15" 
            max="100" 
            class="input-field" 
            required 
          />
        </div>

        <!-- Weight Field -->
        <div class="form-group flex-1" v-if="unitSystem === 'metric'">
          <label for="weight-kg-input" class="input-label">Weight (kg)</label>
          <input 
            id="weight-kg-input"
            type="number" 
            v-model.number="weightKg" 
            min="30" 
            max="250" 
            @input="syncWeight('metric')" 
            class="input-field" 
            required 
          />
        </div>
        <div class="form-group flex-1" v-else>
          <label for="weight-lbs-input" class="input-label">Weight (lbs)</label>
          <input 
            id="weight-lbs-input"
            type="number" 
            v-model.number="weightLbs" 
            min="66" 
            max="550" 
            @input="syncWeight('imperial')" 
            class="input-field" 
            required 
          />
        </div>
      </div>

      <!-- Height Input -->
      <div class="form-group">
        <label class="input-label">Height</label>
        
        <!-- Metric Height -->
        <div v-if="unitSystem === 'metric'" class="slider-container">
          <div class="slider-header">
            <span>{{ heightCm }} cm</span>
          </div>
          <input 
            type="range" 
            v-model.number="heightCm" 
            min="100" 
            max="220" 
            @input="syncHeight('metric')"
            class="range-slider" 
          />
        </div>

        <!-- Imperial Height -->
        <div v-else class="height-imperial-row">
          <div class="form-group flex-1">
            <label for="height-ft-input" class="sub-label">Feet</label>
            <input 
              id="height-ft-input"
              type="number" 
              v-model.number="heightFt" 
              min="3" 
              max="7" 
              @input="syncHeight('imperial')"
              class="input-field" 
              required 
            />
          </div>
          <div class="form-group flex-1">
            <label for="height-in-input" class="sub-label">Inches</label>
            <input 
              id="height-in-input"
              type="number" 
              v-model.number="heightIn" 
              min="0" 
              max="11" 
              @input="syncHeight('imperial')"
              class="input-field" 
              required 
            />
          </div>
        </div>
      </div>

      <!-- Activity Level Selection -->
      <div class="form-group">
        <label class="input-label">Daily Activity Level</label>
        <div class="options-grid">
          <div 
            v-for="opt in activityOptions" 
            :key="opt.value"
            class="option-card"
            :class="{ selected: activityLevel === opt.value }"
            @click="activityLevel = opt.value"
          >
            <div class="option-icon">{{ opt.icon }}</div>
            <div class="option-info">
              <span class="option-title">{{ opt.label }}</span>
              <span class="option-desc">{{ opt.desc }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Goal Selection -->
      <div class="form-group">
        <label class="input-label">What is your fitness goal?</label>
        <div class="options-grid cols-3">
          <div 
            v-for="opt in goalOptions" 
            :key="opt.value"
            class="option-card compact"
            :class="{ selected: goal === opt.value }"
            @click="goal = opt.value"
          >
            <div class="option-icon">{{ opt.icon }}</div>
            <span class="option-title">{{ opt.label }}</span>
            <span class="option-desc center-text">{{ opt.desc }}</span>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-btn">
        <span>🚀 Calculate BMI & Diet Plan</span>
      </button>
    </form>
  </div>
</template>

<style scoped>
.calculator-card {
  padding: 2.5rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  max-width: 700px;
  margin: 0 auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #fff;
  text-align: center;
  letter-spacing: -0.5px;
}

.section-subtitle {
  font-size: 0.95rem;
  color: #a0aec0;
  margin-bottom: 2rem;
  text-align: center;
}

.toggle-container {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  padding: 4px;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.toggle-btn {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  color: #a0aec0;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle-btn.active {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.calculator-form {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.form-row {
  display: flex;
  gap: 1.2rem;
}

.flex-1 {
  flex: 1;
}

.input-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #e2e8f0;
}

.sub-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: #a0aec0;
}

.gender-cards {
  display: flex;
  gap: 1.2rem;
}

.gender-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gender-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.2);
}

.gender-card.selected {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.15);
}

.hidden-radio {
  display: none;
}

.gender-icon {
  font-size: 2.2rem;
  margin-bottom: 0.4rem;
}

.gender-text {
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
}

.input-field {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
  background: rgba(0, 0, 0, 0.35);
}

.slider-container {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.slider-header {
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: #10b981;
  margin-bottom: 8px;
}

.range-slider {
  width: 100%;
  accent-color: #10b981;
  cursor: pointer;
}

.height-imperial-row {
  display: flex;
  gap: 1.2rem;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
}

.options-grid.cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 600px) {
  .options-grid.cols-3 {
    grid-template-columns: 1fr;
  }
}

.option-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-card.compact {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 1rem;
}

.option-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.option-card.selected {
  background: rgba(16, 185, 129, 0.08);
  border-color: #10b981;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.1);
}

.option-icon {
  font-size: 1.6rem;
}

.option-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.option-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
}

.option-desc {
  font-size: 0.8rem;
  color: #a0aec0;
}

.option-desc.center-text {
  text-align: center;
}

.submit-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #fff;
  border: none;
  padding: 16px;
  font-size: 1.05rem;
  font-weight: 700;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(16, 185, 129, 0.35);
  filter: brightness(1.1);
}

.submit-btn:active {
  transform: translateY(1px);
}
</style>
