<script setup>
import { ref, watch, computed } from 'vue';
import { getDietPlan, swapsDatabase } from '../data/dietTemplates';

const props = defineProps({
  targetCalories: {
    type: Number,
    required: true
  },
  goal: {
    type: String,
    required: true
  }
});

// Reactively loaded diet plan
const activePlan = ref(null);

// Initialize or reload plan when target calories change
const initializePlan = () => {
  activePlan.value = getDietPlan(props.targetCalories);
};

// Watch target calories and re-init
watch(() => props.targetCalories, initializePlan, { immediate: true });

// Swap logic
// Keeps track of the index in the swapsDatabase for each item category
const swapIndices = ref({});

const cycleSwap = (mealKey, itemIndex, swapGroup) => {
  if (!swapGroup || !swapsDatabase[swapGroup]) return;
  
  const options = swapsDatabase[swapGroup];
  
  // Initialize index if not set
  if (swapIndices.value[swapGroup] === undefined) {
    // Find index of current item in options, default to 0
    const currentItemName = activePlan.value.meals[mealKey].items[itemIndex].name;
    const foundIndex = options.findIndex(opt => opt.name === currentItemName);
    swapIndices.value[swapGroup] = foundIndex !== -1 ? foundIndex : 0;
  }
  
  // Cycle index
  const nextIndex = (swapIndices.value[swapGroup] + 1) % options.length;
  swapIndices.value[swapGroup] = nextIndex;
  
  // Replace item
  const selectedOption = options[nextIndex];
  activePlan.value.meals[mealKey].items[itemIndex] = {
    name: selectedOption.name,
    quantity: selectedOption.quantity,
    calories: selectedOption.calories,
    swapGroup: swapGroup
  };
};

// Calculate actual total calories dynamically if items are swapped
const dynamicTotalCalories = computed(() => {
  if (!activePlan.value) return 0;
  let total = 0;
  Object.values(activePlan.value.meals).forEach(meal => {
    meal.items.forEach(item => {
      total += item.calories;
    });
  });
  return total;
});

// Generate grocery list from current plan items
const groceryList = computed(() => {
  if (!activePlan.value) return [];
  const list = [];
  Object.values(activePlan.value.meals).forEach(meal => {
    meal.items.forEach(item => {
      // Avoid duplicate entries in grocery listing, just accumulate or list unique components
      const exists = list.find(g => g.name === item.name);
      if (exists) {
        // Just note that it is used in multiple meals
        exists.occurrences += 1;
      } else {
        list.push({
          name: item.name,
          quantity: item.quantity,
          occurrences: 1
        });
      }
    });
  });
  return list;
});

const handlePrint = () => {
  window.print();
};

const mealIcons = {
  breakfast: '🍳',
  midMorningSnack: '🍏',
  lunch: '🍲',
  eveningSnack: '☕',
  dinner: '🍢',
  bedtime: '🥛'
};

const mealLabels = {
  breakfast: 'Breakfast (Nashta)',
  midMorningSnack: 'Mid-Morning Snack',
  lunch: 'Lunch (Dopehar Ka Khana)',
  eveningSnack: 'Evening Snack (Chai time)',
  dinner: 'Dinner (Raat Ka Khana)',
  bedtime: 'Bedtime (Sone Se Pehle)'
};
</script>

<template>
  <div v-if="activePlan" class="diet-plan-container">
    
    <!-- Header Summary Card -->
    <div class="diet-header-card glass-panel print-hide">
      <div class="header-main">
        <div>
          <h2 class="diet-title">🇵🇰 Your Pakistani Diet Plan</h2>
          <p class="diet-subtitle">
            Custom-tailored for a target of <strong class="highlight-text">{{ targetCalories }} kcal</strong> to help you 
            <strong class="highlight-text">{{ goal === 'lose' ? 'Lose Weight' : goal === 'gain' ? 'Gain Weight' : 'Maintain Weight' }}</strong>.
          </p>
        </div>
        <button class="print-action-btn" @click="handlePrint">
          <span>🖨️ Print / Save PDF</span>
        </button>
      </div>

      <!-- Macros and Quick stats -->
      <div class="quick-stats-row">
        <div class="stat-bubble">
          <span class="bubble-label">Target Calories</span>
          <span class="bubble-val">{{ targetCalories }} kcal</span>
        </div>
        <div class="stat-bubble">
          <span class="bubble-label">Calculated Plan Total</span>
          <span class="bubble-val">{{ dynamicTotalCalories }} kcal</span>
        </div>
        <div class="macro-indicators">
          <div class="macro-bar-container">
            <span class="macro-title">Protein ({{ activePlan.macros.protein }}g)</span>
            <div class="progress-track protein-track">
              <div class="progress-bar" style="width: 25%"></div>
            </div>
          </div>
          <div class="macro-bar-container">
            <span class="macro-title">Carbs ({{ activePlan.macros.carbs }}g)</span>
            <div class="progress-track carbs-track">
              <div class="progress-bar" style="width: 45%"></div>
            </div>
          </div>
          <div class="macro-bar-container">
            <span class="macro-title">Fats ({{ activePlan.macros.fat }}g)</span>
            <div class="progress-track fat-track">
              <div class="progress-bar" style="width: 30%"></div>
            </div>
          </div>
        </div>
      </div>
      <p class="interaction-tip">
        💡 <strong>Interactive Plan:</strong> Tap or click any meal item marked with 🔄 to swap it with a healthy Pakistani alternative.
      </p>
    </div>

    <!-- Printable Version (Visually clean for paper, shown only during print/PDF export) -->
    <div class="printable-only-header">
      <h1>🇵🇰 Customized Smart Diet Plan (Pakistani Cuisine)</h1>
      <p>Target Calorie Intake: {{ targetCalories }} kcal | Goal: {{ goal === 'lose' ? 'Lose Weight' : goal === 'gain' ? 'Gain Weight' : 'Maintain Weight' }}</p>
      <p>Estimated Macros: Protein: {{ activePlan.macros.protein }}g | Carbs: {{ activePlan.macros.carbs }}g | Fats: {{ activePlan.macros.fat }}g</p>
      <hr />
    </div>

    <!-- Meals Layout -->
    <div class="meals-grid">
      <div 
        v-for="(meal, key) in activePlan.meals" 
        :key="key" 
        class="meal-card glass-panel"
      >
        <div class="meal-card-header">
          <span class="meal-card-icon">{{ mealIcons[key] }}</span>
          <div class="meal-card-titles">
            <h4 class="meal-label">{{ mealLabels[key] }}</h4>
            <span class="meal-subtitle-name">{{ meal.name }}</span>
          </div>
        </div>

        <div class="meal-items-list">
          <div 
            v-for="(item, index) in meal.items" 
            :key="index"
            class="meal-item"
            :class="{ swappable: item.swapGroup }"
            @click="cycleSwap(key, index, item.swapGroup)"
            title="Click to swap with alternative"
          >
            <div class="item-main">
              <div class="item-identity">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-swap-badge print-hide" v-if="item.swapGroup">🔄 Swap</span>
              </div>
              <span class="item-qty">{{ item.quantity }}</span>
            </div>
            <div class="item-cal-badge">
              {{ item.calories }} kcal
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grocery List & PDF Details Section -->
    <div class="grocery-section-wrapper glass-panel">
      <h3 class="section-title text-left">🛒 Recommended Grocery List</h3>
      <p class="section-subtitle text-left">A quick guide of what you need to stock up on for this diet plan:</p>
      
      <div class="grocery-grid">
        <div 
          v-for="(gItem, index) in groceryList" 
          :key="index"
          class="grocery-card-item"
        >
          <span class="grocery-checkbox">🟩</span>
          <div class="grocery-info">
            <span class="grocery-name">{{ gItem.name }}</span>
            <span class="grocery-qty">Portion target: {{ gItem.quantity }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.diet-plan-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.diet-header-card {
  padding: 2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.header-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .header-main {
    flex-direction: column;
    align-items: flex-start;
  }
}

.diet-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.5px;
}

.diet-subtitle {
  font-size: 0.95rem;
  color: #cbd5e1;
  margin-top: 4px;
}

.highlight-text {
  color: #10b981;
}

.print-action-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 12px 20px;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.print-action-btn:hover {
  background: #fff;
  color: #000;
  border-color: #fff;
}

.quick-stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  padding: 1.5rem;
  align-items: center;
}

.stat-bubble {
  display: flex;
  flex-direction: column;
}

.bubble-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #a0aec0;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.bubble-val {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
}

.macro-indicators {
  flex: 1;
  display: flex;
  gap: 1.5rem;
  min-width: 250px;
}

@media (max-width: 600px) {
  .macro-indicators {
    flex-direction: column;
    gap: 0.8rem;
  }
}

.macro-bar-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.macro-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #e2e8f0;
}

.progress-track {
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 4px;
}

.protein-track .progress-bar {
  background: #38bdf8;
  width: 25% !important; /* Visual representations */
}

.carbs-track .progress-bar {
  background: #f59e0b;
  width: 50% !important;
}

.fat-track .progress-bar {
  background: #ef4444;
  width: 25% !important;
}

.interaction-tip {
  font-size: 0.85rem;
  color: #10b981;
  margin-top: 1rem;
  background: rgba(16, 185, 129, 0.05);
  border: 1px dashed rgba(16, 185, 129, 0.25);
  padding: 10px 14px;
  border-radius: 10px;
}

.meals-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (max-width: 850px) {
  .meals-grid {
    grid-template-columns: 1fr;
  }
}

.meal-card {
  padding: 1.8rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  transition: transform 0.3s ease;
}

.meal-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.15);
}

.meal-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.meal-card-icon {
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.05);
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.meal-card-titles {
  display: flex;
  flex-direction: column;
}

.meal-label {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.meal-subtitle-name {
  font-size: 0.8rem;
  color: #a0aec0;
}

.meal-items-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.meal-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.meal-item.swappable {
  cursor: pointer;
}

.meal-item.swappable:hover {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.3);
}

.item-main {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-identity {
  display: flex;
  align-items: center;
  gap: 6px;
}

.item-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
}

.item-swap-badge {
  font-size: 0.65rem;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  padding: 2px 6px;
  border-radius: 8px;
  font-weight: 700;
  text-transform: uppercase;
}

.item-qty {
  font-size: 0.78rem;
  color: #cbd5e1;
}

.item-cal-badge {
  font-size: 0.8rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 10px;
  border-radius: 8px;
  color: #a0aec0;
  white-space: nowrap;
}

.meal-item.swappable:hover .item-cal-badge {
  background: rgba(16, 185, 129, 0.2);
  color: #fff;
}

.grocery-section-wrapper {
  padding: 2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.text-left {
  text-align: left !important;
}

.grocery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

@media (max-width: 900px) {
  .grocery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grocery-grid {
    grid-template-columns: 1fr;
  }
}

.grocery-card-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 12px;
  border-radius: 12px;
}

.grocery-checkbox {
  font-size: 1.1rem;
  opacity: 0.6;
}

.grocery-info {
  display: flex;
  flex-direction: column;
}

.grocery-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
}

.grocery-qty {
  font-size: 0.72rem;
  color: #cbd5e1;
}

.printable-only-header {
  display: none;
}

/* Print Specific Rules */
@media print {
  .print-hide {
    display: none !important;
  }
  
  .printable-only-header {
    display: block !important;
    color: #000;
    margin-bottom: 2rem;
  }

  .printable-only-header h1 {
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
  }

  .printable-only-header p {
    font-size: 0.95rem;
    margin: 4px 0;
  }

  .meals-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 1.5cm !important;
  }

  .meal-card {
    background: none !important;
    border: 1px solid #ccc !important;
    color: #000 !important;
    box-shadow: none !important;
    page-break-inside: avoid;
  }

  .meal-label, .meal-subtitle-name, .item-name, .item-qty, .item-cal-badge, .grocery-name, .grocery-qty {
    color: #000 !important;
  }

  .meal-item {
    background: none !important;
    border: 1px solid #eee !important;
  }

  .grocery-section-wrapper {
    background: none !important;
    border: 1px solid #ccc !important;
    color: #000 !important;
    page-break-inside: avoid;
    margin-top: 2cm;
  }

  .grocery-card-item {
    background: none !important;
    border: 1px solid #eee !important;
  }
}
</style>
