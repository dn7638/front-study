<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <button @click="testLogin">테스트 로그인 (개발용)</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import axios from "../axios";

export default {
  name: "UserLogin",
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const email = ref("");
    const password = ref("");

    const handleLogin = async () => {
      try {
        const response = await axios.post("/api/users/login", {
          email: email.value,
          password: password.value,
        });

        console.log("로그인 응답 데이터:", response.data);

        if (response.data.userId) {
          authStore.login({
            userId: response.data.userId,
            email: response.data.email,
          });
          router.push("/");
        } else {
          throw new Error("Invalid user data in response");
        }
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Login failed");
      }
    };

    const testLogin = () => {
      authStore.login({
        userId: 123,
        email: "test@example.com",
        name: "테스트사용자",
      });
      router.push("/");
    };

    return {
      email,
      password,
      handleLogin,
      testLogin,
    };
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #1a2b3c;
}
</style>
