<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackbar">
      {{ text }}
      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="close"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const snackbar = ref(true);
const text = ref("Xóa thành công");
const emit = defineEmits("snackbarStatus");

const close = () => {
  emit("snackbarStatus", true);
};
</script>
