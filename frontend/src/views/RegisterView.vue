<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const API_URL = import.meta.env.VITE_API_URL;

// 對應 DB: user table
const formData = ref({
  real_name: '',
  email: '',
  username: '',
  password: '',
  nickname: '',
  role: 'student' // 預設角色
});


const handleRegister = async () => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.value)
    });

    if (!response.ok) {
      const err = await response.json();
      alert(err.message || 'Registration failed');
      return;
    }

    const data = await response.json();

    // 存 token
    localStorage.setItem('token', data.access_token);

    alert('Registration successful! Please complete your personal profile.');

    router.push({
      name: 'ProfileSetup',
      query: {
        role: data.user.role,
        username: data.user.username
      }
    });
  } catch (err) {
    console.error(err);
    alert('Network error');
  }
};


</script>

<template>
  <div class="container">
    <h2>Create an account</h2>
    <form @submit.prevent="handleRegister">
      
      <div class="form-group">
        <label>Real Name</label>
        <input v-model="formData.real_name" required type="text" placeholder="xxx" />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="formData.email" required type="email" placeholder="xxxx@ntu.edu.tw" />
      </div>

      <div class="form-group">
        <label>Username</label>
        <input v-model="formData.username" required type="text" />
      </div>

      <div class="form-group">
        <label>Nickname</label>
        <input v-model="formData.nickname" required type="text" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="formData.password" required type="password" />
      </div>

      <div class="form-group">
        <label>Role</label>
        <select v-model="formData.role">
          <option value="student">Student</option>
          <option value="department">Department</option>
          <option value="company">Company</option>
        </select>
      </div>

      <button type="submit" class="btn-primary">Register</button>
    </form>

    <div class="link-text">
      Already have an account ? <router-link to="/login">Log in now !</router-link>
    </div>
  </div>
</template>