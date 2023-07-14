<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      location: '',
      dateOfBirth: '',
      license: '',
      imageName: ''
    }
  },
  validations() {
    return {
      firstName: { required },
      lastName: { required },
      location: { required },
      dateOfBirth: { required },
      license: { required }
    }
  },
  methods: {
    onUpload(event: any) {
      console.log(event)
      const file = event.files[0]
      this.imageName = file.name
      const reader = new FileReader()

      reader.onloadend = () => {
        const base64String = reader.result?.toString()

        if (base64String) {
          this.license = base64String
        }
      }

      reader.readAsDataURL(file)
    },
    async onSubmit() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) {
        return
      }
      let form = {
        firstName: this.firstName,
        lastName: this.lastName,
        location: this.location,
        dateOfBirth: this.dateOfBirth,
        license: this.license
      }
      this.$emit('form-submitted', form)
    }
  }
}
</script>

<template>
  <div class="container">
    <PanelComponent header="Bridgit Calculator">
      <form @submit.prevent="onSubmit">
        <div class="input-group">
          <label for="firstName"><b>First Name</b></label>
          <InputText
            id="firstName"
            type="text"
            placeholder="First Name"
            v-model="firstName"
            @blur="v$.firstName.$touch"
            :class="{ 'p-invalid': v$.firstName.$error }"
          />
          <small v-if="v$.firstName.$error" class="p-error" id="text-error">{{
            v$.firstName.$errors[0].$message
          }}</small>
        </div>

        <div class="input-group">
          <label for="lastName"><b>Last Name</b></label>
          <InputText
            id="lastName"
            type="text"
            placeholder="Last Name"
            v-model="lastName"
            @blur="v$.lastName.$touch"
            :class="{ 'p-invalid': v$.lastName.$error }"
          />
          <small v-if="v$.lastName.$error" class="p-error" id="text-error">{{
            v$.lastName.$errors[0].$message
          }}</small>
        </div>

        <div class="input-group">
          <label for="location"><b>Location</b></label>
          <InputText
            id="location"
            type="text"
            placeholder="Location"
            v-model="location"
            @blur="v$.location.$touch"
            :class="{ 'p-invalid': v$.location.$error }"
          />
          <small v-if="v$.location.$error" class="p-error" id="text-error">{{
            v$.location.$errors[0].$message
          }}</small>
        </div>

        <div class="input-group">
          <label for="dateOfBirth"><b>Date of Birth</b></label>
          <InputMask
            id="basic"
            v-model="dateOfBirth"
            mask="9999-99-99"
            placeholder="Date of Birth (yyyy-mm-dd)"
            @blur="v$.dateOfBirth.$touch"
            :class="{ 'p-invalid': v$.dateOfBirth.$error }"
          />
          <small v-if="v$.dateOfBirth.$error" class="p-error" id="text-error">{{
            v$.dateOfBirth.$errors[0].$message
          }}</small>
        </div>

        <div class="input-group">
          <label for="license"><b>Upload License</b></label>
          <FileUpload
            id="license"
            mode="basic"
            v-model="license"
            accept="image/*"
            customUpload
            @uploader="onUpload"
            @blur="v$.license.$touch"
            :class="{ 'p-invalid': v$.license.$error }"
          />
          <small v-if="v$.license.$error" class="p-error" id="text-error"
            >Upload a valid drivers license image</small
          >
          <small v-if="!v$.license.$error && v$.license.$model">'{{ imageName }}' added.</small>
        </div>

        <div class="buttons">
          <ButtonComponent label="Next" icon="pi pi-angle-right" iconPos="right" type="Submit" />
        </div>
      </form>
    </PanelComponent>
  </div>
</template>
