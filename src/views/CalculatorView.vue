<script setup>
import BmiCalculator from '../components/BmiCalculator.vue';
import BmiResults from '../components/BmiResults.vue';

defineProps({
  units: String,
  age: Number,
  gender: String,
  weightKg: Number,
  weightLbs: Number,
  heightCm: Number,
  feet: Number,
  inches: Number,
  activity: String,
  goal: String,
  planStyle: String,
  mealsPerDay: Number,
  result: Object,
  bmiCategory: String,
  idealWeightRange: String
});

const emit = defineEmits([
  'update:units', 'update:age', 'update:gender', 'update:weightKg',
  'update:weightLbs', 'update:heightCm', 'update:feet', 'update:inches',
  'update:activity', 'update:goal', 'update:planStyle', 'update:mealsPerDay',
  'calculate', 'reset'
]);
</script>

<template>
  <div class="calculator-view">
    <BmiCalculator
      :units="units"
      :age="age"
      :gender="gender"
      :weightKg="weightKg"
      :weightLbs="weightLbs"
      :heightCm="heightCm"
      :feet="feet"
      :inches="inches"
      :activity="activity"
      :goal="goal"
      :planStyle="planStyle"
      :mealsPerDay="mealsPerDay"
      @update:units="emit('update:units', $event)"
      @update:age="emit('update:age', $event)"
      @update:gender="emit('update:gender', $event)"
      @update:weightKg="emit('update:weightKg', $event)"
      @update:weightLbs="emit('update:weightLbs', $event)"
      @update:heightCm="emit('update:heightCm', $event)"
      @update:feet="emit('update:feet', $event)"
      @update:inches="emit('update:inches', $event)"
      @update:activity="emit('update:activity', $event)"
      @update:goal="emit('update:goal', $event)"
      @update:planStyle="emit('update:planStyle', $event)"
      @update:mealsPerDay="emit('update:mealsPerDay', $event)"
      @calculate="emit('calculate')"
      @reset="emit('reset')"
    />

    <BmiResults
      :result="result"
      :bmiCategory="bmiCategory"
      :idealWeightRange="idealWeightRange"
    />
  </div>
</template>
