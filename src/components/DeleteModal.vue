<template>
  <div>
    <v-dialog v-model="dialog" max-width="400" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn class="delete" v-bind="activatorProps"> Delete </v-btn>
      </template>

      <v-card text="Ban có chắc muốn xóa tài khoản này?" title="Xác nhận">
        <template v-slot:actions>
          <v-btn @click="cancel"> Cancel</v-btn>

          <v-btn @click="del"> Delete </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["message"]);

const dialog = ref(false);

const cancel = () => {
  dialog.value = false;
};

const del = () => {
  emit("message", true);
  dialog.value = false;
};
</script>

<style scoped>
.delete {
  background-color: red;
  color: white;
  border-radius: 4px;
}

.delete:hover {
  background-color: darkred;
}
</style>
