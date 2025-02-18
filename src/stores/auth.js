import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    async initialize() {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          this.user = JSON.parse(userData);
          this.isAuthenticated = true;
        }
      } catch (error) {
        this.logout();
      }
    },
    login(rawUserData) {
      this.user = {
        userId: Number(rawUserData.userId),
        email: String(rawUserData.email),
        name: rawUserData.name || "Unknown",
        role: rawUserData.role || "user",
      };
      this.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("isAuthenticated", "true");
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    },
  },
});
