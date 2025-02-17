import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    user: JSON.parse(localStorage.getItem("user")) || {
      userId: null,
      email: null,
      name: null,
      role: "user",
    },
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
      this.isAuthenticated = false;
      this.user = {
        userId: null,
        email: null,
        name: null,
        role: "user",
      };
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    },
  },
});
