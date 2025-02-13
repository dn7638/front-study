import { createRouter, createWebHistory } from "vue-router";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import UserLogin from "./components/UserLogin.vue";
import SignUp from "./components/SignUp.vue";
import DeleteAccount from "./components/DeleteAccount.vue";
import UserProfile from "./components/UserProfile.vue";
import UserList from "./components/UserList.vue";
import { useAuthStore } from "./stores/auth";

// 페이지 컴포넌트 임포트 (추후 구현 예정)
const HomeComponent = { template: "<div><h1>메인 페이지</h1></div>" };

const routes = [
  { path: "/", component: HomeComponent },
  { path: "/signup", component: SignUp, meta: { requiresAuth: false } },
  { path: "/login", component: UserLogin, meta: { requiresAuth: false } },
  { path: "/profile", component: UserProfile, meta: { requiresAuth: true } },
  {
    path: "/delete-account",
    component: DeleteAccount,
    meta: { requiresAuth: true },
  },
  { path: "/users", component: UserList, meta: { requiresAuth: true } },
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
