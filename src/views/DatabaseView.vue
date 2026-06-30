<script setup>
import { ref, watch } from 'vue';
import { estimateMacros } from '../utils/macroEstimator';

const props = defineProps({
  foodDatabase: Array
});

const emit = defineEmits(['add-custom-food']);

// Form states
const foodName = ref('');
const isAutoEstimate = ref(true);
const calories = ref(250);
const protein = ref(20);
const carbs = ref(30);
const fat = ref(10);
const errors = ref({});

// Watchers for auto estimation
watch(foodName, (newVal) => {
  if (isAutoEstimate.value) {
    triggerAutofill();
  }
});

watch(isAutoEstimate, (newVal) => {
  if (newVal) {
    triggerAutofill();
  }
});

const triggerAutofill = () => {
  const estimated = estimateMacros(foodName.value);
  calories.value = estimated.calories;
  protein.value = estimated.protein;
  carbs.value = estimated.carbs;
  fat.value = estimated.fat;
};

const handleSaveFood = () => {
  errors.value = {};
  let isValid = true;

  if (!foodName.value.trim()) {
    errors.value.name = 'Food name is required.';
    isValid = false;
  }
  if (calories.value === undefined || calories.value < 0) {
    errors.value.calories = 'Calories must be 0 or more.';
    isValid = false;
  }
  if (protein.value === undefined || protein.value < 0) {
    errors.value.protein = 'Protein must be 0 or more.';
    isValid = false;
  }
  if (carbs.value === undefined || carbs.value < 0) {
    errors.value.carbs = 'Carbs must be 0 or more.';
    isValid = false;
  }
  if (fat.value === undefined || fat.value < 0) {
    errors.value.fat = 'Fat must be 0 or more.';
    isValid = false;
  }

  // Duplicate Check
  const exists = props.foodDatabase.some(
    (food) => food.name.toLowerCase() === foodName.value.trim().toLowerCase()
  );
  if (exists) {
    errors.value.name = 'This food already exists in your database.';
    isValid = false;
  }

  if (!isValid) return;

  emit('add-custom-food', {
    name: foodName.value.trim(),
    calories: Number(calories.value),
    protein: Number(protein.value),
    carbs: Number(carbs.value),
    fat: Number(fat.value)
  });

  // Reset form
  foodName.value = '';
  isAutoEstimate.value = true;
};
</script>

<template>
  <div class="database-card">
    <h3>Food Database Manager</h3>
    <p class="desc">Create or manage local food options available in your diet selectors.</p>

    <!-- Custom Food Form -->
    <div class="custom-food-box">
      <h4>Add Food to Database</h4>
      
      <div class="input-wrapper">
        <label class="field-label">Food Item Name</label>
        <input 
          v-model="foodName" 
          placeholder="e.g. Paratha, Chicken Tikka" 
          :class="{ 'input-error': errors.name }"
        />
        <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
      </div>

      <div class="toggle-row">
        <label class="checkbox-label">
          <input type="checkbox" v-model="isAutoEstimate" />
          Auto-calculate macros based on name lookup
        </label>
      </div>

      <div class="macros-input-row">
        <div class="input-wrapper">
          <label class="field-label">Calories</label>
          <input 
            v-model.number="calories" 
            type="number" 
            min="0"
            :disabled="isAutoEstimate"
            :class="{ 'input-error': errors.calories }"
          />
          <span v-if="errors.calories" class="error-text">{{ errors.calories }}</span>
        </div>
        <div class="input-wrapper">
          <label class="field-label">Protein (g)</label>
          <input 
            v-model.number="protein" 
            type="number" 
            min="0"
            :disabled="isAutoEstimate"
            :class="{ 'input-error': errors.protein }"
          />
          <span v-if="errors.protein" class="error-text">{{ errors.protein }}</span>
        </div>
        <div class="input-wrapper">
          <label class="field-label">Carbs (g)</label>
          <input 
            v-model.number="carbs" 
            type="number" 
            min="0"
            :disabled="isAutoEstimate"
            :class="{ 'input-error': errors.carbs }"
          />
          <span v-if="errors.carbs" class="error-text">{{ errors.carbs }}</span>
        </div>
        <div class="input-wrapper">
          <label class="field-label">Fat (g)</label>
          <input 
            v-model.number="fat" 
            type="number" 
            min="0"
            :disabled="isAutoEstimate"
            :class="{ 'input-error': errors.fat }"
          />
          <span v-if="errors.fat" class="error-text">{{ errors.fat }}</span>
        </div>
      </div>

      <button type="button" class="add-btn" @click="handleSaveFood">Save Food to Database</button>
    </div>

    <!-- Database List View -->
    <div class="database-list">
      <h4>Registered Foods ({{ foodDatabase.length }})</h4>
      <div class="grid-table">
        <div class="grid-header">
          <span>Name</span>
          <span>Calories</span>
          <span>Protein</span>
          <span>Carbs</span>
          <span>Fat</span>
        </div>
        <div class="grid-rows-container">
          <div v-for="food in foodDatabase" :key="food.name" class="grid-row">
            <span class="food-title">{{ food.name }}</span>
            <span>{{ food.calories }} kcal</span>
            <span>{{ food.protein }}g</span>
            <span>{{ food.carbs }}g</span>
            <span>{{ food.fat }}g</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.database-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.desc {
  font-size: 0.9rem;
  color: var(--muted);
  margin: 0;
}

.custom-food-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--muted);
  letter-spacing: 0.06em;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
}

.checkbox-label input {
  width: auto;
  margin: 0;
}

.macros-input-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.database-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.grid-table {
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
}

.grid-header, .grid-row {
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  font-size: 0.85rem;
}

.grid-header {
  background: rgba(255, 255, 255, 0.03);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
}

.grid-rows-container {
  max-height: 300px;
  overflow-y: auto;
}

.grid-row:last-child {
  border-bottom: none;
}

.food-title {
  font-weight: 600;
}

.error-text {
  font-size: 0.75rem;
  color: #ef4444;
  font-weight: 500;
}

.input-error {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1) !important;
}

@media (max-width: 600px) {
  .macros-input-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .grid-header, .grid-row {
    grid-template-columns: 1.5fr repeat(4, 1fr);
    font-size: 0.75rem;
    padding: 10px;
  }
}
</style>
