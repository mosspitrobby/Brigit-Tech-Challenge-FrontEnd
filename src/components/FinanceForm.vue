<script lang="ts">
import { useStepStore } from '@/stores/step'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, between } from '@vuelidate/validators'
import { toRaw } from 'vue'

export default {
  setup() {
    return {
      v$: useVuelidate(),
      steps: useStepStore()
    }
  },
  data() {
    return {
      salaryPerQuarter: null,
      totalCreditCardDebt: null,
      currentHomeLoanDebt: null,
      totalSavings: null,
      stock: [
        {
          name: null,
          quantity: null
        }
      ]
    }
  },
  validations() {
    return {
      salaryPerQuarter: { required },
      totalCreditCardDebt: { required },
      currentHomeLoanDebt: { required },
      totalSavings: { required },
      stock: [
        {
          name: { maxLength: maxLength(50) },
          quantity: { between: between(1, 1000) }
        }
      ]
    }
  },
  methods: {
    async onSubmit() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) {
        return
      }

      let finances = {
        salaryPerQuarter: this.salaryPerQuarter,
        totalCreditCardDebt: this.totalCreditCardDebt,
        currentHomeLoanDebt: this.currentHomeLoanDebt,
        totalSavings: this.totalSavings,
        stock: [...toRaw(this.stock)]
      }
      this.$emit('form-submitted', finances)
    },
    goBack() {
      this.steps.decrement()
    }
  }
}
</script>

<template>
  <div class="container">
    <PanelComponent header="Bridgit Calculator">
      <form @submit.prevent="onSubmit">
        <div class="input-group">
          <label for="salaryPerQuarter"><b>Salary Paid Every Quarter</b></label>
          <InputNumber
            v-model.number="salaryPerQuarter"
            inputId="salaryPerQuarter"
            mode="currency"
            currency="AUD"
            locale="en-AU"
            placeholder="$100,000.00"
            :minFractionDigits="2"
            :maxFractionDigits="5"
            @blur="v$.salaryPerQuarter.$touch"
            :class="{ 'p-invalid': v$.salaryPerQuarter.$error }"
          />
          <small v-if="v$.salaryPerQuarter.$error" class="p-error" id="text-error">{{
            v$.salaryPerQuarter.$errors[0].$message
          }}</small>
        </div>

        <div class="input-group">
          <label for="totalCreditCardDebt"><b>Total Credit Card Debt</b></label>
          <InputNumber
            v-model.number="totalCreditCardDebt"
            inputId="totalCreditCardDebt"
            mode="currency"
            currency="AUD"
            locale="en-AU"
            placeholder="$1,000.00"
            :minFractionDigits="2"
            :maxFractionDigits="5"
            @blur="v$.totalCreditCardDebt.$touch"
            :class="{ 'p-invalid': v$.totalCreditCardDebt.$error }"
          />
          <small v-if="v$.totalCreditCardDebt.$error" class="p-error" id="text-error">{{
            v$.totalCreditCardDebt.$errors[0].$message
          }}</small>
        </div>

        <div class="input-group">
          <label for="currentHomeLoanDebt"><b>Current Home Loan Debt</b></label>
          <InputNumber
            v-model.number="currentHomeLoanDebt"
            inputId="currentHomeLoanDebt"
            mode="currency"
            currency="AUD"
            locale="en-AU"
            placeholder="$100,000.00"
            :minFractionDigits="2"
            :maxFractionDigits="5"
            @blur="v$.currentHomeLoanDebt.$touch"
            :class="{ 'p-invalid': v$.currentHomeLoanDebt.$error }"
          />
          <small v-if="v$.currentHomeLoanDebt.$error" class="p-error" id="text-error">{{
            v$.currentHomeLoanDebt.$errors[0].$message
          }}</small>
        </div>

        <div class="input-group">
          <label for="totalSavings"><b>Total Savings</b></label>
          <InputNumber
            v-model.number="totalSavings"
            inputId="totalSavings"
            mode="currency"
            currency="AUD"
            locale="en-AU"
            placeholder="$100,000.00"
            :minFractionDigits="2"
            :maxFractionDigits="5"
            @blur="v$.totalSavings.$touch"
            :class="{ 'p-invalid': v$.totalSavings.$error }"
          />
          <small v-if="v$.totalSavings.$error" class="p-error" id="text-error">{{
            v$.totalSavings.$errors[0].$message
          }}</small>
        </div>

        <div class="input-group">
          <label for="stockName"><b>One Stock You Own</b></label>
          <InputText
            id="stockName"
            type="text"
            placeholder="TSLA"
            v-model="stock[0].name"
            @blur="v$.stock[0].name.$touch"
            :class="{ 'p-invalid': v$.stock[0].name.$error }"
          />
          <small v-if="v$.stock[0].name.$error" class="p-error" id="text-error">{{
            v$.stock[0].name.$errors[0].$message
          }}</small>
        </div>

        <div class="input-group" v-if="stock[0].name">
          <label for="stockAmount"
            ><b>Total Number Of {{ stock[0].name }} Stocks You Own</b></label
          >
          <InputNumber
            v-model.number="stock[0].quantity"
            inputId="stockAmount"
            placeholder="Total Number Of TSLA Stocks You Own"
            @blur="v$.stock[0].quantity.$touch"
            :class="{ 'p-invalid': v$.stock[0].quantity.$error }"
          />
          <small v-if="v$.stock[0].quantity.$error" class="p-error" id="text-error">{{
            v$.stock[0].quantity.$errors[0].$message
          }}</small>
        </div>

        <div class="buttons">
          <ButtonComponent label="Next" icon="pi pi-angle-right" iconPos="right" type="Submit" />
          <ButtonComponent label="Back" severity="secondary" @click="goBack" />
        </div>
      </form>
    </PanelComponent>
  </div>
</template>
