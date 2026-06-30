const macroRules = [
  { terms: ['biryani'], macros: { calories: 450, protein: 22, carbs: 58, fat: 12 } },
  { terms: ['karahi', 'korma'], macros: { calories: 310, protein: 26, carbs: 5, fat: 20 } },
  { terms: ['tikka'], macros: { calories: 180, protein: 30, carbs: 1, fat: 5 } },
  { terms: ['kebab', 'kabab', 'seekh'], macros: { calories: 160, protein: 18, carbs: 2, fat: 9 } },
  { terms: ['roti', 'chapati'], macros: { calories: 120, protein: 3.5, carbs: 24, fat: 0.5 } },
  { terms: ['paratha'], macros: { calories: 290, protein: 5, carbs: 38, fat: 13 } },
  { terms: ['rice', 'pulao'], macros: { calories: 205, protein: 4.2, carbs: 44.5, fat: 0.4 } },
  { terms: ['dal', 'daal', 'lentil'], macros: { calories: 180, protein: 9.5, carbs: 28, fat: 4 } },
  { terms: ['soup'], macros: { calories: 140, protein: 7, carbs: 20, fat: 3 } },
  { terms: ['sabzi', 'vegetable'], macros: { calories: 150, protein: 3, carbs: 16, fat: 8 } },
  { terms: ['chaat', 'chana'], macros: { calories: 220, protein: 7.5, carbs: 36, fat: 4.5 } },
  { terms: ['halwa'], macros: { calories: 280, protein: 8, carbs: 32, fat: 14 } },
  { terms: ['samosa'], macros: { calories: 250, protein: 3.5, carbs: 32, fat: 12 } },
  { terms: ['pakora'], macros: { calories: 180, protein: 4, carbs: 18, fat: 10 } },
  { terms: ['egg'], macros: { calories: 72, protein: 6, carbs: 0.4, fat: 5 } },
  { terms: ['banana'], macros: { calories: 105, protein: 1.3, carbs: 27, fat: 0.4 } },
  { terms: ['apple'], macros: { calories: 95, protein: 0.5, carbs: 25, fat: 0.3 } },
  { terms: ['chicken'], macros: { calories: 165, protein: 31, carbs: 0, fat: 3.6 } },
  { terms: ['yogurt', 'raita', 'dahi'], macros: { calories: 110, protein: 6, carbs: 8, fat: 4 } },
];

export const estimateMacros = (name = '') => {
  const query = name.toLowerCase();
  const match = macroRules.find((rule) => rule.terms.some((term) => query.includes(term)));

  return match?.macros ?? { calories: 200, protein: 10, carbs: 25, fat: 6 };
};
