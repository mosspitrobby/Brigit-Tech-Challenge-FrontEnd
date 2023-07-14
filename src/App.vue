<script lang="ts">
import IdentityForm from './components/IdentityForm.vue'
import FinanceForm from './components/FinanceForm.vue'
import ResultsScreen from './components/ResultScreen.vue'
import { useStepStore } from '@/stores/step'
import { useApiStore } from '@/stores/api'
import { toRaw } from 'vue'

export interface FormInfo {
  fname: string
  lname: string
  location: string
  dob: string
  license: String
  finances: {
    salaryPerQuarter: number
    totalCreditCardDebt: number
    currentHomeLoanDebt: number
    totalSavings: number
    stock: StockInfo[]
  }
}

export interface StockInfo {
  name: string
  quantity: number
}

export interface IdentityInfo {
  fname: string
  lname: string
  location: string
  dob: string
  license: String
}

export interface FinanceInfo {
  salaryPerQuarter: number
  totalCreditCardDebt: number
  currentHomeLoanDebt: number
  totalSavings: number
  stock: StockInfo[]
}

export default {
  data(): {
    form: {
      identity: IdentityInfo
      finances: FinanceInfo
    }
    steps: any
    api: any
  } {
    return {
      form: {
        identity: {
          fname: '',
          lname: '',
          location: '',
          dob: '',
          license: ''
        },
        finances: {
          salaryPerQuarter: 0,
          totalCreditCardDebt: 0,
          currentHomeLoanDebt: 0,
          totalSavings: 0,
          stock: []
        }
      },
      steps: useStepStore(),
      api: useApiStore()
    }
  },
  components: {
    IdentityForm,
    FinanceForm,
    ResultsScreen
  },
  methods: {
    populateIdentity(form: IdentityInfo) {
      this.form.identity = form
      console.log(this.form.identity)
      this.steps.increment()
    },
    async populateFinances(form: FinanceInfo) {
      this.form.finances = form
      //wait before incrementing
      await this.formSubmitted()
      this.steps.increment()
    },
    async formSubmitted() {
      const fullForm: FormInfo = {
        ...this.form.identity,
        finances: toRaw(this.form.finances)
      }
      await this.api.submitResponse(fullForm)
    }
  }
}
</script>

<template>
  <IdentityForm v-if="steps.step == 0" @form-submitted="populateIdentity" />
  <FinanceForm v-if="steps.step == 1" @form-submitted="populateFinances" />
  <ResultsScreen v-if="steps.step == 2" />
</template>

<style>
.buttons {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.back {
  background-color: grey;
}

.input-group {
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
}

.input-group label {
  padding-bottom: 10px;
}

.p-panel {
  width: 600px;
}
.p-panel .p-panel-header {
  background-color: #f2f5fa;
  padding: 18px;
  border-bottom: 0;
}

.p-panel .p-panel-header .p-panel-title {
  font-size: 1.5rem;
  font-weight: 900;
}

.p-panel .p-panel-content {
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(242, 245, 250, 1) 45%);
}

.container {
  display: flex;
  justify-content: center;
  padding-top: 100px;
}
</style>
