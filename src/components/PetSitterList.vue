<template>
  <div class="petsitter-list">
    <h1>펫시터 목록</h1>
    <div class="table-container">
      <table class="modern-table">
        <thead>
          <tr>
            <th>프로필 사진</th>
            <th>이름</th>
            <th>닉네임</th>
            <th>활동 지역</th>
            <th>경력</th>
            <th>자격증</th>
            <th>예약</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="petsitter in petsitters" :key="petsitter.id">
            <td>
              <img
                :src="petsitter.profilePhoto"
                alt="프로필 사진"
                class="profile-img"
              />
            </td>
            <td>{{ petsitter.user.name }}</td>
            <td>{{ petsitter.user.nickname }}</td>
            <td>{{ petsitter.location }}</td>
            <td>{{ petsitter.experience }}</td>
            <td>{{ petsitter.certification }}</td>
            <td>
              <button
                @click="handleReservation(petsitter.id)"
                class="reserve-btn"
                :disabled="!isAuthenticated"
              >
                예약
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import { useAuthStore } from "../stores/auth";

export default {
  name: "PetSitterList",
  data() {
    return {
      petsitters: [],
    };
  },
  async created() {
    await this.fetchPetsitters();
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
  },
  methods: {
    async fetchPetsitters() {
      try {
        const response = await axios.get("/api/petsitters");
        this.petsitters = response.data;
      } catch (error) {
        console.error("펫시터 목록 조회 실패:", error);
        alert("펫시터 목록을 불러오는데 실패했습니다.");
      }
    },
    async handleReservation(petsitterId) {
      if (!this.isAuthenticated) {
        alert("로그인이 필요합니다.");
        this.$router.push("/login");
        return;
      }

      const { IMP } = window;
      IMP.init("imp71425567"); // 가맹점 식별코드

      const paymentData = {
        pg: "uplus",
        pay_method: "card",
        merchant_uid: `mid_${new Date().getTime()}`,
        name: `펫시터 예약 - ${petsitterId}`,
        amount: 1000,
        buyer_email: this.authStore.user.email,
        buyer_name: this.authStore.user.name,
      };

      IMP.request_pay(paymentData, async (response) => {
        if (response.success) {
          console.log("response.success = ", response.success);
          try {
            const bookingResponse = await axios.post(
              "/api/bookings",
              {
                petsitterId: petsitterId,
                bookingDate: new Date().toISOString(),
                status: "PAID",
              },
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            alert(`예약 완료! 예약번호: ${bookingResponse.data.id}`);
            console.log("예약 내역:", bookingResponse.data);
          } catch (error) {
            console.error("예약 생성 실패:", error);
            alert("예약 정보 저장에 실패했습니다.");
          }
        } else {
          alert(`결제 실패: ${response.error_msg}`);
        }
      });
    },
  },
};
</script>

<style scoped>
.petsitter-list {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
}

.profile-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.modern-table th,
.modern-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.modern-table th {
  background-color: #b71c1c;
  color: white;
  font-weight: 600;
}

.modern-table tr:hover {
  background-color: #f9f9f9;
}

@media (max-width: 768px) {
  .table-container {
    overflow-x: auto;
  }

  .modern-table {
    min-width: 800px;
  }
}

.reserve-btn {
  padding: 8px 16px;
  background-color: #b71c1c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reserve-btn:hover {
  background-color: #d32f2f;
}

.reserve-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
