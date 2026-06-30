<script setup>
const tips = [
  {
    title: 'Smart Carbohydrate Alternatives',
    desc: 'Swap refined white flour (Maida) for whole wheat (Lal Aata) or multigrain rotis. Avoid deep-fried parathas daily; instead, use a non-stick pan with a brush of olive oil or desi ghee (limit to 1 tsp).'
  },
  {
    title: 'Lean Protein Sources',
    desc: 'Increase skinless chicken tikka (breast part), boiled lentils (Dal), or beef seekh kebabs instead of rich, oily curries (Karahi/Korma). Include eggs and high-protein local low-fat yogurt (Dahi) to meet daily targets.'
  },
  {
    title: 'Hydration & Traditional Drinks',
    desc: 'Avoid sugary sodas or commercial juices. Drink plain water or unsweetened mint lemonade. If drinking Lassi, choose a salted, diluted version (Chaas) instead of heavy sweet Lassi.'
  },
  {
    title: 'Incorporate Raw Salads',
    desc: 'Always consume a small plate of fresh salad (cucumber, onions, cabbage, tomatoes) before lunch and dinner. The fiber aids digestion and keeps you fuller longer, reducing portion sizes of calorie-dense rice/roti.'
  },
  {
    title: 'Portion Control in Shared Meals',
    desc: 'When sharing family dishes like Biryani or Pulao, measure your portion onto a separate plate first. Match every portion of rice with double the portion of lean chicken and cucumber salad.'
  }
];
</script>

<template>
  <div class="tips-card">
    <h3>Healthy South Asian Dietary Tips</h3>
    <p class="subtitle">Practical lifestyle adjustments to help achieve your daily calorie goals while enjoying local cuisine.</p>

    <div class="tips-grid">
      <div v-for="tip in tips" :key="tip.title" class="tip-item">
        <h4>{{ tip.title }}</h4>
        <p>{{ tip.desc }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tips-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.subtitle {
  font-size: 0.95rem;
  color: var(--muted);
  margin: 0 0 10px 0;
}

.tips-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.tip-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.tip-item:hover {
  transform: translateY(-2px);
  border-color: rgba(16, 185, 129, 0.25);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.tip-item h4 {
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
}

.tip-item p {
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}
</style>
