<template>
  <div class="user-list-container">
    <h1>회원 정보 목록</h1>
    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>이메일</th>
          <th>이름</th>
          <th>별명</th>
          <th>전화번호</th>
          <th>역할</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.userId">
          <td>{{ user.userId }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.nickname }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "../axios"; // Import the configured Axios instance

export default {
  name: "UserList",
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("/api/users");
        this.users = response.data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
        alert("사용자 목록을 불러오는데 실패했습니다.");
      }
    },
  },
};
</script>

<style scoped>
.user-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.user-table th {
  background-color: #2c3e50;
  color: white;
  font-weight: 600;
}

.user-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
