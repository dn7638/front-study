<template>
  <div id="app">
    <div class="app-layout">
      <nav class="sidebar">
        <div class="sidebar-header">
          <img
            src="@/assets/pet-sitter-logo.png"
            alt="Pet Sitter Logo"
            class="logo"
          />
          <h2>Pet Sitter</h2>
        </div>
        <div class="nav-menu">
          <button class="nav-item" @click="navigateTo('/')">
            <span class="material-icons">home</span>
            <span>Home</span>
          </button>
          <button
            class="nav-item"
            :class="{ hidden: isAuthenticated }"
            @click="navigateTo('/signup')"
          >
            <span class="material-icons">person_add</span>
            <span>Sign Up</span>
          </button>
          <button
            class="nav-item"
            :class="{ hidden: isAuthenticated }"
            @click="navigateTo('/login')"
          >
            <span class="material-icons">login</span>
            <span>Login</span>
          </button>
          <button
            class="nav-item"
            :class="{ hidden: !isAuthenticated }"
            @click="navigateTo('/profile')"
          >
            <span class="material-icons">person</span>
            <span>Profile</span>
          </button>
          <button
            class="nav-item"
            :class="{ hidden: !isAuthenticated }"
            @click="navigateTo('/delete-account')"
          >
            <span class="material-icons">delete</span>
            <span>Delete Account</span>
          </button>
          <button class="nav-item" @click="navigateTo('/users')">
            <span class="material-icons">people</span>
            <span>User List</span>
          </button>
          <button class="nav-item" @click="navigateTo('/payment-test')">
            <span class="material-icons">payment</span>
            <span>결제테스트</span>
          </button>
          <button
            class="nav-item"
            :class="{ hidden: !isAuthenticated }"
            @click="navigateTo('/code-management')"
          >
            <span class="material-icons">code</span>
            <span>코드 관리</span>
          </button>
          <button
            v-if="isAuthenticated"
            class="nav-item logout-button"
            @click="handleLogout"
          >
            <span class="material-icons">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </nav>
      <main class="main-content">
        <div class="content-header">
          <h1>Welcome to Pet Sitter</h1>
          <div v-if="isAuthenticated" class="user-info">
            <p>User ID: {{ authStore.user?.userId ?? "N/A" }}</p>
            <p>Email: {{ authStore.user?.email ?? "N/A" }}</p>
            <p>Role: {{ authStore.user?.role ?? "N/A" }}</p>
          </div>
        </div>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "./stores/auth";
import axios from "./axios"; // Import the configured Axios instance

export default {
  name: "App",
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const handleLogout = async () => {
      try {
        await axios.get("/api/users/logout");
        authStore.logout();
        alert("로그아웃 완료");
      } catch (error) {
        console.error("로그아웃 실패:", error);
        alert("로그아웃 실패. 다시 시도하세요.");
      }
    };

    const currentUserId = computed(() => authStore.user?.userId || "N/A");

    const storedUser = computed(() => {
      try {
        return JSON.parse(localStorage.getItem("user") || "null");
      } catch {
        return "Invalid user data";
      }
    });

    const navigateTo = (path) => {
      router.push(path);
    };

    return {
      isAuthenticated: computed(() => authStore.isAuthenticated),
      handleLogout,
      currentUserId,
      authStore,
      storedUser,
      navigateTo,
    };
  },
};
</script>

<style scoped>
#app {
  font-family: "Arial", sans-serif;
  color: #333;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.app-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: #1a2b3c;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  width: 80px;
  height: auto;
  margin-bottom: 10px;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  width: 100%;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.nav-item:hover {
  background: #2c3e50;
  transform: translateX(5px);
}

.nav-item:active {
  transform: translateX(0);
}

.nav-item span.material-icons {
  font-size: 20px;
}

.logout-button {
  margin-top: auto;
  background: #2c3e50;
}

.logout-button:hover {
  background: #1a2b3c;
}

.main-content {
  flex: 1;
  padding: 30px;
  background: #f8f9fa;
}

.content-header {
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 14px;
}

.hidden {
  display: none;
}

/* 전역 버튼 스타일 */
button {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1a2b3c;
}

button:disabled {
  background-color: #7f8c8d;
  cursor: not-allowed;
}
</style>
