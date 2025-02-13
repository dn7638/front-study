<template>
  <div class="signup-container">
    <h1>회원가입</h1>
    <form @submit.prevent="handleSignUp">
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="email" required />
        <span v-if="email && !isEmailValid" class="error"
          >유효한 이메일 주소를 입력하세요.</span
        >
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" required />
        <span v-if="password && !isPasswordValid" class="error"
          >비밀번호는 특수문자 1개 이상, 영문 숫자 혼합이어야 합니다.</span
        >
      </div>
      <div class="form-group">
        <label for="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />
        <span v-if="confirmPassword && !isPasswordMatch" class="error"
          >비밀번호가 일치하지 않습니다.</span
        >
      </div>
      <div class="form-group">
        <label for="name">이름</label>
        <input type="text" id="name" v-model="name" maxlength="10" required />
      </div>
      <div class="form-group">
        <label for="nickname">별명</label>
        <input
          type="text"
          id="nickname"
          v-model="nickname"
          maxlength="10"
          required
        />
      </div>
      <div class="form-group">
        <label for="phone">전화번호</label>
        <input
          type="tel"
          id="phone"
          v-model="phone"
          @input="formatPhone"
          required
        />
        <span v-if="phone && !isPhoneValid" class="error"
          >전화번호 형식이 올바르지 않습니다. (예: 010-0000-0000)</span
        >
      </div>
      <div class="form-group">
        <label for="nationality">국적</label>
        <input
          type="text"
          id="nationality"
          v-model="nationality"
          maxlength="10"
          required
        />
      </div>
      <div class="form-group">
        <label for="occupation">직업</label>
        <input
          type="text"
          id="occupation"
          v-model="occupation"
          maxlength="10"
          required
        />
      </div>
      <button type="submit">회원가입</button>
      <button type="button" @click="sendEmailVerification">이메일 인증</button>
    </form>
  </div>
</template>

<script>
import axios from "../axios"; // Import the configured Axios instance

export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      nickname: "",
      phone: "",
      nationality: "",
      occupation: "",
    };
  },
  computed: {
    isEmailValid() {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(this.email);
    },
    isPasswordValid() {
      const re =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      return re.test(this.password);
    },
    isPasswordMatch() {
      return this.password === this.confirmPassword;
    },
    isPhoneValid() {
      const re = /^010-\d{4}-\d{4}$/;
      return re.test(this.phone);
    },
  },
  methods: {
    async handleSignUp() {
      if (!this.isEmailValid) {
        alert("유효한 이메일 주소를 입력하세요.");
        return;
      }
      if (!this.isPasswordValid) {
        alert("비밀번호는 특수문자 1개 이상, 영문 숫자 혼합이어야 합니다.");
        return;
      }
      if (!this.isPasswordMatch) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      if (!this.isPhoneValid) {
        alert("전화번호 형식이 올바르지 않습니다. (예: 010-0000-0000)");
        return;
      }

      try {
        const response = await axios.post("/api/users/register", {
          email: this.email,
          password: this.password,
          name: this.name,
          nickname: this.nickname,
          phone: this.phone,
          nationality: this.nationality,
          job: this.occupation,
        });
        console.log("회원가입 성공:", response.data);
        alert("회원가입 성공!");
      } catch (error) {
        console.error("회원가입 실패:", error);
        alert("회원가입 실패. 입력 정보를 확인하세요.");
      }
    },
    formatPhone() {
      const cleaned = ("" + this.phone).replace(/\D/g, "");
      const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
      if (match) {
        this.phone = `${match[1]}-${match[2]}-${match[3]}`;
      }
    },
    sendEmailVerification() {
      // 이메일 인증 로직 구현 예정
      alert("이메일 인증 기능은 추후 개발 예정입니다.");
    },
  },
};
</script>

<style scoped>
.signup-container {
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
  background-color: #b71c1c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button:hover {
  background-color: #d32f2f;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
