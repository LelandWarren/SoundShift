<template>
  <v-app>
    <v-container class="d-flex flex-column align-center justify-center">
      <h2>Sound Shift</h2>
      <PitchSlider v-model="pitch" label="Pitch Shift" />
      <v-btn @click="injectScript" color="primary">Enable Audio Processing</v-btn>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { defineComponent, ref, watch } from "vue";
import PitchSlider from "./components/PitchSlider.vue";



const pitch = ref(0);

const injectScript = () => {
  if (typeof chrome !== "undefined" && chrome?.tabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["content.js"],
        });
      }
    });
  } else {
    console.error("Chrome API is not available.");
  }
};

// Watch for pitch changes and send updates to content script
watch(pitch, (newValue) => {
  if (typeof chrome !== "undefined" && chrome?.tabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "UPDATE_PITCH", value: newValue });
      }
    });
  }
});
</script>

<style>
.v-container {
  width: 350px;
  padding: 16px;
}
</style>
