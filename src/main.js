import { createApp } from "vue";
import { createPinia, mapState } from "pinia";
import { useAuthStore } from "./stores/auth.js";
import App from "./App.vue";
import AppHome from "@/components/AppHome.vue";
import AppNotFound from "@/components/AppNotFound.vue";
import AppDashboard from "@/components/dashboard/AppDashboard.vue";
import VeeValidatePlugin from "@/plugins/validator.js";
import axios from "axios";
import VueAxios from "vue-axios";
import { createRouter, createWebHistory } from "vue-router";
import "@/assets/main.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: AppHome,
    },
    {
      path: "/Dashboard",
      name: "Dashboard",
      component: AppDashboard,
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: AppNotFound },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const token = localStorage.getItem("user_token");

  if (token) {
    auth.isAuthenticated = true;
  } else {
    auth.isAuthenticated = false;
  }
  if (to.path !== "/" && !auth.isAuthenticated) {
    next({ name: "Home" });
  } else if (to.path == "/" && auth.isAuthenticated) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(VeeValidatePlugin);
app.use(VueAxios, axios);

app.mount("#app");
