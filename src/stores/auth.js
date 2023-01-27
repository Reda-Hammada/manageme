import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    Success: "",
    Error: "",
    authenticateError: "",
  }),
  actions: {
    async register(userCred) {
      await axios
        .post("http://127.0.0.1:8000/api/register", userCred)
        .then(async (res) => {
          const userData = await res.data.user;
          localStorage.setItem("userData", userData);
          this.Success = await res.data.message;
          let userToken = await res.data.token;
          localStorage.setItem("user_token", userToken);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async logIn(values) {
      const userCreds = values;
      console.log(userCreds);
      await axios
        .post("http://127.0.0.1:8000/api/Login", userCreds)
        .then(async (res) => {
          if (res) {
            if ((await res.data.status) === 200) {
              this.authenticateError = "";
              this.Success = await res.data.message;
              localStorage.setItem("userData", await res.data.user);
              localStorage.setItem("user_token", await res.data.token);
              setTimeout(()=>{
                this.Success = "" 
              },3000)
            
          
            }
            if (await res.data.status === 401) {
              this.Success = "";
              this.authenticateError = await res.data.message;
           
            }
          }
        });
    },
  },
});
