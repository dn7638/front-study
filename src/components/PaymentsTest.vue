<template>
  <div class="payments-test-container">
    <h1>결제 테스트 페이지</h1>
    <button @click="onPayment">결제하기</button>
  </div>
</template>

<script>
export default {
  name: "PaymentsTest",
  methods: {
    onPayment() {
      /* 1. 가맹점 식별하기 */
      const { IMP } = window;
      IMP.init("imp71425567");

      /* 2. 결제 데이터 정의하기 */
      const data = {
        pg: "uplus", // PG사
        pay_method: "card", // 결제수단
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        amount: 1000, // 결제금액
        name: "아임포트 결제 데이터 분석", // 주문명
        buyer_name: "홍길동", // 구매자 이름
        buyer_tel: "01012341234", // 구매자 전화번호
        buyer_email: "example@example", // 구매자 이메일
        buyer_addr: "신사동 661-16", // 구매자 주소
        buyer_postcode: "06018", // 구매자 우편번호
      };

      /* 4. 결제 창 호출하기 */
      IMP.request_pay(data, this.callback);
    },
    callback(response) {
      /* 3. 콜백 함수 정의하기 */
      const { success, merchant_uid, error_msg } = response;

      if (success) {
        alert(`결제 성공! 주문번호: ${merchant_uid}`);
      } else {
        alert(`결제 실패: ${error_msg} (주문번호: ${merchant_uid})`);
      }
    },
  },
};
</script>

<style scoped>
.payments-test-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

button {
  padding: 12px 24px;
  background-color: #b71c1c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #d32f2f;
}
</style>
