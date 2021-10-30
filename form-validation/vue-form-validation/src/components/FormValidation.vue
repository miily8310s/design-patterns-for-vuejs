<template>
  <div class="form-wrapper">
    <h3>Patient Data</h3>
    <form @submit.prevent="submit">
      <div class="field">
        <div
          v-if="!validatedForm.nameFormResult.valid"
          class="error"
          role="error"
        >
          {{ validatedForm.nameFormResult.message }}
        </div>
        <label for="name">Name</label>
        <input id="name" name="name" role="name" v-model="form.name" />
      </div>
      <div class="field">
        <div
          v-if="!validatedForm.weightFormResult.valid"
          class="error"
          role="error"
        >
          {{ validatedForm.weightFormResult.message }}
        </div>
        <label for="weight">Weight</label>
        <input
          id="weight"
          role="weight"
          name="weight"
          v-model.number="form.weight.value"
        />
        <select
          id="weight-units"
          role="weight-units"
          v-model="form.weight.units"
        >
          <option value="kg">kg</option>
          <option value="lb">lb</option>
        </select>
      </div>
      <div class="field">
        <button role="submit" :disabled="!valid">Submit</button>
      </div>
    </form>
    <div>
      <pre>
        Patient Data
        {{ form }}
        </pre
      >

      <pre>
        Form State
        {{ validatedForm }}
        </pre
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { getPatientFormResult, isFormValid } from "../../../form";

export default defineComponent({
  emits: ["submit"],
  setup(_props, { emit }) {
    const form = reactive({
      name: "",
      weight: {
        value: "",
        units: "kg",
      },
    });
    const submit = () => {
      emit("submit", { patient: form });
    };
    const validatedForm = computed(() => getPatientFormResult(form));
    const valid = computed(() => isFormValid(validatedForm.value));
    return { form, submit, validatedForm, valid };
  },
});
</script>
