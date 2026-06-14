<script setup>
import { ref } from 'vue';
import BmiCalculator from './components/BmiCalculator.vue';
import BmiResults from './components/BmiResults.vue';
import DietPlanView from './components/DietPlanView.vue';
import HealthyTips from './components/HealthyTips.vue';

// App state
const hasCalculated = ref(false);
const activeTab = ref('dashboard'); // 'dashboard', 'dietPlan', 'tips'
const userStats = ref(null);

const handleCalculate = (data) => {
  userStats.value = data;
  hasCalculated.value = true;
  activeTab.value = 'dashboard';
};

const handleReset = () => {
  userStats.value = null;
  hasCalculated.value = false;
};

// Calculations for calculations within App context for targets
const targetCalories = ref(1500);

const handleCalculateTarget = (stats) => {
  const { weight, height, age, gender, activityLevel, goal } = stats;
  // BMR Calculation
  let bmrVal = 0;
  if (gender === 'male') {
    bmrVal = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmrVal = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  // TDEE Activity Factor
  const factors = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    active: 1.725
  };
  const factor = factors[activityLevel] || 1.2;
  const tdeeVal = bmrVal * factor;

  // Calorie Target
  let target = tdeeVal;
  if (goal === 'lose') {
    target = Math.max(1200, tdeeVal - 500);
  } else if (goal === 'gain') {
    target = tdeeVal + 400;
  }
  
  targetCalories.value = Math.round(target);
};

// Intercept calculations to trigger target updates
const processCalculation = (data) => {
  handleCalculateTarget(data);
  handleCalculate(data);
};
</script>

<template>
  <div class="app-container">
    <!-- Navbar / Header -->
    <header class="app-header print-hide">
      <div class="header-logo">
        <span class="logo-icon">🥗</span>
        <div class="logo-text">
          <h1>TandooriFit</h1>
          <span>Smart Pakistani Diet Planner</span>
        </div>
      </div>
      <button v-if="hasCalculated" class="reset-btn" @click="handleReset">
        🔄 Restart Calculator
      </button>
    </header>

    <!-- Main Container -->
    <main class="main-content">
      <!-- Welcome Intro (Form mode) -->
      <section v-if="!hasCalculated" class="welcome-intro print-hide">
        <h2 class="welcome-title">Achieve Your Fitness Goals with Local Foods 🇵🇰</h2>
        <p class="welcome-desc">
          Calculate your BMI using regional South Asian medical guidelines and generate a clear, easy-to-understand 
          diet plan based on roti, lentils, grilled kebabs, seasonal fruits, and cardamom tea. No complex western recipes needed!
        </p>
      </section>

      <!-- Calculator Form -->
      <BmiCalculator v-if="!hasCalculated" @calculate="processCalculation" />

      <!-- Results Mode (Tabs Dashboard) -->
      <div v-else class="results-dashboard-wrapper">
        <!-- Dashboard Navigation Tabs -->
        <div class="dashboard-tabs print-hide">
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'dashboard' }"
            @click="activeTab = 'dashboard'"
          >
            📊 BMI & Calories
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'dietPlan' }"
            @click="activeTab = 'dietPlan'"
          >
            📋 Pakistani Diet Plan
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'tips' }"
            @click="activeTab = 'tips'"
          >
            💡 Healthy Habits
          </button>
        </div>

        <!-- Render active tab component -->
        <div class="tab-content-panel">
          <BmiResults 
            v-show="activeTab === 'dashboard'" 
            :stats="userStats" 
          />
          <DietPlanView 
            v-show="activeTab === 'dietPlan' || activeTab === 'all' /* Keep accessible for printing */" 
            :targetCalories="targetCalories" 
            :goal="userStats.goal"
          />
          <HealthyTips 
            v-show="activeTab === 'tips'" 
          />
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="app-footer print-hide">
      <p>© 2026 TandooriFit. Tailored nutritional planning for Pakistani lifestyles.</p>
    </footer>
  </div>
</template>

<style>
/* Reset and Global variables defined here so it applies app-wide */
:root {
  --font-family: 'Outfit', 'Inter', system-ui, sans-serif;
  --bg-dark: #0f172a;
  --bg-card: rgba(30, 41, 59, 0.45);
  --border-light: rgba(255, 255, 255, 0.08);
  --primary-color: #10b981;
  --primary-gradient: linear-gradient(135deg, #10b981 0%, #059669 100%);
  --accent-color: #06b6d4;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: var(--font-family);
  min-height: 100vh;
  background-image: 
    radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.1) 0px, transparent 50%),
    radial-gradient(at 50% 0%, rgba(6, 182, 212, 0.08) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(30, 41, 59, 0.6) 0px, transparent 50%);
  background-attachment: fixed;
  background-size: cover;
  -webkit-font-smoothing: antialiased;
}

#app {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  display: block !important;
}

@media (min-width: 1024px) {
  body {
    display: block !important;
  }
}
</style>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border-bottom: 1px solid var(--border-light);
  margin-bottom: 2rem;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  font-size: 2.5rem;
}

.logo-text h1 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.5px;
}

.logo-text span {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary-color);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.reset-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-light);
  color: #fff;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
}

.welcome-intro {
  text-align: center;
  max-width: 750px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.welcome-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.8px;
  line-height: 1.2;
}

.welcome-desc {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.dashboard-tabs {
  display: flex;
  gap: 10px;
  background: rgba(0, 0, 0, 0.2);
  padding: 6px;
  border-radius: 14px;
  margin-bottom: 2rem;
  border: 1px solid var(--border-light);
}

.tab-btn {
  flex: 1;
  padding: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  background: transparent;
  color: var(--text-muted);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-btn:hover {
  color: #fff;
}

.tab-btn.active {
  background: var(--primary-gradient);
  color: #fff;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);
}

.tab-content-panel {
  min-height: 400px;
}

.app-footer {
  text-align: center;
  padding: 2rem 0;
  border-top: 1px solid var(--border-light);
  color: var(--text-muted);
  font-size: 0.85rem;
}

@media print {
  .app-container {
    padding: 0 !important;
    max-width: 100% !important;
  }
  .main-content {
    margin-bottom: 0 !important;
  }
}
</style>
