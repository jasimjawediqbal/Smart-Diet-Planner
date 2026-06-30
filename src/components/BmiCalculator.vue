<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  units: String,
  age: Number,
  gender: String,
  weightKg: Number,
  weightLbs: Number,
  heightCm: Number,
  feet: Number,
  inches: Number,
  activity: String,
  goal: String,
  planStyle: String,
  mealsPerDay: Number
});

const emit = defineEmits([
  'update:units', 'update:age', 'update:gender', 'update:weightKg',
  'update:weightLbs', 'update:heightCm', 'update:feet', 'update:inches',
  'update:activity', 'update:goal', 'update:planStyle', 'update:mealsPerDay',
  'calculate', 'reset'
]);

// Validation errors object
const errors = ref({});

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!props.age || props.age < 10 || props.age > 100) {
    errors.value.age = 'Age must be between 10 and 100 years.';
    isValid = false;
  }

  if (props.units === 'metric') {
    if (!props.weightKg || props.weightKg < 30 || props.weightKg > 300) {
      errors.value.weight = 'Weight must be between 30 kg and 300 kg.';
      isValid = false;
    }
    if (!props.heightCm || props.heightCm < 100 || props.heightCm > 250) {
      errors.value.height = 'Height must be between 100 cm and 250 cm.';
      isValid = false;
    }
  } else {
    if (!props.weightLbs || props.weightLbs < 66 || props.weightLbs > 660) {
      errors.value.weight = 'Weight must be between 66 lbs and 660 lbs.';
      isValid = false;
    }
    if (!props.feet || props.feet < 3 || props.feet > 8) {
      errors.value.feet = 'Feet must be between 3 and 8.';
      isValid = false;
    }
    if (props.inches === undefined || props.inches < 0 || props.inches > 11) {
      errors.value.inches = 'Inches must be between 0 and 11.';
      isValid = false;
    }
  }

  return isValid;
};

const handleCalculate = () => {
  if (validateForm()) {
    emit('calculate');
  }
};
</script>

<template>
  <form class="form" @submit.prevent="handleCalculate">
    <!-- Age -->
    <label>
      Age
      <input 
        :value="age" 
        @input="emit('update:age', Number($event.target.value))" 
        type="number" 
        min="10" 
        max="100"
        :class="{ 'input-error': errors.age }"
      />
      <span v-if="errors.age" class="error-text">{{ errors.age }}</span>
    </label>

    <!-- Gender -->
    <label>
      Gender
      <select :value="gender" @change="emit('update:gender', $event.target.value)">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </label>

    <!-- Weight -->
    <label v-if="units === 'metric'">
      Weight (kg)
      <input 
        :value="weightKg" 
        @input="emit('update:weightKg', Number($event.target.value))" 
        type="number" 
        min="30" 
        max="300"
        :class="{ 'input-error': errors.weight }"
      />
      <span v-if="errors.weight" class="error-text">{{ errors.weight }}</span>
    </label>
    <label v-else>
      Weight (lbs)
      <input 
        :value="weightLbs" 
        @input="emit('update:weightLbs', Number($event.target.value))" 
        type="number" 
        min="66" 
        max="660"
        :class="{ 'input-error': errors.weight }"
      />
      <span v-if="errors.weight" class="error-text">{{ errors.weight }}</span>
    </label>

    <!-- Height -->
    <label v-if="units === 'metric'">
      Height (cm)
      <input 
        :value="heightCm" 
        @input="emit('update:heightCm', Number($event.target.value))" 
        type="number" 
        min="100" 
        max="250"
        :class="{ 'input-error': errors.height }"
      />
      <span v-if="errors.height" class="error-text">{{ errors.height }}</span>
    </label>
    <div v-else class="height-row">
      <label>
        Feet
        <input 
          :value="feet" 
          @input="emit('update:feet', Number($event.target.value))" 
          type="number" 
          min="3" 
          max="8"
          :class="{ 'input-error': errors.feet }"
        />
        <span v-if="errors.feet" class="error-text">{{ errors.feet }}</span>
      </label>
      <label>
        Inches
        <input 
          :value="inches" 
          @input="emit('update:inches', Number($event.target.value))" 
          type="number" 
          min="0" 
          max="11"
          :class="{ 'input-error': errors.inches }"
        />
        <span v-if="errors.inches" class="error-text">{{ errors.inches }}</span>
      </label>
    </div>

    <!-- Activity -->
    <label>
      Activity
      <select :value="activity" @change="emit('update:activity', $event.target.value)">
        <option value="sedentary">Sedentary</option>
        <option value="light">Light</option>
        <option value="moderate">Moderate</option>
        <option value="active">Active</option>
      </select>
    </label>

    <!-- Goal -->
    <label>
      Goal
      <select :value="goal" @change="emit('update:goal', $event.target.value)">
        <option value="maintain">Maintain</option>
        <option value="lose">Lose</option>
        <option value="gain">Gain</option>
      </select>
    </label>

    <!-- Plan Style -->
    <label>
      Plan Style
      <select :value="planStyle" @change="emit('update:planStyle', $event.target.value)">
        <option value="balanced">Balanced</option>
        <option value="highProtein">High Protein</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="lowCarb">Low Carb</option>
      </select>
    </label>

    <!-- Meals per Day -->
    <label>
      Meals per Day
      <select :value="mealsPerDay" @change="emit('update:mealsPerDay', Number($event.target.value))">
        <option :value="3">3 meals</option>
        <option :value="4">4 meals</option>
        <option :value="5">5 meals</option>
      </select>
    </label>

    <!-- Form Actions -->
    <div class="actions">
      <button type="submit">Calculate</button>
      <button type="button" class="secondary" @click="emit('reset')">Reset</button>
    </div>
  </form>
</template>

<style scoped>
.error-text {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 4px;
  font-weight: 500;
}

.input-error {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1) !important;
}
</style>
