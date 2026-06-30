<script setup>
import { ref, watch } from 'vue';
import { estimateMacros } from '../utils/macroEstimator';

const props = defineProps({
  result: Object,
  macroTargets: Object,
  mealPlan: Array,
  foodDatabase: Array,
  planStyle: String
});

const emit = defineEmits([
  'add-meal',
  'remove-meal',
  'swap-meal'
]);

// Form states for adding a new meal
const mealSelection = ref('');
const customMealName = ref('');
const isAutoCalculate = ref(true);
const inputCalories = ref(250);
const inputProtein = ref(20);
const inputCarbs = ref(30);
const inputFat = ref(10);
const validationErrors = ref({});

// Watch meal selection dropdown
watch(mealSelection, (newVal) => {
  if (newVal && newVal !== 'custom') {
    const food = props.foodDatabase.find(f => f.name === newVal);
    if (food) {
      customMealName.value = food.name;
      inputCalories.value = food.calories;
      inputProtein.value = food.protein;
      inputCarbs.value = food.carbs;
      inputFat.value = food.fat;
    }
  } else if (newVal === 'custom') {
    customMealName.value = '';
    triggerAutofill();
  }
});

// Watch custom meal name to auto-estimate macros if checked
watch(customMealName, (newVal) => {
  if (isAutoCalculate.value && (mealSelection.value === 'custom' || !mealSelection.value)) {
    triggerAutofill();
  }
});

watch(isAutoCalculate, (newVal) => {
  if (newVal) triggerAutofill();
});

const triggerAutofill = () => {
  const estimated = estimateMacros(customMealName.value);
  inputCalories.value = estimated.calories;
  inputProtein.value = estimated.protein;
  inputCarbs.value = estimated.carbs;
  inputFat.value = estimated.fat;
};

const handleAddMeal = () => {
  validationErrors.value = {};
  let isValid = true;

  const finalName = mealSelection.value === 'custom' || !mealSelection.value ? customMealName.value.trim() : mealSelection.value;

  if (!finalName) {
    validationErrors.value.name = 'Please select a food or enter a manual name.';
    isValid = false;
  }
  if (inputCalories.value === undefined || inputCalories.value < 0) {
    validationErrors.value.calories = 'Calories must be 0 or more.';
    isValid = false;
  }
  if (inputProtein.value === undefined || inputProtein.value < 0) {
    validationErrors.value.protein = 'Protein must be 0 or more.';
    isValid = false;
  }
  if (inputCarbs.value === undefined || inputCarbs.value < 0) {
    validationErrors.value.carbs = 'Carbs must be 0 or more.';
    isValid = false;
  }
  if (inputFat.value === undefined || inputFat.value < 0) {
    validationErrors.value.fat = 'Fat must be 0 or more.';
    isValid = false;
  }

  if (!isValid) return;

  emit('add-meal', {
    name: finalName,
    calories: Number(inputCalories.value),
    protein: Number(inputProtein.value),
    carbs: Number(inputCarbs.value),
    fat: Number(inputFat.value)
  });

  // Reset form
  mealSelection.value = '';
  customMealName.value = '';
  isAutoCalculate.value = true;
};

// Inline helper updates inside the existing meal list
const syncMealFoodSelection = (index, event) => {
  const val = event.target.value;
  if (val && val !== 'custom') {
    const food = props.foodDatabase.find(f => f.name === val);
    if (food) {
      props.mealPlan[index].name = food.name;
      props.mealPlan[index].calories = food.calories;
      props.mealPlan[index].protein = food.protein;
      props.mealPlan[index].carbs = food.carbs;
      props.mealPlan[index].fat = food.fat;
      props.mealPlan[index].isManual = false;
    }
  } else if (val === 'custom') {
    props.mealPlan[index].isManual = true;
    props.mealPlan[index].isAutoCalculate = true;
    updateMealInlineAutofill(index);
  }
};

const updateMealInlineAutofill = (index) => {
  if (props.mealPlan[index].isAutoCalculate) {
    const estimated = estimateMacros(props.mealPlan[index].name);
    props.mealPlan[index].calories = estimated.calories;
    props.mealPlan[index].protein = estimated.protein;
    props.mealPlan[index].carbs = estimated.carbs;
    props.mealPlan[index].fat = estimated.fat;
  }
};
</script>

<template>
  <div v-if="result" class="diet-card">
    <h3>Custom Diet Plan</h3>
    <p class="diet-note">{{ macroTargets.note }}</p>

    <!-- Macro Targets Grid -->
    <div class="macro-grid">
      <div><strong>Calories</strong><span>{{ macroTargets.calories }} kcal</span></div>
      <div><strong>Protein</strong><span>{{ macroTargets.protein }}g</span></div>
      <div><strong>Carbs</strong><span>{{ macroTargets.carbs }}g</span></div>
      <div><strong>Fat</strong><span>{{ macroTargets.fat }}g</span></div>
    </div>

    <!-- Redesigned Add Meal Box -->
    <div class="add-meal-box">
      <h4>Track what you ate</h4>
      <div class="input-wrapper">
        <label class="field-label">Choose Food</label>
        <select v-model="mealSelection">
          <option value="">Select a food item</option>
          <option v-for="food in foodDatabase" :key="food.name" :value="food.name">
            {{ food.name }}
          </option>
          <option value="custom">Enter custom food manually</option>
        </select>
      </div>

      <!-- Show manual entry panel when selected -->
      <div v-if="mealSelection === 'custom'" class="manual-panel">
        <div class="input-wrapper">
          <label class="field-label">Custom Food Name</label>
          <input 
            v-model="customMealName" 
            placeholder="e.g. Chapati Roll"
            :class="{ 'input-error': validationErrors.name }"
          />
          <span v-if="validationErrors.name" class="error-text">{{ validationErrors.name }}</span>
        </div>

        <div class="toggle-row">
          <label class="checkbox-label">
            <input type="checkbox" v-model="isAutoCalculate" />
            Auto-calculate macros based on name
          </label>
        </div>
      </div>

      <div class="macros-input-row">
        <div class="input-wrapper">
          <label class="field-label">Calories</label>
          <input 
            v-model.number="inputCalories" 
            type="number" 
            min="0"
            :disabled="isAutoCalculate && mealSelection === 'custom'"
            :class="{ 'input-error': validationErrors.calories }"
          />
          <span v-if="validationErrors.calories" class="error-text">{{ validationErrors.calories }}</span>
        </div>
        <div class="input-wrapper">
          <label class="field-label">Protein (g)</label>
          <input 
            v-model.number="inputProtein" 
            type="number" 
            min="0"
            :disabled="isAutoCalculate && mealSelection === 'custom'"
            :class="{ 'input-error': validationErrors.protein }"
          />
          <span v-if="validationErrors.protein" class="error-text">{{ validationErrors.protein }}</span>
        </div>
        <div class="input-wrapper">
          <label class="field-label">Carbs (g)</label>
          <input 
            v-model.number="inputCarbs" 
            type="number" 
            min="0"
            :disabled="isAutoCalculate && mealSelection === 'custom'"
            :class="{ 'input-error': validationErrors.carbs }"
          />
          <span v-if="validationErrors.carbs" class="error-text">{{ validationErrors.carbs }}</span>
        </div>
        <div class="input-wrapper">
          <label class="field-label">Fat (g)</label>
          <input 
            v-model.number="inputFat" 
            type="number" 
            min="0"
            :disabled="isAutoCalculate && mealSelection === 'custom'"
            :class="{ 'input-error': validationErrors.fat }"
          />
          <span v-if="validationErrors.fat" class="error-text">{{ validationErrors.fat }}</span>
        </div>
      </div>

      <button type="button" class="add-btn" @click="handleAddMeal">Add to Meal Plan</button>
    </div>

    <!-- Active Meals Editor -->
    <div class="meal-list">
      <h4>Active Daily Meals</h4>
      <div v-for="(meal, index) in mealPlan" :key="index" class="meal-item">
        <div class="meal-header-row">
          <strong>{{ meal.label || `Meal ${index + 1}` }}</strong>
          <span>
            {{ meal.name || 'No food selected' }} |
            {{ meal.calories }} kcal | P: {{ meal.protein }}g | C: {{ meal.carbs }}g | F: {{ meal.fat }}g
          </span>
        </div>

        <div class="meal-editor-form">
          <div class="input-wrapper">
            <label class="field-label">Update Food Choice</label>
            <select :value="meal.isManual ? 'custom' : meal.name" @change="syncMealFoodSelection(index, $event)">
              <option value="">Choose a database food</option>
              <option v-for="food in foodDatabase" :key="food.name" :value="food.name">
                {{ food.name }}
              </option>
              <option value="custom">Enter custom food manually</option>
            </select>
          </div>

          <!-- Manual Overrides -->
          <div v-if="meal.isManual" class="manual-inline-box">
            <div class="input-wrapper">
              <label class="field-label">Food Name</label>
              <input v-model="meal.name" @input="updateMealInlineAutofill(index)" />
            </div>
            
            <label class="checkbox-label small-label">
              <input type="checkbox" v-model="meal.isAutoCalculate" @change="updateMealInlineAutofill(index)" />
              Auto-calculate macros based on name
            </label>

            <div class="meal-macro-row mt-2">
              <div class="input-wrapper">
                <label class="field-label">Calories</label>
                <input v-model.number="meal.calories" type="number" :disabled="meal.isAutoCalculate" />
              </div>
              <div class="input-wrapper">
                <label class="field-label">Protein</label>
                <input v-model.number="meal.protein" type="number" :disabled="meal.isAutoCalculate" />
              </div>
              <div class="input-wrapper">
                <label class="field-label">Carbs</label>
                <input v-model.number="meal.carbs" type="number" :disabled="meal.isAutoCalculate" />
              </div>
              <div class="input-wrapper">
                <label class="field-label">Fat</label>
                <input v-model.number="meal.fat" type="number" :disabled="meal.isAutoCalculate" />
              </div>
            </div>
          </div>
        </div>

        <div class="meal-actions">
          <button type="button" class="swap-btn" @click="emit('swap-meal', index)">Swap Suggestion</button>
          <button type="button" class="remove-btn" @click="emit('remove-meal', index)">Remove</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="empty-state">
    <p>Please complete your BMI calculation first on the Calculator page to load your personalized targets.</p>
  </div>
</template>

<style scoped>
.empty-state {
  text-align: center;
  padding: 40px;
  background: var(--card);
  border-radius: 20px;
  border: 1px solid var(--border);
  color: var(--muted);
}

.add-meal-box, .meal-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 20px;
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

.macros-input-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.checkbox-label input {
  width: auto;
  margin: 0;
  cursor: pointer;
}

.manual-panel, .manual-inline-box {
  background: rgba(255, 255, 255, 0.03);
  padding: 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.meal-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--border);
  padding-bottom: 8px;
  margin-bottom: 8px;
  font-size: 1rem;
}

.meal-editor-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 10px;
}

.mt-2 {
  margin-top: 8px;
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
  .meal-header-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>
