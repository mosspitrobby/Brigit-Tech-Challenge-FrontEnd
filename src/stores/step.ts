import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStepStore = defineStore('step', () => {
  const step = ref(0)

  function increment() {
    step.value++
  }

  function decrement() {
    step.value--
  }
  function restart() {
    step.value = 0
  }

  return { step, increment, decrement, restart }
})
