<template>
  <div class="delete-account-container">
    <h1>회원 탈퇴</h1>
    <p>정말로 회원 탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
    <form @submit.prevent="handleDeleteAccount">
      <button type="submit" class="delete-button" :disabled="isLoading">
        {{ isLoading ? "처리 중..." : "회원 탈퇴" }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from "../axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

export default {
  name: "DeleteAccount",
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    return { router, authStore };
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async handleDeleteAccount() {
      if (!confirm("정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
        return;
      }

      const userData = localStorage.getItem("user");
      if (!userData) {
        alert("로그인 정보가 없습니다.");
        this.router.push("/login");
        return;
      }

      const userId = JSON.parse(userData).userId;
      console.log(userId);

      this.isLoading = true;

      try {
        const response = await axios.delete(`/api/users/${userId}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          alert("회원 탈퇴가 완료되었습니다.");
          localStorage.removeItem("user");
          localStorage.removeItem("isAuthenticated");
          if (this.authStore) {
            this.authStore.logout();
          }
          this.router.push("/");
          this.$forceUpdate();
        }
      } catch (error) {
        console.error("회원 탈퇴 실패:", error);
        const errorMessage =
          error.response?.data?.message ||
          "회원 탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요.";
        alert(errorMessage);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.delete-account-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f8d7da;
  color: #721c24;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

p {
  text-align: center;
  margin-bottom: 20px;
}

.delete-button {
  width: 100%;
  padding: 10px;
  background-color: #b71c1c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.delete-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
