<template>
  <div class="main">
    <div v-if="add">
      <Add
        :editingUser="editingUser"
        @close="closeAdd"
        @user-added="handleUserAdded"
        @user-updated="handleUserUpdated"
      />
    </div>
    <div>
      <div class="top">
        <h3>Manage Users</h3>
        <div class="ip">
          <input v-model="searchTerm" type="text" placeholder="Search users" />
          <button class="add" @click="addForm">Add new user</button>
        </div>
      </div>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.dateOfBirth }}</td>
            <td>{{ user.email }}</td>
            <td class="opt">
              <button class="edit" @click="editUser(user)">Edit</button>
              <DeleteModal @message="del(user)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="snackbarVisible">
      <Snackbar @snackbarStatus="closeSnackbar" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DeleteModal from "../components/DeleteModal.vue";
import Snackbar from "@/components/Snackbar.vue";
import Add from "@/components/Add.vue";

const editingUser = ref({
  id: null,
  name: "",
  gender: "",
  dateOfBirth: "",
  email: "",
});

const users = ref([]);
const snackbarVisible = ref(false);
const add = ref(false);
const searchTerm = ref("");

const getDataFromLocal = () => {
  const data = localStorage.getItem("usersList");
  if (data) {
    users.value = JSON.parse(data);
  }
};

const saveToLocal = () => {
  localStorage.setItem("usersList", JSON.stringify(users.value));
};

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.email.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });
});
const del = (user) => {
  const index = users.value.findIndex((u) => u.id === user.id);
  if (index !== -1) {
    users.value.splice(index, 1);
    saveToLocal();
    openSnackBar();
  }
};

const openSnackBar = () => {
  snackbarVisible.value = true;
};

const closeSnackbar = () => {
  snackbarVisible.value = false;
};

const closeAdd = () => {
  add.value = false;
  editingUser.value = {
    id: null,
    name: "",
    gender: "",
    dateOfBirth: "",
    email: "",
  };
};

const addForm = () => {
  add.value = true;
};

const editUser = (user) => {
  editingUser.value = { ...user };
  add.value = true;
};

const handleUserAdded = (newUser) => {
  users.value.push(newUser);
  saveToLocal();
  closeAdd();
};

const handleUserUpdated = (updatedUser) => {
  const index = users.value.findIndex((user) => user.id === updatedUser.id);
  if (index !== -1) {
    users.value[index] = updatedUser;
    saveToLocal();
    closeAdd();
  }
};

onMounted(() => {
  getDataFromLocal();
});
</script>

<style scoped>
.opt {
  display: flex;
  gap: 20px;
}
.main {
  width: 100%;
}
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table,
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
.ip {
  height: 50px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}
input {
  border: 1px solid;
}
th {
  background-color: #f2f2f2;
}

td {
  text-align: center;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit {
  background-color: orange;
  color: white;
}

.add {
  height: 50px;
  background-color: blue;
  color: white;
  padding: 10px 15px;
  margin-top: 10px;
  border-radius: 4px;
}
</style>
