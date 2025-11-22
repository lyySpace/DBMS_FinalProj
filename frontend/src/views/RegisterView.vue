<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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
  // 模擬 API 呼叫
  console.log('Registering User:', formData.value);
  
  // TODO: 這裡呼叫後端 /api/register
  // 成功後，通常會回傳 token，並引導至「第一次登入設定 Profile」
  
  alert('Registration successful! Please complete your personal profile settings.');
  
  // 透過 query 傳遞 role，讓下一個頁面知道要顯示什麼表單
  router.push({ 
    name: 'ProfileSetup', 
    query: { role: formData.value.role, username: formData.value.username } 
  });
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