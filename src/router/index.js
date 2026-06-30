import { createRouter, createWebHistory } from 'vue-router';
import CalculatorView from '../views/CalculatorView.vue';
import PlanView from '../views/PlanView.vue';
import DatabaseView from '../views/DatabaseView.vue';
import TipsView from '../views/TipsView.vue';

const routes = [
  {
    path: '/',
    name: 'calculator',
    component: CalculatorView
  },
  {
    path: '/plan',
    name: 'plan',
    component: PlanView
  },
  {
    path: '/database',
    name: 'database',
    component: DatabaseView
  },
  {
    path: '/tips',
    name: 'tips',
    component: TipsView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
