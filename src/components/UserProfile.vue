<template>
  <div class="profile-container">
    <h1>회원정보 상세 페이지</h1>
    <form @submit.prevent="updateProfile" class="profile-form">
      <div v-for="(value, key) in userProfile" :key="key" class="form-group">
        <label :for="key">{{ key }}</label>
        <input
          :id="key"
          v-model="userProfile[key]"
          :placeholder="`Enter your ${key}`"
          class="form-input"
        />
      </div>
      <button type="submit" class="update-button">Update Profile</button>
    </form>
  </div>
</template>

<script>
import axios from "../axios"; // Import the configured Axios instance

export default {
  name: "UserProfile",
  data() {
    return {
      userProfile: {
        이메일: "",
        이름: "",
        별명: "",
        전화번호: "",
        국적: "",
        직업: "",
      },
    };
  },
  created() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const response = await axios.get("/user/profile"); // Adjust the endpoint as needed
        this.userProfile = response.data;
      } catch (error) {
        console.error(
          "Failed to fetch profile from server, using dummy data:",
          error
        );
        this.userProfile = {
          이메일: "user@example.com",
          이름: "홍길동",
          별명: "길동이",
          전화번호: "010-1234-5678",
          국적: "대한민국",
          직업: "개발자",
        };
      }
    },
    async updateProfile() {
      try {
        await axios.put("/user/profile", this.userProfile); // Adjust the endpoint as needed
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Failed to update profile:", error);
        alert("Failed to update profile.");
      }
    },
  },
};
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-family: "Arial", sans-serif;
}

.profile-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #42b983;
  outline: none;
}

.update-button {
  padding: 12px;
  background-color: #b71c1c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;
}

.update-button:hover {
  background-color: #d32f2f;
}
</style>
