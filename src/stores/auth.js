import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    SuccessLogin: "",
    SuccessSignUp: "",
    ErrorSignUp: "",
    authenticateError: "",
    loggedOutMsg: "",
  }),
  actions: {
    async register(userCred) {
      await axios
        .post("http://127.0.0.1:8000/api/register", userCred)
        .then(async (res) => {
          if (res) {
            if ((await res.data.status) == 201) {
              this.ErrorSignUp = "";
              this.SuccessSignUp = await res.data.message;
              localStorage.setItem(
                "userData",
                JSON.stringify(await res.data.user)
              );
              localStorage.setItem("user_token", await res.data.token);
              setTimeout(() => {
                this.SuccessSignUp = "";
              }, 3000);
            }
          }
        })
        .catch(async (err) => {
          this.ErrorSignUp = await err.response.data.message;
          console.log(this.ErrorSignUp);
        });
    },
    async logIn(values) {
      const userCreds = values;
      await axios
        .post("http://127.0.0.1:8000/api/Login", userCreds)
        .then(async (res) => {
          if (res) {
            if ((await res.data.status) === 200) {
              this.authenticateError = "";
              this.SuccessLogin = await res.data.message;
              localStorage.setItem(
                "userData",
                JSON.stringify(await res.data.user)
              );
              localStorage.setItem("user_token", await res.data.token);
              setTimeout(() => {
                this.SuccessLogin = "";
              }, 3000);
            }
            if ((await res.data.status) === 401) {
              this.Success = "";
              this.authenticateError = await res.data.message;
            }
          }
        })
        .catch(async (err) => {
          console.log(await err);
        });
    },
    async logout() {
      await axios
        .get("http://127.0.0.1:8000/api/Logout", {
          headers: {
            Authorization: "Bearer " + localStorage.user_token,
            "Content-Type": "application/json",
          },
        })
        .then(async (res) => {
          if ((await res.data.status) === 200) {
            localStorage.removeItem("user_token");
            localStorage.removeItem("userData");

            setTimeout(async () => {
              this.loggedOutMsg = await res.data.msg;
            }, 3000);
          }
        })
        .catch(async (err) => {
          console.log(await err);
        });
    },
  },
});
