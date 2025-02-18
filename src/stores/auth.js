import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
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
