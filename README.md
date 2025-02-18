# Pet Sitter Management System

![Vue](https://img.shields.io/badge/Vue-3.3.4-brightgreen)
![Pinia](https://img.shields.io/badge/Pinia-2.0.14-orange)
![Axios](https://img.shields.io/badge/Axios-1.3.4-blue)

반려동물 돌봄 서비스 관리를 위한 종합 관리 시스템 (프론트엔드)

## 📌 주요 기능

### 1. 코드 관리 시스템

- 그룹 코드/상세 코드 CRUD 관리
- 실시간 정렬 및 유효성 검증
- API 연동 오류 시 임시 데이터 표시

### 2. 사용자 관리

- JWT 기반 인증 시스템
- 회원가입/로그인/프로필 관리

### 3. 펫시터 서비스

- 펫시터 등록 및 관리
- 결제 시스템 연동 (아임포트)

## 🛠 기술 스택

### Frontend

- **Vue 3** + Composition API
- **Pinia** 상태 관리
- **Vue Router** 네비게이션
- **Axios** REST API 통신
- Tailwind CSS 스타일링

### Backend

- Spring Boot (예정)
- MySQL 데이터베이스
- Swagger API 문서화

## 🌐 API 연동

- Swagger
- 프록시 설정 (`vue.config.js`):

## 📂 프로젝트 구조

📦src
┣ 📂assets
┃ ┣ 📜pet-sitter-logo.png
┃ ┗ 📜pet-sitter-logo2.png
┣ 📂components
┃ ┣ 📜CodeManagement.vue
┃ ┣ 📜DeleteAccount.vue
┃ ┣ 📜HelloWorld.vue
┃ ┣ 📜Home.vue
┃ ┣ 📜MyPetSitter.vue
┃ ┣ 📜PaymentTest.vue
┃ ┣ 📜PaymentsTest.vue
┃ ┣ 📜PetShopping.vue
┃ ┣ 📜PetSitterList.vue
┃ ┣ 📜PetSitterRegister.vue
┃ ┣ 📜SignUp.vue
┃ ┣ 📜UserList.vue
┃ ┣ 📜UserLogin.vue
┃ ┗ 📜UserProfile.vue
┣ 📂plugins
┃ ┗ 📜vuetify.js
┣ 📂router
┃ ┗ 📜index.js
┣ 📂stores
┃ ┗ 📜auth.js
┣ 📜App.vue
┣ 📜axios.js
┗ 📜main.js
