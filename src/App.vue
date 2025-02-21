<template>
  <v-app>
    <v-container class="popup-container">
      <h2>Sound Shift</h2>
      <PitchSlider v-model="pitch" label="Pitch Shift" />
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PitchSlider from "./components/PitchSlider.vue";

const pitch = ref(0);
</script>

<style scoped>
.popup-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
</style>
