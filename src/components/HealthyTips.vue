<script setup>
const tips = [
  {
    title: "🥄 Control the Ghee & Cooking Oil",
    desc: "Pakistani curries (Salan) are notoriously high in fats. Cook meals using measuring spoons (1-2 teaspoons per person) instead of pouring directly from the can. Better yet, transition to canola, olive, or sunflower oil.",
    highlight: "Tip: Use oil sprays, and skim off the excess oil floating on top of your salan before serving."
  },
  {
    title: "☕ Standardize Your Chai (Tea) Habits",
    desc: "A standard 'Doodh Patti' can easily contain 150-200 calories from full-fat milk and sugar. Switch to 'Separate Chai' using low-fat or skimmed milk. Avoid white sugar completely; use Stevia, Erythritol, or drink it unsweetened.",
    highlight: "Tip: Elaichi (Cardamom) and Darchini (Cinnamon) add natural sweetness without calories."
  },
  {
    title: "🫓 Measure Roti & Rice Portions",
    desc: "A typical home-cooked roti size varies wildly. Aim for a CD-sized whole-wheat roti (approx. 50-60g of dry flour). Avoid white maida rotis/nan. For rice, choose boiled rice (basmati or brown) and measure it in a cup instead of platefuls.",
    highlight: "Tip: 1 plate of biryani/pulao can easily exceed 600 calories. Stick to plain boiled rice with cooked daal/chicken."
  },
  {
    title: "🍢 Choose Grilled/BBQ over Curries",
    desc: "When dining out or cooking at home, choose grilled items like Chicken Tikka, Seekh Kebab, or Fish Tikka. They are protein-packed and have significantly less oil than Karahi, Korma, or Nihari.",
    highlight: "Tip: One chicken tikka breast piece is about 220 calories, whereas a plate of chicken karahi can be 600+ calories."
  },
  {
    title: "🥗 Focus on Kachumar & Salad",
    desc: "Start your lunch and dinner by eating a bowl of fresh Kachumar salad (chopped cucumber, onion, tomatoes, green chilies with lemon juice). The high fiber content will keep you full, preventing overeating of roti and rice.",
    highlight: "Tip: Avoid high-calorie creamy mayonnaise dressings; stick to traditional lemon juice and black pepper."
  },
  {
    title: "💧 Ditch Sweet Drinks & Soda",
    desc: "Fizzy drinks, traditional syrups (Jam-e-Shirin, Rooh Afza), and packaged juices are packed with sugar. Replace them with water, mint-infused water, or fresh lime juice (Limopani) with stevia and a pinch of black salt (Kala Namak).",
    highlight: "Tip: A single can of soda contains about 10 teaspoons of sugar!"
  }
];
</script>

<template>
  <div class="tips-container glass-panel">
    <h2 class="section-title">💡 Healthy Habits for Pakistani Cooking</h2>
    <p class="section-subtitle">Making simple adjustments to traditional cooking and eating habits can double your weight loss or muscle building speed.</p>
    
    <div class="tips-grid">
      <div 
        v-for="(tip, index) in tips" 
        :key="index"
        class="tip-card"
      >
        <h4 class="tip-card-title">{{ tip.title }}</h4>
        <p class="tip-card-desc">{{ tip.desc }}</p>
        <div class="tip-card-highlight">
          <span>{{ tip.highlight }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tips-container {
  padding: 2.5rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
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
  margin-bottom: 2.5rem;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (max-width: 800px) {
  .tips-grid {
    grid-template-columns: 1fr;
  }
}

.tip-card {
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  transition: all 0.3s ease;
}

.tip-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.25);
}

.tip-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
}

.tip-card-desc {
  font-size: 0.88rem;
  color: #cbd5e1;
  line-height: 1.6;
}

.tip-card-highlight {
  font-size: 0.82rem;
  font-weight: 600;
  color: #10b981;
  background: rgba(16, 185, 129, 0.05);
  padding: 10px 12px;
  border-radius: 10px;
  border-left: 3px solid #10b981;
  margin-top: auto;
}
</style>
