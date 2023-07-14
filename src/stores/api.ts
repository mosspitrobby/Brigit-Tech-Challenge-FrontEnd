import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'
import type { FormInfo } from '@/App.vue'

export const useApiStore = defineStore('api', {
  state: () => ({
    response: {
      approved: null,
      message: null
    },
    error: false
  }),
  getters: {
    getSubmit(state) {
      return state.response
    },
    getError(state) {
      return state.error
    }
  },
  actions: {
    refreshError() {
      this.error = false
    },
    async submitResponse(form: FormInfo) {
      try {
        //change to backend
        const res = await axios.post('https://loan-calc.adaptable.app/submit', form)
        this.$state.response = res.data
        this.$state.error = false

      } catch (error) {
        if (error instanceof AxiosError) {
          console.log('AXIOS ERROR ', error)
        } else {
          console.log('ERROR', error)
        }
        this.$state.error = true
      }
    }
  }
})
