<template>
  <div id="app">
    <header class="app-header">
      <img
        src="@/assets/pet-sitter-logo.png"
        alt="Pet Sitter Logo"
        class="logo"
      />
      <h1>Welcome to Pet Sitter</h1>
      <div v-if="isAuthenticated" class="user-info">
        <p>User ID: {{ authStore.user?.userId ?? "N/A" }}</p>
        <p>Email: {{ authStore.user?.email ?? "N/A" }}</p>
        <p>Role: {{ authStore.user?.role ?? "N/A" }}</p>
        <p>LocalStorage: {{ storedUser }}</p>
      </div>
    </header>
    <nav class="navigation">
      <router-link to="/">Home</router-link>
      <router-link :class="{ hidden: isAuthenticated }" to="/signup"
        >Sign Up</router-link
      >
      <router-link :class="{ hidden: isAuthenticated }" to="/login"
        >Login</router-link
      >
      <router-link :class="{ hidden: !isAuthenticated }" to="/profile"
        >Profile</router-link
      >
      <router-link :class="{ hidden: !isAuthenticated }" to="/delete-account"
        >Delete Account</router-link
      >
      <router-link to="/users">User List</router-link>
      <router-link :to="{ name: 'PaymentTest' }">결제테스트</router-link>
      <button v-if="isAuthenticated" @click="handleLogout">Logout</button>
      <router-link :class="{ hidden: !isAuthenticated }" to="/code-management"
        >코드 관리</router-link
      >
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import { computed } from "vue";
import { useAuthStore } from "./stores/auth";
import axios from "./axios"; // Import the configured Axios instance

export default {
  name: "App",
  setup() {
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

    return {
      isAuthenticated: computed(() => authStore.isAuthenticated),
      handleLogout,
      currentUserId,
      authStore,
      storedUser,
    };
  },
};
</script>

<style scoped>
#app {
  font-family: "Arial", sans-serif;
  color: #333;
  text-align: center;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.app-header {
  background-color: #b71c1c;
  padding: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.logo {
  width: 100px;
  height: auto;
  margin-bottom: 10px;
}

.navigation {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.navigation a {
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.navigation a:hover {
  background-color: #ffe5e5;
}

.navigation a.router-link-exact-active {
  color: #d32f2f;
}

.main-content {
  padding: 20px;
}

.hidden {
  display: none;
}

.user-info {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  color: #b71c1c;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
