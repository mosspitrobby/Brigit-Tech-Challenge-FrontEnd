import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'
import type { FormInfo } from '@/App.vue'

export const useApiStore = defineStore('api', {
  state: () => ({
    response: {
      approved: null,
      message: null
    }
  }),
  getters: {
    getSubmit(state) {
      return state.response
    }
  },
  actions: {
    async submitResponse(form: FormInfo) {
      try {
        const res = await axios.post('http://localhost:9300/submit', form)
        this.$state.response = res.data
        console.log('response', res)
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log('ERROR ', error.response?.data)
        } else {
          console.log('ERROR', error)
        }
      }
    }
  }
})
