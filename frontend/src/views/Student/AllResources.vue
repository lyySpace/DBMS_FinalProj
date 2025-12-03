<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'; // 引入 router
import apiClient from '@/api/axios';
import type { Resource } from '@/types';

const router = useRouter(); // 初始化 router
const isLoading = ref(false);
const allResources = ref<Resource[]>([]);
const activeTab = ref('All');

// 篩選邏輯
const filteredResources = computed(() => {
  if (activeTab.value === 'All') return allResources.value;
  return allResources.value.filter(r => r.resource_type === activeTab.value);
});

onMounted(async () => {
  isLoading.value = true;
  try {
    // ----------------------------------------------------------------
    // TO DO: [GET] /api/student/resources (取得所有資源)
    // ----------------------------------------------------------------
    // const res = await apiClient.get('/student/resources');
    // allResources.value = res.data;

    // --- Mock Data ---
    await new Promise(r => setTimeout(r, 600)); // 模擬延遲
    allResources.value = [
      { 
        resource_id: 'r1', title: 'Software Engineer Intern', resource_type: 'Internship', 
        quota: 5, description: 'Python/Vue.js required.', deadline: '2025-05-30', status: 'Available', 
        supplier_name: 'TSMC', match_score: 98
      },
      { 
        resource_id: 'r2', title: 'Lab Research Assistant', resource_type: 'Lab', 
        quota: 2, description: 'Quantum Computing Lab.', deadline: '2025-06-01', status: 'Available',
        supplier_name: 'Prof. Chang', match_score: 88
      },
      { 
        resource_id: 'r3', title: 'Merit Scholarship', resource_type: 'Scholarship', 
        quota: 10, description: 'For top 5% students.', deadline: '2025-04-15', status: 'Available',
        supplier_name: 'Academic Office', match_score: 45
      },
      { 
        resource_id: 'r4', title: 'UI/UX Designer Intern', resource_type: 'Internship', 
        quota: 1, description: 'Figma skills needed.', deadline: '2025-05-20', status: 'Available',
        supplier_name: 'Line Taiwan', match_score: 70
      },
      { 
        resource_id: 'r5', title: 'Exchange Program - Japan', resource_type: 'Others', 
        quota: 3, description: 'Semester exchange to Tokyo Univ.', deadline: '2025-03-01', status: 'Available',
        supplier_name: 'Intl. Office', match_score: 30
      }
    ];
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
});

// 返回上一頁功能
const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="dashboard-container">
    
    <div class="header-section">
      <div class="header-left">
        <button class="btn-back" @click="goBack">⮐ Back</button>
        <h1>Explore Resources</h1>
      </div>
      <div class="filter-tabs">
        <button 
          v-for="tab in ['All', 'Internship', 'Scholarship', 'Lab', 'Others']" 
          :key="tab"
          :class="['tab', { active: activeTab === tab }]"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="loading-state">Loading resources...</div>
    
    <div v-else class="resource-grid">
      <div v-for="res in filteredResources" :key="res.resource_id" class="resource-card">
        <div class="card-top">
          <span class="tag-type">{{ res.resource_type }}</span>
          <span v-if="res.match_score && res.match_score > 80" class="tag-match">
            {{ res.match_score }}% Match
          </span>
        </div>

        <h3 class="res-title">{{ res.title }}</h3>
        <p class="res-supplier">🏢 {{ res.supplier_name }}</p>
        <p class="res-desc">{{ res.description }}</p>
        
        <div class="res-footer">
          <span class="deadline">📅 {{ res.deadline }}</span>
          <button class="btn-apply">Apply</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import '@/assets/main.css';

/* 繼承並微調樣式 */
.dashboard-container { padding: 40px 20px; max-width: 1200px; margin: 0 auto; }

.header-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.header-left { display: flex; align-items: center; gap: 15px; }
.header-left h1 { margin: 0; font-size: 1.8rem; color: var(--accent-color); }

.btn-back {
  background: transparent; border: 1px solid var(--secondary-color);
  color: var(--secondary-color); padding: 5px 12px;
  border-radius: 8px; cursor: pointer; transition: all 0.2s;
}
.btn-back:hover { background: var(--input-bg); }

/* Tabs */
.filter-tabs { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 5px; }
.tab {
  background: #fff; border: 1px solid #ddd; padding: 8px 16px;
  border-radius: 20px; cursor: pointer; color: var(--text-color);
  transition: all 0.2s; white-space: nowrap;
}
.tab.active {
  background: var(--primary-color); color: white; border-color: var(--primary-color);
}

/* Grid & Card (複用 Dashboard 樣式但做一點微調) */
.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(680px, 1fr));
  gap: 20px;
}

.resource-card {
  background: #fff; padding: 20px; border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  display: flex; flex-direction: column;
  transition: transform 0.2s;
}
.resource-card:hover { transform: translateY(-3px); }

.card-top { display: flex; justify-content: space-between; margin-bottom: 10px; }
.tag-type { background: #EBEBE8; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem; color: var(--secondary-color); }
.tag-match { color: var(--primary-color); font-weight: bold; font-size: 0.8rem; }

.res-title { margin: 0 0 5px 0; font-size: 1.1rem; color: var(--text-color); }
.res-supplier { color: #888; font-size: 0.9rem; margin-bottom: 10px; }
.res-desc { color: #666; font-size: 0.9rem; margin-bottom: 20px; flex: 1; }

.res-footer {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 15px; border-top: 1px solid #f5f5f5;
}
.deadline { font-size: 0.85rem; color: #999; }
.btn-apply {
  background: var(--primary-color); color: white; border: none;
  padding: 6px 16px; border-radius: 6px; cursor: pointer;
}
.btn-apply:hover { opacity: 0.9; }

.loading-state { text-align: center; color: #999; padding: 50px; }
</style>