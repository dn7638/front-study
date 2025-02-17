import { createRouter, createWebHistory } from "vue-router";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import UserLogin from "./components/UserLogin.vue";
import SignUp from "./components/SignUp.vue";
import DeleteAccount from "./components/DeleteAccount.vue";
import UserProfile from "./components/UserProfile.vue";
import UserList from "./components/UserList.vue";
import HomePage from "./components/Home.vue";
import PetShopping from "./components/PetShopping.vue";
import MyPetSitter from "./components/MyPetSitter.vue";
import PetSitterList from "./components/PetSitterList.vue";
import PetSitterRegister from "./components/PetSitterRegister.vue";
import PaymentsTest from "./components/PaymentsTest.vue";
import CodeManagement from "./components/CodeManagement.vue";
import { useAuthStore } from "./stores/auth";

const routes = [
  { path: "/", component: HomePage },
  { path: "/signup", component: SignUp, meta: { requiresAuth: false } },
  { path: "/login", component: UserLogin, meta: { requiresAuth: false } },
  { path: "/profile", component: UserProfile, meta: { requiresAuth: true } },
  {
    path: "/delete-account",
    component: DeleteAccount,
    meta: { requiresAuth: true },
  },
  { path: "/users", component: UserList, meta: { requiresAuth: true } },
  {
    path: "/pet-shopping",
    component: PetShopping,
    meta: { requiresAuth: true },
  },
  {
    path: "/my-pet-sitter",
    component: MyPetSitter,
    meta: { requiresAuth: true },
  },
  {
    path: "/pet-sitter-list",
    component: PetSitterList,
    meta: { requiresAuth: true },
  },
  {
    path: "/pet-sitter-register",
    component: PetSitterRegister,
    meta: { requiresAuth: true },
  },
  {
    path: "/payment-test",
    name: "PaymentTest",
    component: PaymentsTest,
    meta: { requiresAuth: true },
  },
  {
    path: "/code-management",
    component: CodeManagement,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount("#app");
