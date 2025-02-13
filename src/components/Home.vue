<template>
  <div>
    <h1>Welcome Home</h1>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth";
import axios from "../axios";

export default {
  name: "Home",
  setup() {
    const authStore = useAuthStore();

    const handleLogout = async () => {
      try {
        const response = await axios.get("/api/users/logout");
        console.log("Logout successful:", response.data);
        authStore.logout();
        alert("Logout successful!");
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Logout failed. Please try again.");
      }
    };

    return {
      handleLogout,
    };
  },
};
</script>
