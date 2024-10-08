<template>
  <div class="all">
    <div class="form-container">
      <h2 class="form-header">
        {{ editingUser.id ? "Edit User" : "New User" }}
      </h2>
      <form @submit.prevent="save" :key="editingUser.id || 'new-user'">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            v-model="user.name"
            type="text"
            id="name"
            class="form-control"
            placeholder="Enter name"
            required
          />
          <span v-if="error.name" class="error">{{ error.name }}</span>
        </div>

        <div class="form-group">
          <label>Gender</label>
          <div class="gender-options">
            <label v-for="option in ['Male', 'Female', 'Other']" :key="option">
              <input
                v-model="user.gender"
                type="radio"
                name="gender"
                :value="option"
              />
              {{ option }}
            </label>
          </div>
          <span v-if="error.gender" class="error">{{ error.gender }}</span>
        </div>

        <div class="form-group">
          <label for="dateOfBirth">Date of Birth</label>
          <input
            v-model="user.dateOfBirth"
            type="date"
            id="dateOfBirth"
            class="form-control"
            required
          />
          <span v-if="error.dateOfBirth" class="error">{{
            error.dateOfBirth
          }}</span>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="user.email"
            type="email"
            id="email"
            class="form-control"
            placeholder="Enter email"
            required
          />
          <span v-if="error.email" class="error">{{ error.email }}</span>
        </div>

        <div class="form-buttons">
          <button @click="close" type="button" class="btn btn-close">
            Close
          </button>
          <button type="submit" class="btn btn-save">
            {{ editingUser.id ? "Update" : "Save" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";

const props = defineProps(["editingUser"]);
const emit = defineEmits(["close", "user-added", "user-updated"]);

const usersList = reactive([]);

const user = reactive({
  id: null,
  name: "",
  gender: "",
  dateOfBirth: "",
  email: "",
});

const error = reactive({
  name: "",
  gender: "",
  dateOfBirth: "",
  email: "",
});

const getDataFromLocal = () => {
  const data = localStorage.getItem("usersList");
  if (data) {
    usersList.splice(0, usersList.length, ...JSON.parse(data));
  }
};

const saveToLocal = () => {
  localStorage.setItem("usersList", JSON.stringify(usersList));
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(user.email);
};

const validateDateOfBirth = () => {
  const today = new Date().toISOString().split("T")[0];
  return user.dateOfBirth <= today;
};

const validate = () => {
  let isValid = true;

  if (!user.name) {
    error.name = "Name is required.";
    isValid = false;
  } else {
    error.name = "";
  }

  if (!user.gender) {
    error.gender = "Please select a gender.";
    isValid = false;
  } else {
    error.gender = "";
  }

  if (!user.dateOfBirth) {
    error.dateOfBirth = "Date of Birth is required.";
    isValid = false;
  } else if (!validateDateOfBirth()) {
    error.dateOfBirth = "Date of Birth cannot be in the future.";
    isValid = false;
  } else {
    error.dateOfBirth = "";
  }

  if (!user.email) {
    error.email = "Email is required.";
    isValid = false;
  } else if (!validateEmail()) {
    error.email = "Invalid email format.";
    isValid = false;
  } else {
    error.email = "";
  }

  return isValid;
};

const save = () => {
  if (validate()) {
    if (user.id) {
      const index = usersList.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        usersList[index] = { ...user };
        emit("user-updated", { ...user });
      }
    } else {
      const newUser = { ...user, id: Date.now() };
      usersList.push(newUser);
      emit("user-added", newUser);
    }
    saveToLocal();
    close();
  }
};

const close = () => {
  emit("close");
};

watch(
  () => props.editingUser,
  (newValue) => {
    if (newValue) {
      Object.assign(user, newValue);
      error.name = "";
      error.gender = "";
      error.dateOfBirth = "";
      error.email = "";
    } else {
      Object.assign(user, {
        id: null,
        name: "",
        gender: "",
        dateOfBirth: "",
        email: "",
      });
      error.name = "";
      error.gender = "";
      error.dateOfBirth = "";
      error.email = "";
    }
  },
  { immediate: true }
);

onMounted(() => {
  getDataFromLocal();
});
</script>

<style scoped>
.all {
  background-color: rgba(81, 85, 67, 0.123);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.form-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 0 auto;
}

.form-header {
  font-size: 20px;
  margin-bottom: 15px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.gender-options {
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
}

.gender-options label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-save {
  background-color: #007bff;
  color: white;
  margin-left: 10px;
}

.btn-close {
  background-color: #6c757d;
  color: white;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
