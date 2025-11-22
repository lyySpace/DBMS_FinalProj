<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 從 URL query 獲取角色 (實際專案建議從 Pinia/Vuex Store 獲取)
const userRole = ref(route.query.role || 'student');

// 模擬系所列表 (用於 student 的 dropdown)
const departments = ref([
  { id: 'uuid-1', name: '資工系' },
  { id: 'uuid-2', name: '企管系' },
  { id: 'uuid-3', name: '設計系' },
]);

// Profile Data (包含所有可能的欄位，提交時再過濾)
const profileData = ref({
  // Student fields
  student_id: '',
  department_id: '',
  entry_year: new Date().getFullYear(),
  grade: 1,
  
  // Department fields
  department_name: '',
  
  // Company fields
  company_name: '',
  industry: ''
});

// 根據角色動態顯示標題
const titleMap = {
  student: 'Establish student files',
  department: 'Establish departmental information',
  company: 'Establish enterprise information'
};

const pageTitle = computed(() => titleMap[userRole.value]);

const handleSubmit = async () => {
  // 建構要傳給後端的 payload
  let payload = {};

  if (userRole.value === 'student') {
    payload = {
      student_id: profileData.value.student_id,
      department_id: profileData.value.department_id,
      entry_year: profileData.value.entry_year,
      grade: profileData.value.grade
    };
  } else if (userRole.value === 'department') {
    payload = {
      department_name: profileData.value.department_name
    };
  } else if (userRole.value === 'company') {
    payload = {
      company_name: profileData.value.company_name,
      industry: profileData.value.industry
    };
  }

  console.log(`Submitting ${userRole.value} profile:`, payload);
  
  // TODO: Call API POST /api/profile/{role}
  
  alert('Personal profile complete! You are about to be redirected to the homepage...');
  router.push('/'); // 進入主畫面
};
</script>

<template>
  <div class="container">
    <h2>{{ pageTitle }}</h2>
    <p style="text-align: center; color: #9FB1BC; font-size: 0.9rem; margin-bottom: 20px;">
      First time logging in, please complete your detailed information.
    </p>

    <form @submit.prevent="handleSubmit">
      
      <template v-if="userRole === 'student'">
        <div class="form-group">
          <label>Student ID</label>
          <input v-model="profileData.student_id" required type="text" placeholder="A12345678" />
        </div>

        <div class="form-group">
          <label>Department</label>
          <select v-model="profileData.department_id" required>
            <option disabled value="">Choose Department</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">
              {{ dept.name }}
            </option>
          </select>
        </div>

        <div class="form-group" style="display: flex; gap: 10px;">
          <div style="flex: 1;">
            <label>Entry Year</label>
            <input v-model="profileData.entry_year" required type="number" />
          </div>
          <div style="flex: 1;">
            <label>Grade</label>
            <input v-model="profileData.grade" required type="number" min="1" max="6" />
          </div>
        </div>
      </template>

      <template v-if="userRole === 'department'">
        <div class="form-group">
          <label>Department Name</label>
          <input v-model="profileData.department_name" required type="text" placeholder="例如：資訊工程學系" />
        </div>
      </template>

      <template v-if="userRole === 'company'">
        <div class="form-group">
          <label>Company Name</label>
          <input v-model="profileData.company_name" required type="text" />
        </div>
        <div class="form-group">
          <label>Industry</label>
          <input v-model="profileData.industry" required type="text" placeholder="例如：軟體服務業" />
        </div>
      </template>

      <button type="submit" class="btn-primary">Finished settings</button>
    </form>
  </div>
</template>