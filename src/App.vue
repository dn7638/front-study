<template>
  <div id="app">
    <header class="app-header">
      <img
        src="@/assets/pet-sitter-logo.png"
        alt="Pet Sitter Logo"
        class="logo"
      />
      <h1>Welcome to Pet Sitter</h1>
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
      <button v-if="isAuthenticated" @click="handleLogout">Logout</button>
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

    return {
      isAuthenticated: computed(() => authStore.isAuthenticated),
      handleLogout,
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
  text-decoration: none;
  color: #b71c1c;
  font-weight: bold;
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
</style>
