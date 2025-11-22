<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const credentials = ref({
  username: '', // 可以是 username 或 email
  password: ''
});

const handleLogin = async () => {
  // 模擬 API 呼叫
  console.log('Logging in:', credentials.value);

  // TODO: 這裡呼叫後端 /api/login
  // 後端應該回傳 user 物件，包含是否已完成 profile 設定的 flag
  
  const mockResponse = {
    success: true,
    user: {
      role: 'student',
      isProfileCompleted: false // 假設第一次登入尚未填寫
    }
  };

  if (mockResponse.success) {
    if (!mockResponse.user.isProfileCompleted) {
      // 如果沒填過 Profile，導向設定頁
      router.push({ 
        name: 'ProfileSetup', 
        query: { role: mockResponse.user.role } 
      });
    } else {
      // 已完成，導向首頁
      router.push('/dashboard');
    }
  }
};
</script>

<template>
  <div class="container">
    <h2>Welcome</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Account / Email</label>
        <input v-model="credentials.username" required type="text" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="credentials.password" required type="password" />
      </div>

      <button type="submit" class="btn-primary">Login</button>
    </form>

    <div class="link-text">
      Didn't have account ? <router-link to="/register">Register here !</router-link>
    </div>
  </div>
</template>