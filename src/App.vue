<script setup>
import { computed, ref, watch, onMounted } from 'vue';

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

// Enriched Pakistani / South Asian Food database reference
const foodDatabase = ref([
  { name: 'Roti (Whole Wheat Chapati)', calories: 120, protein: 3.5, carbs: 24, fat: 0.5 },
  { name: 'Basmati Rice (Boiled, 1 cup)', calories: 205, protein: 4.2, carbs: 44.5, fat: 0.4 },
  { name: 'Chicken Biryani (1 plate)', calories: 450, protein: 22, carbs: 58, fat: 12 },
  { name: 'Dal (Lentil Curry, 1 cup)', calories: 180, protein: 9.5, carbs: 28, fat: 4 },
  { name: 'Chicken Karahi (150g)', calories: 310, protein: 26, carbs: 5, fat: 20 },
  { name: 'Mixed Sabzi Curry (1 cup)', calories: 150, protein: 3, carbs: 16, fat: 8 },
  { name: 'Chana Chaat (1 cup)', calories: 220, protein: 7.5, carbs: 36, fat: 4.5 },
  { name: 'Egg Halwa (1 serving)', calories: 280, protein: 8, carbs: 32, fat: 14 },
  { name: 'Samosa (Potato, 1 pc)', calories: 250, protein: 3.5, carbs: 32, fat: 12 },
  { name: 'Pakora (Mixed Vegetable, 3 pcs)', calories: 180, protein: 4, carbs: 18, fat: 10 },
  { name: 'Chicken Tikka Breast (1 pc)', calories: 180, protein: 30, carbs: 1, fat: 5 },
  { name: 'Beef Seekh Kebab (1 skewer)', calories: 160, protein: 18, carbs: 2, fat: 9 },
  { name: 'Paratha (Plain, 1 pc)', calories: 290, protein: 5, carbs: 38, fat: 13 },
  { name: 'Yogurt / Raita (1 cup)', calories: 110, protein: 6, carbs: 8, fat: 4 },
  { name: 'Eggs (Boiled, 2 pcs)', calories: 144, protein: 12, carbs: 0.8, fat: 10 },
  { name: 'Banana (1 medium)', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 }
]);

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
    { name: 'Boiled Rice & Lentils (Dal Chawal)', calories: 385, protein: 14, carbs: 72, fat: 4.5 },
    { name: 'Roti with Mixed Sabzi Curry', calories: 270, protein: 6.5, carbs: 40, fat: 8.5 },
    { name: 'Chicken Tikka Breast with Raita', calories: 290, protein: 36, carbs: 9, fat: 9 }
  ],
  highProtein: [
    { name: 'Chicken Karahi with 1 Roti', calories: 430, protein: 29.5, carbs: 29, fat: 20.5 },
    { name: 'Beef Seekh Kebab (2 skewers) with Raita', calories: 430, protein: 42, carbs: 12, fat: 22 },
    { name: '2 Eggs, Whole Wheat Paratha', calories: 434, protein: 17, carbs: 38.8, fat: 23 }
  ],
  vegetarian: [
    { name: 'Chana Chaat & Raita Cup', calories: 330, protein: 13.5, carbs: 44, fat: 8.5 },
    { name: 'Dal Curry with 1 Chapati/Roti', calories: 300, protein: 13, carbs: 52, fat: 4.5 },
    { name: 'Mixed Vegetable Curry with Basmati Rice', calories: 355, protein: 7.2, carbs: 60.5, fat: 8.4 }
  ],
  lowCarb: [
    { name: 'Chicken Tikka Breast (2 pcs)', calories: 360, protein: 60, carbs: 2, fat: 10 },
    { name: 'Beef Seekh Kebab & Salad', calories: 210, protein: 20, carbs: 5, fat: 11 },
    { name: 'Yogurt Raita with Cucumber slices', calories: 140, protein: 7, carbs: 10, fat: 5 }
  ],
};

const mealLabels = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Evening Meal'];

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
  const baseMeals = mealLabels.map((label) => ({ label, name: '', isManual: false, isAutoCalculate: true }));

  const distribution = mealCount === 3
    ? [0.28, 0.35, 0.37]
    : mealCount === 4
      ? [0.23, 0.27, 0.3, 0.2]
      : [0.2, 0.24, 0.24, 0.16, 0.16];

  return baseMeals.slice(0, mealCount).map((meal, index) => {
    const calories = Math.round(targetCalories * distribution[index]);
    return {
      ...meal,
      calories,
      protein: Math.round((calories * profile.protein) / 4),
      carbs: Math.round((calories * profile.carbs) / 4),
      fat: Math.round((calories * profile.fat) / 9),
    };
  });
};

const normalizeMealPlan = (meals) => meals.map((meal, index) => {
  const savedNameWasLabel = mealLabels.includes(meal.name);

  return {
    ...meal,
    label: meal.label || (savedNameWasLabel ? meal.name : mealLabels[index] || `Meal ${index + 1}`),
    name: savedNameWasLabel ? '' : meal.name || '',
    isManual: Boolean(meal.isManual),
    isAutoCalculate: meal.isAutoCalculate ?? true,
  };
});

const syncMealPlan = (targetCalories = null) => {
  const target = targetCalories ?? (result.value?.goalCalories ? Number(result.value.goalCalories) : 2000);
  const desiredCount = Number(mealsPerDay.value);

  if (mealPlan.value.length === 0) {
    mealPlan.value = buildDefaultMealPlan(target);
    return;
  }

  mealPlan.value = normalizeMealPlan(mealPlan.value);

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

const addMeal = (newMeal) => {
  mealPlan.value.push({
    label: newMeal.label || 'Custom Meal',
    ...newMeal,
    isManual: false,
    isAutoCalculate: true
  });
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
    isManual: false,
    isAutoCalculate: true
  };
};

const addCustomFood = (newFood) => {
  foodDatabase.value.push(newFood);
};

// Local storage state saving and loading
const loadSavedState = () => {
  try {
    const saved = localStorage.getItem('smart_diet_planner_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.theme) theme.value = parsed.theme;
      if (parsed.units) units.value = parsed.units;
      if (parsed.age) age.value = parsed.age;
      if (parsed.gender) gender.value = parsed.gender;
      if (parsed.weightKg) weightKg.value = parsed.weightKg;
      if (parsed.weightLbs) weightLbs.value = parsed.weightLbs;
      if (parsed.heightCm) heightCm.value = parsed.heightCm;
      if (parsed.feet) feet.value = parsed.feet;
      if (parsed.inches) inches.value = parsed.inches;
      if (parsed.activity) activity.value = parsed.activity;
      if (parsed.goal) goal.value = parsed.goal;
      if (parsed.planStyle) planStyle.value = parsed.planStyle;
      if (parsed.mealsPerDay) mealsPerDay.value = parsed.mealsPerDay;
      if (parsed.result) result.value = parsed.result;
      if (parsed.mealPlan) mealPlan.value = normalizeMealPlan(parsed.mealPlan);
      if (parsed.foodDatabase) foodDatabase.value = parsed.foodDatabase;
    }
  } catch (e) {
    console.error('Failed to load state from LocalStorage:', e);
  }
};

const saveState = () => {
  const state = {
    theme: theme.value,
    units: units.value,
    age: age.value,
    gender: gender.value,
    weightKg: weightKg.value,
    weightLbs: weightLbs.value,
    heightCm: heightCm.value,
    feet: feet.value,
    inches: inches.value,
    activity: activity.value,
    goal: goal.value,
    planStyle: planStyle.value,
    mealsPerDay: mealsPerDay.value,
    result: result.value,
    mealPlan: mealPlan.value,
    foodDatabase: foodDatabase.value
  };
  localStorage.setItem('smart_diet_planner_state', JSON.stringify(state));
};

watch(
  [theme, units, age, gender, weightKg, weightLbs, heightCm, feet, inches, activity, goal, planStyle, mealsPerDay, result, mealPlan, foodDatabase],
  () => {
    saveState();
  },
  { deep: true }
);

watch([planStyle, mealsPerDay], () => {
  if (result.value) {
    syncMealPlan(Number(result.value.goalCalories));
  }
});

onMounted(() => {
  loadSavedState();
});
</script>

<template>
  <div class="app-shell" :class="theme">
    <div class="card">
      <div class="header-row">
        <div>
          <h1>TandooriFit</h1>
          <p>Estimate your BMI, BMR, TDEE, and daily calorie target with local Pakistani foods.</p>
        </div>
        <div class="header-actions">
          <button type="button" class="toggle-btn" @click="units = units === 'metric' ? 'imperial' : 'metric'">
            {{ units === 'metric' ? 'Switch to Imperial' : 'Switch to Metric' }}
          </button>
          <button type="button" class="toggle-btn secondary" @click="toggleTheme">
            {{ theme === 'dark' ? 'Light' : 'Dark' }}
          </button>
        </div>
      </div>

      <!-- Navigation tabs -->
      <nav class="nav-bar">
        <router-link to="/" class="nav-link">Calculator</router-link>
        <router-link to="/plan" class="nav-link">Diet Plan</router-link>
        <router-link to="/database" class="nav-link">Food DB</router-link>
        <router-link to="/tips" class="nav-link">Healthy Tips</router-link>
      </nav>

      <!-- Multi-page views injection -->
      <div class="view-container">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component
              :is="Component"
              v-model:units="units"
              v-model:age="age"
              v-model:gender="gender"
              v-model:weightKg="weightKg"
              v-model:weightLbs="weightLbs"
              v-model:heightCm="heightCm"
              v-model:feet="feet"
              v-model:inches="inches"
              v-model:activity="activity"
              v-model:goal="goal"
              v-model:planStyle="planStyle"
              v-model:mealsPerDay="mealsPerDay"
              :result="result"
              :bmiCategory="bmiCategory"
              :idealWeightRange="idealWeightRange"
              :mealPlan="mealPlan"
              :macroTargets="macroTargets"
              :foodDatabase="foodDatabase"
              @calculate="calculateCalories"
              @reset="resetForm"
              @add-meal="addMeal"
              @remove-meal="removeMeal"
              @swap-meal="swapMeal"
              @add-custom-food="addCustomFood"
            />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
:global(body) {
  margin: 0;
  font-family: 'Outfit', 'Inter', sans-serif;
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
  padding: 40px 20px;
  background: radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 40%),
              var(--bg);
  transition: background 0.4s ease, color 0.4s ease;
}

.app-shell.dark {
  --bg: #070a13;
  --card: rgba(17, 24, 39, 0.7);
  --text: #f8fafc;
  --muted: #94a3b8;
  --border: rgba(255, 255, 255, 0.08);
  --border-focus: #10b981;
  --input-bg: #111827;
  --primary: #10b981;
  --secondary: #334155;
  --primary-hover: #059669;
}

.app-shell.light {
  --bg: #f8fafc;
  --card: rgba(255, 255, 255, 0.8);
  --text: #0f172a;
  --muted: #64748b;
  --border: rgba(148, 163, 184, 0.2);
  --border-focus: #059669;
  --input-bg: #ffffff;
  --primary: #059669;
  --secondary: #cbd5e1;
  --primary-hover: #047857;
}

.card {
  width: min(100%, 760px);
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 32px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
}

.header-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 18px;
}

.header-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

h1 {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, var(--primary) 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 6px 0;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
}

p {
  color: var(--muted);
  font-size: 0.95rem;
  margin: 0;
}

.nav-bar {
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin-bottom: 24px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow-x: auto;
}

.nav-link {
  padding: 10px 16px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--muted);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.05);
}

.router-link-active {
  background: var(--primary) !important;
  color: white !important;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.view-container {
  min-height: 350px;
}

:deep(.form) {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

:deep(label) {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text);
}

:deep(.height-row) {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

:deep(input), :deep(select), :deep(textarea) {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  font-size: 0.95rem;
  font-family: inherit;
  background: var(--input-bg);
  color: var(--text);
  outline: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

:deep(input:focus), :deep(select:focus), :deep(textarea:focus) {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
}

:deep(.actions) {
  grid-column: span 2;
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

:deep(button) {
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: inherit;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

:deep(button[type="submit"]) {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  flex: 2;
}

:deep(button[type="submit"]:hover) {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3);
  filter: brightness(1.05);
}

:deep(button.secondary) {
  background: var(--secondary);
  color: var(--text);
  flex: 1;
}

:deep(button.secondary:hover) {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  filter: brightness(1.05);
}

.toggle-btn {
  background: var(--secondary);
  color: var(--text);
  font-size: 0.85rem;
  padding: 8px 14px;
  border-radius: 10px;
}

.toggle-btn:hover {
  transform: translateY(-1px);
}

:deep(.result-card), :deep(.diet-card) {
  margin-top: 10px;
  padding: 24px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%);
  border: 1px solid rgba(16, 185, 129, 0.15);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
}

:deep(.result-header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

:deep(.badge) {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 96, 105, 0.2) 100%);
  color: var(--text);
  padding: 6px 14px;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid rgba(16, 185, 129, 0.2);
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

:deep(.result-grid) {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

:deep(.result-item) {
  padding: 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: transform 0.2s ease;
}

:deep(.result-item:hover) {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.06);
}

:deep(.result-item.full) {
  grid-column: span 4;
  background: linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 18px 24px;
}

:deep(.result-item.full strong) {
  font-size: 1.6rem;
  color: var(--primary);
  text-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
}

:deep(.label) {
  font-size: 0.75rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
}

:deep(.result-item strong) {
  font-size: 1.25rem;
  font-weight: 700;
}

:deep(.diet-card h3), :deep(.database-card h3) {
  font-size: 1.35rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 8px;
}

:deep(.diet-note) {
  font-size: 0.9rem;
  color: var(--muted);
  margin-bottom: 20px;
}

:deep(.macro-grid) {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

:deep(.macro-grid div) {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
}

:deep(.macro-grid div strong) {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--muted);
  letter-spacing: 0.06em;
}

:deep(.macro-grid div span) {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text);
}

:deep(.add-btn) {
  background: var(--primary);
  color: white;
  width: 100%;
}

:deep(.add-btn:hover) {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

:deep(.meal-list) {
  display: grid;
  gap: 14px;
  margin-top: 20px;
}

:deep(.meal-item) {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 16px;
  transition: all 0.25s ease;
}

:deep(.meal-item:hover) {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-color: rgba(16, 185, 129, 0.2);
}

:deep(.meal-macro-row) {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

:deep(.meal-actions) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

:deep(.swap-btn) {
  background: #3b82f6;
  color: white;
}

:deep(.swap-btn:hover) {
  background: #2563eb;
  transform: translateY(-1px);
}

:deep(.remove-btn) {
  background: #ef4444;
  color: white;
}

:deep(.remove-btn:hover) {
  background: #dc2626;
  transform: translateY(-1px);
}

@media (max-width: 600px) {
  .card {
    padding: 20px;
  }

  :deep(.form) {
    grid-template-columns: 1fr;
  }

  :deep(.actions) {
    grid-column: span 2;
    flex-direction: column;
  }

  :deep(.result-grid) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  :deep(.result-item.full) {
    grid-column: span 2;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  :deep(.macro-grid) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
