<script setup>
import { computed, ref, watch } from 'vue';

const theme = ref('dark');
const units = ref('metric');
const age = ref(28);
const gender = ref('male');
const weightKg = ref(70);
const heightCm = ref(175);
const weightLbs = ref(154);
const feet = ref(5);
const inches = ref(9);
const activity = ref('moderate');
const goal = ref('maintain');
const planStyle = ref('balanced');
const mealsPerDay = ref(3);
const result = ref(null);
const mealPlan = ref([]);
const newMealName = ref('');
const newMealCalories = ref(300);
const newMealProtein = ref(20);
const newMealCarbs = ref(35);
const newMealFat = ref(10);
const selectedFood = ref('');
const mealEntryMode = ref('manual');
const customFoodName = ref('');
const customFoodCalories = ref(250);
const customFoodProtein = ref(20);
const customFoodCarbs = ref(30);
const customFoodFat = ref(10);
const foodDatabase = [
  { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Salmon', calories: 208, protein: 22, carbs: 0, fat: 13 },
  { name: 'Eggs', calories: 72, protein: 6, carbs: 0.4, fat: 5 },
  { name: 'Oats', calories: 389, protein: 16, carbs: 66, fat: 7 },
  { name: 'Rice', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { name: 'Greek Yogurt', calories: 100, protein: 10, carbs: 6, fat: 4 },
  { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { name: 'Tofu', calories: 144, protein: 17, carbs: 3, fat: 9 },
  { name: 'Lentils', calories: 116, protein: 9, carbs: 20, fat: 0.4 },
];

const activityFactors = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
};

const planProfiles = {
  balanced: { protein: 0.25, carbs: 0.45, fat: 0.3, note: 'Balanced meals with steady energy' },
  highProtein: { protein: 0.35, carbs: 0.35, fat: 0.3, note: 'Higher protein for muscle support' },
  vegetarian: { protein: 0.25, carbs: 0.5, fat: 0.25, note: 'Plant-forward choices and legumes' },
  lowCarb: { protein: 0.3, carbs: 0.25, fat: 0.45, note: 'Lower carb, higher fat approach' },
};

const swapSuggestions = {
  balanced: [
    { name: 'Greek Yogurt Bowl', calories: 320, protein: 24, carbs: 30, fat: 10, notes: 'Yogurt, berries, granola' },
    { name: 'Chicken Wrap', calories: 410, protein: 32, carbs: 38, fat: 14, notes: 'Chicken, lettuce, wrap' },
    { name: 'Salmon Plate', calories: 480, protein: 35, carbs: 25, fat: 22, notes: 'Salmon, rice, greens' },
  ],
  highProtein: [
    { name: 'Protein Oats', calories: 360, protein: 30, carbs: 35, fat: 12, notes: 'Oats, whey, banana' },
    { name: 'Turkey Salad', calories: 390, protein: 40, carbs: 20, fat: 15, notes: 'Turkey, beans, greens' },
    { name: 'Egg Rice Bowl', calories: 450, protein: 33, carbs: 35, fat: 16, notes: 'Eggs, rice, vegetables' },
  ],
  vegetarian: [
    { name: 'Tofu Stir Fry', calories: 360, protein: 24, carbs: 32, fat: 14, notes: 'Tofu, vegetables, rice' },
    { name: 'Lentil Soup', calories: 330, protein: 20, carbs: 40, fat: 8, notes: 'Lentils, carrots, herbs' },
    { name: 'Chickpea Salad', calories: 400, protein: 18, carbs: 44, fat: 14, notes: 'Chickpeas, cucumber, olive oil' },
  ],
  lowCarb: [
    { name: 'Avocado Eggs', calories: 340, protein: 18, carbs: 8, fat: 28, notes: 'Eggs, avocado, spinach' },
    { name: 'Chicken Salad', calories: 380, protein: 34, carbs: 10, fat: 24, notes: 'Chicken, greens, olive oil' },
    { name: 'Cottage Cheese Plate', calories: 300, protein: 24, carbs: 12, fat: 18, notes: 'Cottage cheese, nuts, cucumber' },
  ],
};

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
};

const currentHeightCm = computed(() => {
  if (units.value === 'metric') {
    return Number(heightCm.value);
  }
  return Number(feet.value) * 30.48 + Number(inches.value) * 2.54;
});

const currentWeightKg = computed(() => {
  if (units.value === 'metric') {
    return Number(weightKg.value);
  }
  return Number(weightLbs.value) * 0.45359237;
});

const buildDefaultMealPlan = (targetCalories) => {
  const mealCount = Number(mealsPerDay.value);
  const profile = planProfiles[planStyle.value];
  const baseMeals = [
    { name: 'Breakfast', notes: 'Start with energy and fibre' },
    { name: 'Lunch', notes: 'Balanced protein and vegetables' },
    { name: 'Dinner', notes: 'Lean protein and greens' },
    { name: 'Snack', notes: 'Small recovery meal' },
    { name: 'Evening Meal', notes: 'Light and satisfying' },
  ];

  const distribution = mealCount === 3
    ? [0.28, 0.35, 0.37]
    : mealCount === 4
      ? [0.23, 0.27, 0.3, 0.2]
      : [0.2, 0.24, 0.24, 0.16, 0.16];

  return baseMeals.slice(0, mealCount).map((meal, index) => {
    const calories = Math.round((targetCalories / mealCount) * distribution[index]);
    return {
      ...meal,
      calories,
      protein: Math.round((calories * profile.protein) / 4),
      carbs: Math.round((calories * profile.carbs) / 4),
      fat: Math.round((calories * profile.fat) / 9),
    };
  });
};

const syncMealPlan = (targetCalories = null) => {
  const target = targetCalories ?? (result.value?.goalCalories ? Number(result.value.goalCalories) : 2000);
  const desiredCount = Number(mealsPerDay.value);

  if (mealPlan.value.length === 0) {
    mealPlan.value = buildDefaultMealPlan(target);
    return;
  }

  if (mealPlan.value.length < desiredCount) {
    const extras = buildDefaultMealPlan(target).slice(mealPlan.value.length, desiredCount);
    mealPlan.value = [...mealPlan.value, ...extras];
  } else if (mealPlan.value.length > desiredCount) {
    mealPlan.value = mealPlan.value.slice(0, desiredCount);
  }
};

const calculateCalories = () => {
  const weightValue = currentWeightKg.value;
  const heightValue = currentHeightCm.value;
  const ageValue = Number(age.value);

  const bmr = gender.value === 'male'
    ? 10 * weightValue + 6.25 * heightValue - 5 * ageValue + 5
    : 10 * weightValue + 6.25 * heightValue - 5 * ageValue - 161;

  const tdee = bmr * (activityFactors[activity.value] || 1.2);
  let goalLabel = 'Maintenance Calories';
  let goalCalories = tdee;

  if (goal.value === 'lose') {
    goalLabel = 'Weight Loss';
    goalCalories = Math.max(1200, tdee - 500);
  } else if (goal.value === 'gain') {
    goalLabel = 'Weight Gain';
    goalCalories = tdee + 400;
  }

  const bmi = weightValue / ((heightValue / 100) ** 2);

  result.value = {
    bmi: bmi.toFixed(1),
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    goalCalories: Math.round(goalCalories),
    goalLabel,
  };

  syncMealPlan(Math.round(goalCalories));
};

const resetForm = () => {
  age.value = 28;
  gender.value = 'male';
  weightKg.value = 70;
  heightCm.value = 175;
  weightLbs.value = 154;
  feet.value = 5;
  inches.value = 9;
  activity.value = 'moderate';
  goal.value = 'maintain';
  planStyle.value = 'balanced';
  mealsPerDay.value = 3;
  result.value = null;
  mealPlan.value = [];
  newMealName.value = '';
  newMealCalories.value = 300;
  newMealProtein.value = 20;
  newMealCarbs.value = 35;
  newMealFat.value = 10;
};

const bmiCategory = computed(() => {
  if (!result.value) return 'Enter your details to see your result.';

  const bmiValue = Number(result.value.bmi);
  if (bmiValue < 18.5) return 'Underweight';
  if (bmiValue < 25) return 'Healthy';
  if (bmiValue < 30) return 'Overweight';
  return 'Obese';
});

const idealWeightRange = computed(() => {
  if (!result.value) return null;

  const heightValue = currentHeightCm.value;
  const minWeight = (18.5 * (heightValue / 100) ** 2).toFixed(1);
  const maxWeight = (24.9 * (heightValue / 100) ** 2).toFixed(1);

  return `${minWeight} - ${maxWeight} ${units.value === 'metric' ? 'kg' : 'lbs'}`;
});

const macroTargets = computed(() => {
  const target = result.value?.goalCalories ? Number(result.value.goalCalories) : 2000;
  const profile = planProfiles[planStyle.value];

  return {
    calories: target,
    protein: Math.round((target * profile.protein) / 4),
    carbs: Math.round((target * profile.carbs) / 4),
    fat: Math.round((target * profile.fat) / 9),
    note: profile.note,
  };
});

const fillFoodMacros = () => {
  const food = foodDatabase.find((item) => item.name === selectedFood.value);
  if (!food) return;

  newMealName.value = food.name;
  newMealCalories.value = food.calories;
  newMealProtein.value = food.protein;
  newMealCarbs.value = food.carbs;
  newMealFat.value = food.fat;
};

const addCustomFood = () => {
  if (!customFoodName.value.trim()) return;

  const exists = foodDatabase.some((food) => food.name.toLowerCase() === customFoodName.value.trim().toLowerCase());
  if (exists) {
    customFoodName.value = '';
    return;
  }

  foodDatabase.push({
    name: customFoodName.value.trim(),
    calories: Number(customFoodCalories.value) || 250,
    protein: Number(customFoodProtein.value) || 20,
    carbs: Number(customFoodCarbs.value) || 30,
    fat: Number(customFoodFat.value) || 10,
  });

  customFoodName.value = '';
  customFoodCalories.value = 250;
  customFoodProtein.value = 20;
  customFoodCarbs.value = 30;
  customFoodFat.value = 10;
};

const addCustomMeal = () => {
  if (!newMealName.value.trim()) return;

  mealPlan.value.push({
    name: newMealName.value.trim(),
    calories: Number(newMealCalories.value) || 250,
    protein: Number(newMealProtein.value) || 20,
    carbs: Number(newMealCarbs.value) || 30,
    fat: Number(newMealFat.value) || 10,
    notes: 'Added by user',
  });

  newMealName.value = '';
  newMealCalories.value = 250;
  newMealProtein.value = 20;
  newMealCarbs.value = 30;
  newMealFat.value = 10;
  selectedFood.value = '';
};

const removeMeal = (index) => {
  mealPlan.value.splice(index, 1);
};

const swapMeal = (index) => {
  const pool = swapSuggestions[planStyle.value] || swapSuggestions.balanced;
  const suggestion = pool[(index + Math.floor(Math.random() * pool.length)) % pool.length];
  mealPlan.value[index] = {
    ...mealPlan.value[index],
    ...suggestion,
  };
};

watch([planStyle, mealsPerDay], () => {
  if (result.value) {
    syncMealPlan(Number(result.value.goalCalories));
  }
});
</script>

<template>
  <div class="app-shell" :class="theme">
    <div class="card">
      <div class="header-row">
        <div>
          <h1>Calorie Calculator</h1>
          <p>Estimate your BMI, BMR, TDEE, and daily calorie target.</p>
        </div>
        <div class="header-actions">
          <button type="button" class="toggle-btn" @click="units = units === 'metric' ? 'imperial' : 'metric'">
            {{ units === 'metric' ? 'Switch to Imperial' : 'Switch to Metric' }}
          </button>
          <button type="button" class="toggle-btn secondary" @click="toggleTheme">
            {{ theme === 'dark' ? '☀️ Light' : '🌙 Dark' }}
          </button>
        </div>
      </div>

      <form class="form" @submit.prevent="calculateCalories">
        <label>
          Age
          <input v-model.number="age" type="number" min="10" max="100" />
        </label>

        <label>
          Gender
          <select v-model="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label v-if="units === 'metric'">
          Weight (kg)
          <input v-model.number="weightKg" type="number" min="30" max="300" />
        </label>
        <label v-else>
          Weight (lbs)
          <input v-model.number="weightLbs" type="number" min="66" max="660" />
        </label>

        <label v-if="units === 'metric'">
          Height (cm)
          <input v-model.number="heightCm" type="number" min="100" max="250" />
        </label>
        <div v-else class="height-row">
          <label>
            Feet
            <input v-model.number="feet" type="number" min="3" max="8" />
          </label>
          <label>
            Inches
            <input v-model.number="inches" type="number" min="0" max="11" />
          </label>
        </div>

        <label>
          Activity
          <select v-model="activity">
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
          </select>
        </label>

        <label>
          Goal
          <select v-model="goal">
            <option value="maintain">Maintain</option>
            <option value="lose">Lose</option>
            <option value="gain">Gain</option>
          </select>
        </label>

        <label>
          Plan Style
          <select v-model="planStyle">
            <option value="balanced">Balanced</option>
            <option value="highProtein">High Protein</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="lowCarb">Low Carb</option>
          </select>
        </label>

        <label>
          Meals per Day
          <select v-model="mealsPerDay">
            <option :value="3">3 meals</option>
            <option :value="4">4 meals</option>
            <option :value="5">5 meals</option>
          </select>
        </label>

        <div class="actions">
          <button type="submit">Calculate</button>
          <button type="button" class="secondary" @click="resetForm">Reset</button>
        </div>
      </form>

      <div v-if="result" class="result-card">
        <div class="result-header">
          <h2>Your result</h2>
          <span class="badge">{{ bmiCategory }}</span>
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

      <div v-if="result" class="diet-card">
        <h3>Custom Diet Plan</h3>
        <p class="diet-note">{{ macroTargets.note }}</p>
        <div class="macro-grid">
          <div><strong>Calories</strong><span>{{ macroTargets.calories }} kcal</span></div>
          <div><strong>Protein</strong><span>{{ macroTargets.protein }}g</span></div>
          <div><strong>Carbs</strong><span>{{ macroTargets.carbs }}g</span></div>
          <div><strong>Fat</strong><span>{{ macroTargets.fat }}g</span></div>
        </div>

        <div class="add-meal-box">
          <select v-model="selectedFood" @change="mealEntryMode === 'auto' && fillFoodMacros()">
            <option value="">Choose a food</option>
            <option v-for="food in foodDatabase" :key="food.name" :value="food.name">
              {{ food.name }}
            </option>
          </select>
          <select v-model="mealEntryMode">
            <option value="manual">Enter macros manually</option>
            <option value="auto">Auto-fill macros</option>
          </select>
          <input v-model="newMealName" placeholder="Meal name" />
          <input v-model.number="newMealCalories" type="number" min="0" placeholder="Calories" />
          <input v-model.number="newMealProtein" type="number" min="0" placeholder="Protein" />
          <input v-model.number="newMealCarbs" type="number" min="0" placeholder="Carbs" />
          <input v-model.number="newMealFat" type="number" min="0" placeholder="Fat" />
          <button type="button" class="add-btn" @click="addCustomMeal">Add Meal</button>
        </div>

        <div class="custom-food-box">
          <h4>Add your own food</h4>
          <div class="custom-food-row">
            <input v-model="customFoodName" placeholder="Food name" />
            <input v-model.number="customFoodCalories" type="number" min="0" placeholder="Calories" />
            <input v-model.number="customFoodProtein" type="number" min="0" placeholder="Protein" />
            <input v-model.number="customFoodCarbs" type="number" min="0" placeholder="Carbs" />
            <input v-model.number="customFoodFat" type="number" min="0" placeholder="Fat" />
            <button type="button" class="add-btn" @click="addCustomFood">Save Food</button>
          </div>
        </div>

        <div class="meal-list">
          <div v-for="(meal, index) in mealPlan" :key="index" class="meal-item">
            <div class="meal-editor">
              <input v-model="meal.name" class="meal-input" placeholder="Meal name" />
              <div class="meal-macro-row">
                <input v-model.number="meal.calories" type="number" min="0" />
                <input v-model.number="meal.protein" type="number" min="0" />
                <input v-model.number="meal.carbs" type="number" min="0" />
                <input v-model.number="meal.fat" type="number" min="0" />
              </div>
              <textarea v-model="meal.notes" rows="2" placeholder="What you ate" />
            </div>
            <div class="meal-actions">
              <button type="button" class="swap-btn" @click="swapMeal(index)">Swap</button>
              <button type="button" class="remove-btn" @click="removeMeal(index)">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:global(body) {
  margin: 0;
  font-family: Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
}

:global(*) {
  box-sizing: border-box;
}

.app-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  transition: background 0.25s ease, color 0.25s ease;
}

.app-shell.dark {
  --bg: #0f172a;
  --card: #111827;
  --text: #f8fafc;
  --muted: #94a3b8;
  --border: #334155;
  --input-bg: #1f2937;
  --primary: #10b981;
  --secondary: #64748b;
}

.app-shell.light {
  --bg: #f8fafc;
  --card: #ffffff;
  --text: #111827;
  --muted: #475569;
  --border: #d1d5db;
  --input-bg: #f9fafb;
  --primary: #059669;
  --secondary: #64748b;
}

.card {
  width: min(100%, 620px);
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.header-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: start;
  margin-bottom: 16px;
}

.header-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

h1, h2 {
  margin-top: 0;
  margin-bottom: 6px;
}

p {
  color: var(--muted);
  margin-top: 0;
}

.form {
  display: grid;
  gap: 12px;
}

label {
  display: grid;
  gap: 6px;
  font-weight: 600;
}

.height-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

input, select, button {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  font-size: 1rem;
}

input, select {
  background: var(--input-bg);
  color: var(--text);
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

button {
  cursor: pointer;
  background: var(--primary);
  color: white;
  border: none;
}

button.secondary, .toggle-btn {
  background: var(--secondary);
}

.result-card, .diet-card {
  margin-top: 20px;
  padding: 18px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.14), rgba(6, 182, 212, 0.08));
  border: 1px solid rgba(16, 185, 129, 0.28);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.badge {
  background: rgba(16, 185, 129, 0.18);
  color: var(--text);
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.86rem;
  font-weight: 600;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.result-item {
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.result-item.full {
  grid-column: 1 / -1;
}

.label {
  font-size: 0.8rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.diet-note {
  margin-bottom: 12px;
}

.macro-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.macro-grid div {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 10px;
  display: grid;
  gap: 4px;
}

.add-meal-box {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1.2fr repeat(5, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 12px;
}

.custom-food-box {
  margin-bottom: 14px;
  padding: 12px;
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
}

.custom-food-row {
  display: grid;
  grid-template-columns: 1.4fr repeat(4, minmax(0, 1fr)) auto;
  gap: 8px;
  margin-top: 8px;
}

.add-meal-box input {
  min-width: 0;
}

.add-btn {
  background: var(--primary);
}

.meal-list {
  display: grid;
  gap: 10px;
}

.meal-item {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.meal-editor {
  flex: 1;
  display: grid;
  gap: 8px;
}

.meal-input, .meal-editor textarea {
  width: 100%;
}

.meal-macro-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.meal-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.swap-btn {
  background: #2563eb;
}

.remove-btn {
  background: #ef4444;
}

@media (max-width: 600px) {
  .header-row {
    flex-direction: column;
  }

  .actions {
    flex-direction: column;
  }

  .add-meal-box {
    grid-template-columns: 1fr 1fr;
  }

  .custom-food-row {
    grid-template-columns: 1fr 1fr;
  }

  .meal-item {
    flex-direction: column;
  }

  .meal-macro-row {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
