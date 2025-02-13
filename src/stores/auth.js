import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated:
      JSON.parse(localStorage.getItem("isAuthenticated")) || false,
  }),
  actions: {
    login() {
      this.isAuthenticated = true;
      localStorage.setItem(
        "isAuthenticated",
        JSON.stringify(this.isAuthenticated)
      );
    },
    logout() {
      this.isAuthenticated = false;
      localStorage.setItem(
        "isAuthenticated",
        JSON.stringify(this.isAuthenticated)
      );
    },
  },
});
