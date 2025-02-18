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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "../axios";

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
</style>
