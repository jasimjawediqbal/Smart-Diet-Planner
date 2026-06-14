// Pakistani-based diet plans for various calorie levels.
// All values are calculated to represent healthy, nutrient-dense Pakistani meals.
// It includes calorie and macro distribution, alongside food alternatives (swaps).

export const calorieTiers = {
  1200: {
    calories: 1200,
    macros: { protein: 75, carbs: 135, fat: 40 },
    meals: {
      breakfast: {
        name: "Healthy Pakistani Breakfast",
        items: [
          { name: "Whole Wheat Roti", quantity: "1 medium (approx. 50g)", calories: 150, swapGroup: "roti" },
          { name: "Omelette with Veggies (Onion, Tomato, Green Chili)", quantity: "1 whole egg + 1 egg white (cooked in 1/2 tsp olive/canola oil)", calories: 110, swapGroup: "eggs" },
          { name: "Elaichi Tea (No Sugar)", quantity: "1 cup with skimmed milk", calories: 35, swapGroup: "tea" }
        ]
      },
      midMorningSnack: {
        name: "Mid-Morning Refreshment",
        items: [
          { name: "Seasonal Pakistani Fruit (Apple / Guava / Peach)", quantity: "1 medium sized", calories: 60, swapGroup: "fruits" },
          { name: "Green Tea (No Sugar)", quantity: "1 cup", calories: 2, swapGroup: "greentea" }
        ]
      },
      lunch: {
        name: "Light Traditional Lunch",
        items: [
          { name: "Boiled Rice (Chawal) OR Whole Wheat Roti", quantity: "1 cup boiled or 1 medium Roti", calories: 180, swapGroup: "grains" },
          { name: "Daal (Moong/Masoor) OR Mixed Sabzi Curry", quantity: "1 cup (cooked with minimal oil)", calories: 150, swapGroup: "pulses" },
          { name: "Fresh Kachumar Salad (Cucumber, Onion, Tomato, Lemon juice)", quantity: "1 large bowl", calories: 30, swapGroup: "salad" },
          { name: "Mint Raita (Low-Fat Yogurt base)", quantity: "1/2 cup", calories: 45, swapGroup: "raita" }
        ]
      },
      eveningSnack: {
        name: "Evening High-Tea (Fit Style)",
        items: [
          { name: "Roasted Black Chana (Bhuna Chana)", quantity: "2 tablespoons (approx. 20g)", calories: 75, swapGroup: "snacks" },
          { name: "Mixed Raw Nuts (Almonds & Walnuts)", quantity: "6 almonds + 2 walnuts", calories: 85, swapGroup: "nuts" }
        ]
      },
      dinner: {
        name: "High-Protein Dinner",
        items: [
          { name: "Grilled Chicken Tikka OR Baked Fish Tikka", quantity: "150g (boneless/cooked)", calories: 220, swapGroup: "proteins" },
          { name: "Steamed or Stir-fried Vegetables (Cabbage, Bell Peppers, Carrot)", quantity: "1 cup", calories: 50, swapGroup: "veggies" },
          { name: "Fresh Green Salad", quantity: "1 bowl", calories: 20, swapGroup: "salad" }
        ]
      },
      bedtime: {
        name: "Nighttime Recovery",
        items: [
          { name: "Turmeric Elaichi Milk (Golden Milk)", quantity: "1/2 cup warm skimmed milk with pinch of turmeric & cardamom", calories: 45, swapGroup: "milk" }
        ]
      }
    }
  },
  1500: {
    calories: 1500,
    macros: { protein: 95, carbs: 165, fat: 50 },
    meals: {
      breakfast: {
        name: "Healthy Pakistani Breakfast",
        items: [
          { name: "Whole Wheat Roti", quantity: "1 medium (approx. 60g)", calories: 180, swapGroup: "roti" },
          { name: "Omelette with Veggies", quantity: "2 whole eggs (cooked in 1 tsp olive/canola oil)", calories: 170, swapGroup: "eggs" },
          { name: "Elaichi Tea (No Sugar / Stevia option)", quantity: "1 cup with skimmed milk", calories: 35, swapGroup: "tea" }
        ]
      },
      midMorningSnack: {
        name: "Mid-Morning Refreshment",
        items: [
          { name: "Seasonal Pakistani Fruit (Apple / Guava / Pear / Orange)", quantity: "1 medium", calories: 70, swapGroup: "fruits" },
          { name: "Raw Almonds", quantity: "8-10 pieces", calories: 60, swapGroup: "nuts" },
          { name: "Green Tea (No Sugar)", quantity: "1 cup", calories: 2, swapGroup: "greentea" }
        ]
      },
      lunch: {
        name: "Satisfying Local Lunch",
        items: [
          { name: "Boiled Rice (Chawal) OR Whole Wheat Roti", quantity: "1.25 cups boiled or 1 medium Roti", calories: 220, swapGroup: "grains" },
          { name: "Chicken and Mixed Vegetable Salan (Curry)", quantity: "1 cup (100g chicken, cooked in 1 tsp oil)", calories: 200, swapGroup: "pulses" },
          { name: "Fresh Kachumar Salad (with lemon and vinegar dressing)", quantity: "1 large bowl", calories: 30, swapGroup: "salad" },
          { name: "Mint Raita (Low-Fat)", quantity: "1/2 cup", calories: 45, swapGroup: "raita" }
        ]
      },
      eveningSnack: {
        name: "Teatime Snack",
        items: [
          { name: "Roasted Black Chana (Bhuna Chana)", quantity: "3 tablespoons (approx. 30g)", calories: 110, swapGroup: "snacks" },
          { name: "Black Coffee or Green Tea (No Sugar)", quantity: "1 cup", calories: 5, swapGroup: "greentea" }
        ]
      },
      dinner: {
        name: "Lean Dinner",
        items: [
          { name: "Tandoori Chicken Tikka OR Grilled Fish Tikka", quantity: "180g cooked weight", calories: 260, swapGroup: "proteins" },
          { name: "Whole Wheat Roti", quantity: "1 small (approx. 40g)", calories: 120, swapGroup: "roti" },
          { name: "Fresh Garden Salad", quantity: "1 large bowl", calories: 20, swapGroup: "salad" }
        ]
      },
      bedtime: {
        name: "Nighttime Recovery",
        items: [
          { name: "Turmeric Milk (Golden Milk)", quantity: "1 cup warm skimmed milk with pinch of turmeric", calories: 80, swapGroup: "milk" }
        ]
      }
    }
  },
  1800: {
    calories: 1800,
    macros: { protein: 115, carbs: 195, fat: 60 },
    meals: {
      breakfast: {
        name: "Classic Healthy Breakfast",
        items: [
          { name: "Whole Wheat Roti", quantity: "1 medium (approx. 70g)", calories: 210, swapGroup: "roti" },
          { name: "Scrambled Eggs with Spinach & Tomato", quantity: "2 whole eggs + 1 egg white (1 tsp oil)", calories: 190, swapGroup: "eggs" },
          { name: "Chai / Tea (Elaichi flavor, no sugar)", quantity: "1 cup with skimmed milk", calories: 35, swapGroup: "tea" }
        ]
      },
      midMorningSnack: {
        name: "Mid-Morning Fuel",
        items: [
          { name: "Seasonal Pakistani Fruit (Apple, Pear, Orange or Peach)", quantity: "1.5 medium or 1 large", calories: 90, swapGroup: "fruits" },
          { name: "Walnuts & Almonds", quantity: "5 halves + 8 almonds", calories: 100, swapGroup: "nuts" }
        ]
      },
      lunch: {
        name: "Healthy Traditional Lunch",
        items: [
          { name: "Boiled Rice (Chawal) OR Whole Wheat Roti", quantity: "1.5 cups boiled or 1.25 medium Roti", calories: 270, swapGroup: "grains" },
          { name: "Daal Mash or Chanay Ki Daal (Thick cooked)", quantity: "1 cup (low oil)", calories: 180, swapGroup: "pulses" },
          { name: "Grilled Chicken Boti or Shami Kebab", quantity: "1 piece (approx 60g)", calories: 110, swapGroup: "proteins" },
          { name: "Mint Raita & Kachumar Salad", quantity: "1 cup combined", calories: 75, swapGroup: "raita" }
        ]
      },
      eveningSnack: {
        name: "Evening High-Tea",
        items: [
          { name: "Roasted Black Chana", quantity: "1/4 cup (approx. 40g)", calories: 150, swapGroup: "snacks" },
          { name: "Green Tea (No Sugar)", quantity: "1 cup", calories: 2, swapGroup: "greentea" }
        ]
      },
      dinner: {
        name: "High-Protein Dinner",
        items: [
          { name: "Baked/Grilled Chicken Breast Tikka or Fish Tikka", quantity: "200g cooked weight", calories: 300, swapGroup: "proteins" },
          { name: "Whole Wheat Roti", quantity: "1 medium (approx. 60g)", calories: 180, swapGroup: "roti" },
          { name: "Sauteed Cauliflower, Carrot & Beans", quantity: "1 cup", calories: 60, swapGroup: "veggies" },
          { name: "Fresh Green Salad", quantity: "1 bowl", calories: 20, swapGroup: "salad" }
        ]
      },
      bedtime: {
        name: "Bedtime Snack",
        items: [
          { name: "Golden Turmeric Milk", quantity: "1 cup warm low-fat milk", calories: 95, swapGroup: "milk" }
        ]
      }
    }
  },
  2000: {
    calories: 2000,
    macros: { protein: 125, carbs: 220, fat: 68 },
    meals: {
      breakfast: {
        name: "Hearty Pakistani Breakfast",
        items: [
          { name: "Whole Wheat Roti / Chapati", quantity: "1.25 medium Roti (approx. 80g)", calories: 240, swapGroup: "roti" },
          { name: "Eggs Omelette with Onion, Tomato & Spinach", quantity: "2 whole eggs + 2 egg whites (cooked in 1 tsp olive oil)", calories: 210, swapGroup: "eggs" },
          { name: "Chai (Standard Pakistani tea, low-sugar or stevia)", quantity: "1 cup with low-fat milk", calories: 50, swapGroup: "tea" }
        ]
      },
      midMorningSnack: {
        name: "Fruit & Nuts Platter",
        items: [
          { name: "Banana or Sweet Melon (Garma)", quantity: "1 medium banana or 1 cup melon", calories: 105, swapGroup: "fruits" },
          { name: "Raw Nuts Mix (Almonds, Walnuts, Cashews)", quantity: "15 pieces total", calories: 130, swapGroup: "nuts" }
        ]
      },
      lunch: {
        name: "Traditional Nutrient-Rich Lunch",
        items: [
          { name: "Boiled Basmati Rice OR Chapati", quantity: "1.75 cups boiled or 1.5 medium Rotis", calories: 310, swapGroup: "grains" },
          { name: "Chicken Salan (Curry) or Beef Mince (Keema)", quantity: "1 cup Keema/Salan (cooked with minimal oil)", calories: 240, swapGroup: "proteins" },
          { name: "Daal Moong or Masoor (Lentils)", quantity: "1/2 cup", calories: 90, swapGroup: "pulses" },
          { name: "Mixed Veggie Salad & Raita", quantity: "1 large bowl", calories: 80, swapGroup: "raita" }
        ]
      },
      eveningSnack: {
        name: "Evening Teatime Fuel",
        items: [
          { name: "Boiled Egg (Whole)", quantity: "1 large", calories: 78, swapGroup: "eggs" },
          { name: "Roasted Chana", quantity: "3 tablespoons", calories: 110, swapGroup: "snacks" }
        ]
      },
      dinner: {
        name: "Premium Grill Dinner",
        items: [
          { name: "Grilled Chicken Tikka or Seekh Kebabs (Beef/Chicken)", quantity: "220g (approx 2 large skewers)", calories: 340, swapGroup: "proteins" },
          { name: "Whole Wheat Roti", quantity: "1.25 medium Roti (approx. 75g)", calories: 220, swapGroup: "roti" },
          { name: "Tarka-less Daal or Vegetable curry as side", quantity: "1/2 cup", calories: 80, swapGroup: "pulses" },
          { name: "Fresh Kachumar Salad", quantity: "1 bowl", calories: 30, swapGroup: "salad" }
        ]
      },
      bedtime: {
        name: "Bedtime Recovery",
        items: [
          { name: "Golden Cardamom Milk", quantity: "1 cup warm low-fat milk + cardamom + 1/2 tsp honey", calories: 110, swapGroup: "milk" }
        ]
      }
    }
  },
  2200: {
    calories: 2200,
    macros: { protein: 138, carbs: 245, fat: 74 },
    meals: {
      breakfast: {
        name: "Energy Boosting Breakfast",
        items: [
          { name: "Whole Wheat Roti OR Multigrain Toast", quantity: "1.5 medium Rotis or 3 slices toast", calories: 290, swapGroup: "roti" },
          { name: "Cheese Omelette with Veggies", quantity: "3 eggs (2 whole + 1 white) + 1 slice low-fat cheese", calories: 260, swapGroup: "eggs" },
          { name: "Chai (Standard Tea, low-sugar)", quantity: "1 cup with low-fat milk", calories: 50, swapGroup: "tea" }
        ]
      },
      midMorningSnack: {
        name: "Mid-Morning Snack",
        items: [
          { name: "Apple or Banana with Peanut Butter", quantity: "1 fruit + 1 tablespoon natural peanut butter", calories: 190, swapGroup: "snacks" },
          { name: "Almonds", quantity: "10 pieces", calories: 70, swapGroup: "nuts" }
        ]
      },
      lunch: {
        name: "Premium Pakistani Lunch",
        items: [
          { name: "Boiled Basmati Rice", quantity: "2 cups boiled", calories: 360, swapGroup: "grains" },
          { name: "Beef/Mutton Keema (Lean Mince) or Chicken Curry", quantity: "1.25 cups (cooked in minimal oil)", calories: 280, swapGroup: "proteins" },
          { name: "Daal Moong/Masoor or Lobia (Red Beans)", quantity: "1/2 cup", calories: 90, swapGroup: "pulses" },
          { name: "Salad with Lemon juice & 1/2 cup Mint Raita", quantity: "1 large bowl", calories: 80, swapGroup: "raita" }
        ]
      },
      eveningSnack: {
        name: "Teatime Snack",
        items: [
          { name: "Healthy Shami Kebab (Pan-fried with drop of oil)", quantity: "1 piece (beef/chicken with daal)", calories: 120, swapGroup: "proteins" },
          { name: "Green Tea with Mint", quantity: "1 cup", calories: 2, swapGroup: "greentea" }
        ]
      },
      dinner: {
        name: "High-Protein Grill Dinner",
        items: [
          { name: "Grilled Chicken Breast / Fish Tikka / Seekh Kebab", quantity: "240g cooked weight", calories: 360, swapGroup: "proteins" },
          { name: "Whole Wheat Roti", quantity: "1.5 medium Rotis", calories: 290, swapGroup: "roti" },
          { name: "Stir-fried Broccoli, Mushrooms & Capsicum", quantity: "1 cup", calories: 70, swapGroup: "veggies" },
          { name: "Fresh Kachumar Salad", quantity: "1 bowl", calories: 30, swapGroup: "salad" }
        ]
      },
      bedtime: {
        name: "Bedtime Shake",
        items: [
          { name: "Warm Cardamom Milk with Almonds", quantity: "1 cup low-fat milk + 5 crushed almonds", calories: 130, swapGroup: "milk" }
        ]
      }
    }
  },
  2500: {
    calories: 2500,
    macros: { protein: 155, carbs: 280, fat: 84 },
    meals: {
      breakfast: {
        name: "Athletic Pakistani Breakfast",
        items: [
          { name: "Whole Wheat Paratha (Cooked with 1 tsp Desi Ghee / Olive oil)", quantity: "1 large (approx. 90g)", calories: 340, swapGroup: "paratha" },
          { name: "Scrambled Eggs with Veggies & Cheese", quantity: "3 whole eggs + 1 slice cheddar cheese", calories: 280, swapGroup: "eggs" },
          { name: "Pakistani Chai (Standard, with brown sugar / honey)", quantity: "1 cup with whole milk", calories: 80, swapGroup: "tea" }
        ]
      },
      midMorningSnack: {
        name: "High Calorie Fruit & Nut Mix",
        items: [
          { name: "Seasonal Fruits Platter (Apple + Banana)", quantity: "2 medium fruits", calories: 160, swapGroup: "fruits" },
          { name: "Mixed Nuts (Almonds, Cashews, Pistachios, Walnuts)", quantity: "25 pieces total", calories: 200, swapGroup: "nuts" }
        ]
      },
      lunch: {
        name: "High-Performance Lunch",
        items: [
          { name: "Boiled Basmati Rice OR Whole Wheat Roti", quantity: "2.25 cups rice or 2 medium Rotis", calories: 410, swapGroup: "grains" },
          { name: "Chicken/Mutton Curry (Salan) or Beef Keema", quantity: "1.5 cups (cooked in healthy fats)", calories: 320, swapGroup: "proteins" },
          { name: "Lobia (Red Kidney Beans) or Chickpea Curry (Cholay)", quantity: "1/2 cup", calories: 110, swapGroup: "pulses" },
          { name: "Full Fat Mint Yogurt Raita & Kachumar Salad", quantity: "1 cup combined", calories: 100, swapGroup: "raita" }
        ]
      },
      eveningSnack: {
        name: "Evening Protein Snack",
        items: [
          { name: "Chicken/Beef Shami Kebabs (Pan-fried)", quantity: "2 medium pieces", calories: 240, swapGroup: "proteins" },
          { name: "Green Tea or Elaichi Chai (No Sugar)", quantity: "1 cup", calories: 5, swapGroup: "greentea" }
        ]
      },
      dinner: {
        name: "Premium BBQ Dinner",
        items: [
          { name: "Chicken Tikka (Chest) / Fish Tikka / Beef Seekh Kebab", quantity: "260g cooked weight", calories: 390, swapGroup: "proteins" },
          { name: "Whole Wheat Roti", quantity: "1.5 medium Rotis", calories: 290, swapGroup: "roti" },
          { name: "Healthy Stir-fried Vegetables", quantity: "1 cup", calories: 70, swapGroup: "veggies" },
          { name: "Fresh Kachumar Salad", quantity: "1 bowl", calories: 30, swapGroup: "salad" }
        ]
      },
      bedtime: {
        name: "Bedtime Recovery Shake",
        items: [
          { name: "Banana Cardamom Milkshake", quantity: "1 cup milk + 1 medium banana blended (no sugar)", calories: 190, swapGroup: "milk" }
        ]
      }
    }
  }
};

// Swaps database to cycle through options when user interacts
export const swapsDatabase = {
  roti: [
    { name: "Whole Wheat Roti", quantity: "1 medium", calories: 150 },
    { name: "Bran Bread Slices", quantity: "2 slices", calories: 140 },
    { name: "Multigrain Roti", quantity: "1 medium", calories: 155 },
    { name: "Oat Oatmeal Chapati", quantity: "1 medium", calories: 145 },
    { name: "Barley (Jau) Roti", quantity: "1 medium", calories: 135 }
  ],
  eggs: [
    { name: "Omelette with Veggies", quantity: "1 whole egg + 1 white", calories: 110 },
    { name: "Boiled Eggs", quantity: "2 large eggs (boiled)", calories: 155 },
    { name: "Sunny-Side Up (low oil)", quantity: "1 whole egg + 1 white", calories: 115 },
    { name: "Egg bhurji (Anday Ka Khagina)", quantity: "1 whole egg + 1 white + tomato & onion", calories: 120 }
  ],
  tea: [
    { name: "Elaichi Tea (No Sugar)", quantity: "1 cup (skimmed milk)", calories: 35 },
    { name: "Darchini (Cinnamon) Tea", quantity: "1 cup (skimmed milk)", calories: 35 },
    { name: "Kashmiri Chai (Pink Tea - No sugar/cream, low fat)", quantity: "1 cup", calories: 45 },
    { name: "Green Tea with Lemon", quantity: "1 cup (no sugar)", calories: 2 },
    { name: "Black Coffee", quantity: "1 cup", calories: 5 }
  ],
  fruits: [
    { name: "Pakistani Guava (Amrood)", quantity: "1 medium", calories: 45 },
    { name: "Apple (Saib)", quantity: "1 medium", calories: 75 },
    { name: "Peach (Aroo)", quantity: "1 medium", calories: 60 },
    { name: "Orange (Malta/Kinnow)", quantity: "1 medium", calories: 60 },
    { name: "Pear (Nashpati)", quantity: "1 medium", calories: 80 },
    { name: "Pomegranate (Anar)", quantity: "1/2 cup seeds", calories: 70 }
  ],
  greentea: [
    { name: "Green Tea (No Sugar)", quantity: "1 cup", calories: 2 },
    { name: "Mint & Lemon Green Tea", quantity: "1 cup", calories: 3 },
    { name: "Ginger Lemongrass Kahwa", quantity: "1 cup", calories: 5 },
    { name: "Chamomile Kahwa", quantity: "1 cup", calories: 2 }
  ],
  grains: [
    { name: "Boiled Basmati Rice", quantity: "1 cup", calories: 180 },
    { name: "Brown Rice", quantity: "1 cup", calories: 170 },
    { name: "Whole Wheat Roti", quantity: "1 medium (approx 50g)", calories: 150 },
    { name: "Quinoa", quantity: "1 cup cooked", calories: 220 },
    { name: "Broken Wheat (Daliya) Khichdi", quantity: "1 cup cooked", calories: 160 }
  ],
  pulses: [
    { name: "Daal Moong/Masoor (Lentils)", quantity: "1 cup cooked", calories: 150 },
    { name: "Lobia Curry (Red Kidney Beans)", quantity: "1 cup cooked", calories: 160 },
    { name: "White Chana Curry (Cholay)", quantity: "1 cup cooked", calories: 180 },
    { name: "Mixed Vegetable Curry (Salan)", quantity: "1 cup cooked", calories: 130 },
    { name: "Palak (Spinach) Curry", quantity: "1 cup cooked", calories: 110 }
  ],
  salad: [
    { name: "Fresh Kachumar Salad", quantity: "1 bowl", calories: 30 },
    { name: "Green Garden Salad (Lettuce, Cucumber, Mint)", quantity: "1 bowl", calories: 20 },
    { name: "Beetroot & Carrot Salad", quantity: "1 bowl", calories: 45 },
    { name: "Cabbage & Bell Pepper Salad", quantity: "1 bowl", calories: 25 }
  ],
  raita: [
    { name: "Mint Raita (Low-Fat Yogurt)", quantity: "1/2 cup", calories: 45 },
    { name: "Zeera (Cummin) Raita", quantity: "1/2 cup", calories: 40 },
    { name: "Cucumber Raita", quantity: "1/2 cup", calories: 42 },
    { name: "Plain Skimmed Dahi (Yogurt)", quantity: "1/2 cup", calories: 50 }
  ],
  snacks: [
    { name: "Roasted Black Chana (Bhuna Chana)", quantity: "3 tablespoons", calories: 110 },
    { name: "Air-Popped Popcorn (No butter)", quantity: "2 cups", calories: 60 },
    { name: "Puffed Rice (Murmura/Marunda - Roasted)", quantity: "1.5 cups", calories: 80 },
    { name: "Boiled Sweet Corn with Lemon & Chaat Masala", quantity: "1/2 cup", calories: 90 }
  ],
  nuts: [
    { name: "Raw Almonds", quantity: "10 pieces", calories: 70 },
    { name: "Walnut Halves", quantity: "4 pieces", calories: 52 },
    { name: "Pistachios (Unsalted)", quantity: "15 pieces", calories: 60 },
    { name: "Cashews (Raw)", quantity: "8 pieces", calories: 72 },
    { name: "Peanuts (Roasted, Unsalted)", quantity: "15 pieces", calories: 90 }
  ],
  proteins: [
    { name: "Grilled Chicken Tikka (Breast part)", quantity: "150g", calories: 220 },
    { name: "Baked Fish Tikka (Rahu/Mahseer/Salmon)", quantity: "150g", calories: 200 },
    { name: "Chicken Seekh Kebab (Baked/Grilled)", quantity: "2 skewers (approx 120g)", calories: 210 },
    { name: "Beef Shami Kebab (Pan-fried, low oil)", quantity: "2 pieces", calories: 240 },
    { name: "Paneer/Cottage Cheese (Tikka style)", quantity: "100g grilled", calories: 190 }
  ],
  veggies: [
    { name: "Stir-fried/Steamed Vegetables", quantity: "1 cup", calories: 50 },
    { name: "Boiled Cauliflower & Peas", quantity: "1 cup", calories: 65 },
    { name: "Baked Bhindi (Okra) - low oil", quantity: "1 cup", calories: 80 },
    { name: "Tinda/Kaddu (Gourd) Sabzi", quantity: "1 cup", calories: 70 }
  ],
  milk: [
    { name: "Turmeric Elaichi Milk (Skimmed)", quantity: "1 cup", calories: 80 },
    { name: "Plain Low-Fat Warm Milk", quantity: "1 cup", calories: 90 },
    { name: "Cardamom Fennel (Saunf) Tea with Milk", quantity: "1 cup", calories: 60 },
    { name: "Soy Milk (Unsweetened)", quantity: "1 cup", calories: 80 }
  ],
  paratha: [
    { name: "Whole Wheat Paratha (Low Oil/Ghee)", quantity: "1 medium", calories: 300 },
    { name: "Whole Wheat Roti + 1 tsp Honey/Butter", quantity: "1 Roti + 1 tsp spread", calories: 230 },
    { name: "Aloo Roti (Potato stuffed - dry baked)", quantity: "1 medium", calories: 240 },
    { name: "Oats Porridge with Milk", quantity: "1 large bowl", calories: 260 }
  ]
};

// Return best matching diet plan based on target calories
export function getDietPlan(calories) {
  // Find the closest calorie tier available in our database
  const tiers = Object.keys(calorieTiers).map(Number);
  const closestTier = tiers.reduce((prev, curr) => {
    return Math.abs(curr - calories) < Math.abs(prev - calories) ? curr : prev;
  });
  
  // Clone the meal plan so modifications/swaps don't overwrite global state
  return JSON.parse(JSON.stringify(calorieTiers[closestTier]));
}
