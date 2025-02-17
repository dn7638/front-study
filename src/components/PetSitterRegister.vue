<template>
  <div class="register-container">
    <h1>펫시터 등록</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="location">활동 지역</label>
        <input type="text" id="location" v-model="location" required />
      </div>
      <div class="form-group">
        <label for="experience">돌봄 경험</label>
        <textarea id="experience" v-model="experience" required></textarea>
      </div>
      <div class="form-group">
        <label for="profilePhoto">프로필 사진 URL</label>
        <input type="text" id="profilePhoto" v-model="profilePhoto" required />
      </div>
      <div class="form-group">
        <label for="certification">자격증 정보</label>
        <input
          type="text"
          id="certification"
          v-model="certification"
          required
        />
      </div>
      <button type="submit">등록</button>
    </form>
  </div>
</template>

<script>
import axios from "../axios"; // Import the configured Axios instance

export default {
  name: "PetSitterRegister",
  data() {
    return {
      location: "",
      experience: "",
      profilePhoto: "",
      certification: "",
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await axios.post("/api/petsitters", {
          location: this.location,
          experience: this.experience,
          profilePhoto: this.profilePhoto,
          certification: this.certification,
        });
        console.log("펫시터 등록 성공:", response.data);
        alert("펫시터 등록이 완료되었습니다!");
      } catch (error) {
        console.error("펫시터 등록 실패:", error);
        alert("펫시터 등록에 실패했습니다. 입력 정보를 확인하세요.");
      }
    },
  },
};
</script>

<style scoped>
.register-container {
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

input,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #b71c1c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}
</style>
