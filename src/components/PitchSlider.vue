<template>
    <div class="pitch-slider">
      <h3>{{ label }}</h3>
      <v-slider
        v-model="internalValue"
        :min="min"
        :max="max"
        :step="step"
        thumb-label="always"
        show-ticks="always"
        hide-details
      ></v-slider>
      <v-label>{{ label }}: {{ internalValue }} {{ unit }}</v-label>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, ref, watch } from "vue";
  import { VSlider, VLabel } from "vuetify/components"; // Explicitly import components
  
  const props = defineProps({
    modelValue: { type: Number, required: true },
    label: { type: String, default: "Pitch Shift" },
    min: { type: Number, default: -24 },
    max: { type: Number, default: 24 },
    step: { type: Number, default: 1 },
    unit: { type: String, default: "semitones" }
  });
  
  const emit = defineEmits(["update:modelValue"]);
  const internalValue = ref(props.modelValue);
  
  watch(() => props.modelValue, (newValue) => {
    internalValue.value = newValue;
  });
  
  watch(internalValue, (newValue) => {
    emit("update:modelValue", newValue);
  });
  </script>
  
  <style scoped>
  .pitch-slider {
    width: 100%;
    text-align: center;
  }
  </style>
  