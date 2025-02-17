<template>
  <div class="code-management">
    <h1 class="page-title">코드 관리 시스템</h1>

    <!-- 그룹 코드 선택기 -->
    <div class="group-selector card">
      <label>그룹 선택:</label>
      <select
        v-model="selectedGroupId"
        class="modern-select"
        @change="fetchDetailCodes(selectedGroupId)"
      >
        <option
          v-for="group in groupCodes"
          :value="group.id"
          :key="group.id"
          :selected="selectedGroupId === group.id"
        >
          {{ group.name }}
        </option>
      </select>
    </div>

    <!-- 그룹 코드 테이블 -->
    <div class="card table-section">
      <div class="table-header">
        <h2>그룹 코드 목록</h2>
        <button @click="fetchGroupCodes" class="icon-btn refresh-btn">
          <i class="fas fa-sync-alt"></i>
        </button>
      </div>
      <div class="table-container">
        <table class="modern-table">
          <thead>
            <tr>
              <th>그룹ID</th>
              <th>그룹명</th>
              <th>설명</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(group, index) in groupCodes" :key="group.id">
              <td>{{ group.id }}</td>
              <td>{{ group.name }}</td>
              <td>{{ group.description }}</td>
              <td>
                <button @click="deleteGroup(index)" class="delete-btn">
                  삭제
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 상세 코드 테이블 -->
    <div class="card table-section">
      <div class="table-header">
        <h2>상세 코드 관리</h2>
        <div class="actions">
          <button @click="addNewCode" class="primary-btn">
            <i class="fas fa-plus"></i> 새 코드 추가
          </button>
        </div>
      </div>
      <div class="table-container">
        <table class="modern-table unselectable">
          <thead>
            <tr>
              <th>순서</th>
              <th>코드ID</th>
              <th>코드명</th>
              <th>코드값</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detail, index) in filteredDetails" :key="detail.codeId">
              <td class="order-cell">{{ index + 1 }}</td>
              <td>
                <input
                  type="text"
                  v-model="detail.codeId"
                  :readonly="!detail.isEditing && !detail.isNew"
                  :class="{ 'edit-mode': detail.isEditing }"
                  class="modern-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  v-model="detail.codeName"
                  :readonly="!detail.isEditing && !detail.isNew"
                  class="modern-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  v-model="detail.codeValue"
                  :readonly="!detail.isEditing && !detail.isNew"
                  class="modern-input"
                />
              </td>
              <td class="action-cell">
                <div class="action-buttons">
                  <template v-if="detail.isNew">
                    <button
                      @click="saveNewCode(detail)"
                      class="modern-btn save-btn2"
                    >
                      저장2
                    </button>
                    <button
                      @click="cancelNewCode(detail)"
                      class="modern-btn cancel-btn"
                    >
                      취소
                    </button>
                  </template>
                  <template v-else-if="!detail.isEditing">
                    <button
                      @click="startEditing(detail)"
                      class="modern-btn edit-btn"
                    >
                      <i class="fas fa-edit"></i> 수정
                    </button>
                    <button
                      @click="deleteCode(detail)"
                      class="modern-btn delete-btn"
                    >
                      <i class="fas fa-trash"></i> 삭제
                    </button>
                  </template>
                  <template v-else>
                    <button
                      @click="saveExistingCode(detail)"
                      class="modern-btn save-btn1"
                    >
                      <i class="fas fa-save"></i> 저장1
                    </button>
                    <button
                      @click="cancelEditing(detail)"
                      class="modern-btn cancel-btn"
                    >
                      <i class="fas fa-times"></i> 취소
                    </button>
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  name: "CodeManagement",
  data() {
    return {
      groupCodes: [],
      detailCodes: [],
      newCode: {
        codeId: "",
        groupId: "",
        codeName: "",
        codeValue: "",
        sortOrder: 0,
        active: true,
      },
      selectedGroupId: "anmctg", // 기본값 설정
      loading: false,
      editingCodeId: null, // 현재 수정 중인 코드 ID
      originalData: new Map(), // 원본 데이터 저장
      editingMode: {
        type: null, // 'new' | 'edit'
        targetId: null,
      },
    };
  },
  async created() {
    await this.fetchGroupCodes();
    if (this.selectedGroupId) {
      await this.fetchDetailCodes(this.selectedGroupId);
    }
  },
  computed: {
    filteredDetails() {
      return this.detailCodes.filter(
        (detail) => detail.groupId === this.selectedGroupId
      );
    },
  },
  watch: {
    selectedGroupId(newVal) {
      this.fetchDetailCodes(newVal);
    },
    groupCodes: {
      immediate: true,
      handler(newGroups) {
        if (newGroups.length > 0 && !this.selectedGroupId) {
          this.selectedGroupId = newGroups[0].id;
        }
      },
    },
  },
  methods: {
    async fetchGroupCodes(retryCount = 3) {
      this.loading = true;
      try {
        console.log("API 요청 시작:", "/api/code-groups");
        const response = await axios.get("/api/code-groups");
        console.log("API 응답 데이터:", response);

        // 응답 데이터 구조 확인
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        this.groupCodes = response.data.map((group) => ({
          id: group.groupId,
          name: group.groupName,
          description: group.description,
        }));

        // 초기 그룹 선택
        if (this.groupCodes.length > 0 && !this.selectedGroupId) {
          this.selectedGroupId = this.groupCodes[0].id;
        }
      } catch (error) {
        if (retryCount > 0) {
          console.log(`재시도 남은 횟수: ${retryCount}`);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return this.fetchGroupCodes(retryCount - 1);
        }
        console.error("그룹 코드 조회 실패:", error);
        // 임시 데이터 표시 (개발용)
        this.groupCodes = [
          {
            id: "temp1",
            name: "임시 그룹1",
            description: "백엔드 연결 실패 시 표시되는 데이터",
          },
          {
            id: "temp2",
            name: "임시 그룹2",
            description: "실제 API가 동작하면 이 데이터는 사라집니다",
          },
        ];
        alert("백엔드 연결에 실패하여 임시 데이터를 표시합니다.");
      } finally {
        this.loading = false;
      }
    },
    async fetchDetailCodes(groupId) {
      try {
        const response = await axios.get(`/api/code-details/group/${groupId}`);
        this.detailCodes = response.data.map((detail) => ({
          codeId: detail.codeId, // 필드명 일치화
          groupId: detail.groupId,
          codeName: detail.codeName,
          codeValue: detail.codeValue,
          sortOrder: detail.sortOrder,
          active: detail.active,
          isNew: false,
          isEditing: false,
        }));
      } catch (error) {
        console.error("상세 코드 조회 실패:", error);
        this.detailCodes = [];
      }
    },
    addNewCode() {
      const newCode = {
        codeId: "",
        groupId: this.selectedGroupId,
        codeName: "",
        codeValue: "",
        sortOrder: this.detailCodes.length + 1,
        active: true,
        isNew: true,
        isEditing: true,
      };
      this.detailCodes.push(newCode);
    },
    startEditing(detail) {
      // 반응성 보장을 위해 전체 객체 교체
      const index = this.detailCodes.findIndex(
        (d) => d.codeId === detail.codeId
      );
      if (index !== -1) {
        this.detailCodes[index] = {
          ...detail,
          isEditing: true,
        };
        this.originalData.set(detail.codeId, { ...detail });
      }
    },
    cancelEditing(detail) {
      detail.isEditing = false;
      Object.assign(detail, this.originalData.get(detail.codeId));
    },
    async saveExistingCode(detail) {
      try {
        const payload = {
          codeName: detail.codeName,
          codeValue: detail.codeValue,
          sortOrder: detail.sortOrder,
          active: detail.active,
        };

        const response = await axios.put(
          `/api/code-details/${detail.codeId}`,
          payload
        );

        // 반응성 유지를 위해 전체 객체 교체
        const index = this.detailCodes.findIndex(
          (d) => d.codeId === detail.codeId
        );
        if (index !== -1) {
          this.detailCodes[index] = {
            ...response.data,
            isEditing: false,
          };
        }

        alert("수정이 완료되었습니다!");
      } catch (error) {
        alert(`수정 실패: ${error.response?.data?.message || error.message}`);
      }
    },
    async saveNewCode(detail) {
      try {
        const payload = {
          codeId: detail.codeId,
          groupId: this.selectedGroupId,
          codeName: detail.codeName,
          codeValue: detail.codeValue,
          sortOrder: detail.sortOrder,
          active: true,
        };

        await axios.post("/api/code-details", payload);
        detail.isNew = false;
        detail.isEditing = false;
        alert("새 코드가 추가되었습니다!");
      } catch (error) {
        alert(`추가 실패: ${error.response?.data?.message || error.message}`);
      }
    },
    cancelNewCode(detail) {
      const index = this.detailCodes.findIndex(
        (d) => d.codeId === detail.codeId
      );
      if (index !== -1) this.detailCodes.splice(index, 1);
    },
    async deleteCode(detail) {
      if (confirm("정말로 삭제하시겠습니까?")) {
        try {
          if (!detail.isNew) {
            await axios.delete(`/api/code-details/${detail.codeId}`);
          }
          const index = this.detailCodes.findIndex(
            (d) => d.codeId === detail.codeId
          );
          this.detailCodes.splice(index, 1);
        } catch (error) {
          alert(`삭제 실패: ${error.response?.data?.message || error.message}`);
        }
      }
    },
    async deleteGroup(index) {
      if (confirm("정말로 이 그룹 코드를 삭제하시겠습니까?")) {
        try {
          await axios.delete(`/api/code-groups/${this.groupCodes[index].id}`);
          this.groupCodes.splice(index, 1);
          alert("그룹 코드가 삭제되었습니다.");
        } catch (error) {
          console.error("그룹 코드 삭제 실패:", error);
          alert("그룹 코드 삭제에 실패했습니다.");
        }
      }
    },
  },
};
</script>

<style scoped>
.page-title {
  text-align: center;
  color: #2c3e50;
  font-size: 2.2rem;
  margin-bottom: 2rem;
  font-weight: 600;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  padding: 1.5rem;
}

.table-section {
  padding: 1.5rem;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.modern-table th {
  background-color: #f8f9fa;
  color: #495057;
  font-weight: 600;
  padding: 1rem;
  border-bottom: 2px solid #e9ecef;
}

.modern-table td {
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.modern-input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.modern-input:focus {
  border-color: #b71c1c;
  box-shadow: 0 0 0 3px rgba(183, 28, 28, 0.1);
  outline: none;
}

.modern-input[readonly] {
  background-color: #f8f9fa;
  border-color: #e9ecef;
  cursor: default;
}

.modern-input:not([readonly]) {
  background-color: #fff;
  border-color: #b71c1c;
}

.edit-mode {
  border-color: #b71c1c !important;
  box-shadow: 0 0 0 2px rgba(183, 28, 28, 0.1);
}

.save-btn1 {
  background-color: #e3f2fd;
  color: #1976d2;
  border: 1px solid #1976d2;
}

.save-btn1:hover {
  background-color: #bbdefb;
}

.save-btn2 {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #2e7d32;
}

.save-btn2:hover {
  background-color: #c8e6c9;
}

.cancel-btn {
  background-color: #ffebee;
  color: #c62828;
}

.cancel-btn:hover {
  background-color: #ffcdd2;
}

.action-cell {
  width: 200px;
  padding: 0.5rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.modern-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 0.5rem;
}

.modern-btn i {
  font-size: 0.9em;
}

.edit-btn {
  background-color: #e3f2fd;
  color: #1976d2;
}

.edit-btn:hover {
  background-color: #bbdefb;
  transform: translateY(-1px);
}

.delete-btn {
  background-color: #ffebee;
  color: #d32f2f;
}

.delete-btn:hover {
  background-color: #ffcdd2;
  transform: translateY(-1px);
}

.primary-btn {
  background-color: #b71c1c;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.primary-btn:hover {
  background-color: #d32f2f;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modern-select {
  padding: 0.8rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background: white;
  width: 300px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;
}

.group-selector {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.loading-indicator {
  color: #868e96;
  font-size: 0.9rem;
}

.order-cell {
  font-weight: 600;
  color: #868e96;
  width: 80px;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .table-container {
    overflow-x: auto;
  }

  .modern-table {
    min-width: 800px;
  }

  .action-cell {
    width: 160px;
  }

  .modern-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }

  .modern-btn i {
    display: none; /* 모바일에서 아이콘 숨김 */
  }
}

.modern-select option:checked {
  background-color: #b71c1c;
  color: white;
}

/* 텍스트 선택 방지 */
.unselectable {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 추가 필요한 스타일 */
.modern-table tbody tr:hover {
  background-color: #f8f9fa;
}

.empty-table-message {
  text-align: center;
  color: #868e96;
  padding: 2rem;
}
</style>
