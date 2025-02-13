<template>
  <div class="delete-account-container">
    <h1>회원 탈퇴</h1>
    <p>정말로 회원 탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
    <form @submit.prevent="handleDeleteAccount">
      <div class="form-group">
        <label for="password">비밀번호 확인</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="delete-button">회원 탈퇴</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "DeleteAccount",
  data() {
    return {
      password: "",
    };
  },
  methods: {
    handleDeleteAccount() {
      if (!this.password) {
        alert("비밀번호를 입력하세요.");
        return;
      }
      // 회원 탈퇴 로직 구현
      console.log("회원 탈퇴 시도:", this.password);
      alert("회원 탈퇴가 완료되었습니다.");
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
</style>
