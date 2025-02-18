<template>
  <div class="home-container">
    <h1>Welcome to the Pet Service</h1>
    <div class="button-container">
      <button @click="goToPetShopping">펫 쇼핑</button>
      <button @click="goToMyPetSitter">내 펫시터 정보</button>
      <button @click="goToPetSitterList">펫시터 조회</button>
      <button @click="goToPetSitterRegister">펫시터 등록</button>
      <button @click="goToPaymentTest">결제 테스트</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "HomePage",
  setup() {
    const router = useRouter();

    const goToPetShopping = () => {
      router.push("/pet-shopping"); // Navigate to the pet shopping page
    };

    const goToMyPetSitter = () => {
      router.push("/my-pet-sitter"); // Navigate to the my pet sitter information page
    };

    const goToPetSitterList = () => {
      router.push("/pet-sitter-list"); // Navigate to the pet sitter list page
    };

    const goToPetSitterRegister = () => {
      router.push("/pet-sitter-register"); // 새로운 경로로 이동
    };

    const goToPaymentTest = () => {
      router.push({ name: "PaymentTest" }); // name 기반 라우팅 사용
    };

    return {
      goToPetShopping,
      goToMyPetSitter,
      goToPetSitterList,
      goToPetSitterRegister, // 새로운 메서드 반환
      goToPaymentTest,
    };
  },
};
</script>

<style scoped>
.home-container {
  text-align: center;
  margin-top: 20px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1a2b3c;
}
</style>
