import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    userData: null,
    Success: "",
    Error: "",
  }),
  actions: {
    async register(userCred) {
      await axios
        .post("http://127.0.0.1:8000/api/register", userCred)
        .then(async (res) => {
          this.userData = await res.data.user;
          this.Success = await res.data.message;
          const userToken = await res.data.token;
          localStorage.setItem("user_token", userToken);
          this.$router.push({ name: "Dashboard" });
        })
        .then((err) => {
          console.log(err)
        });
    },
    async authenticate(values) {
      await axios
        .get("http://127.0.0.1:8000/api/login", values)
        .then((res) => {
          this.userData = res.data.user;
          this.message = res.data.message;
          this.isAuthenticated = true;
          this.$router.push({ name: "Dashboard" });
        })
        .then((err) => {
          this.messageError = err.message;
          console.log(this.messageError);
        });
    },
  },
});
