import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref<number>(0);

  const doubleCount = computed(() => count.value * 2);

  const increment = () => {
    count.value++;
  };

  const double = () => {
    count.value = count.value * 2;
  };

  return { count, doubleCount, increment, double };
});
