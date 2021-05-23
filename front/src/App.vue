<template>
  <div id="app">
  <h1>  {{ username }} </h1>
    
    <SignIn v-if="auth == false" @update="authentificate" />
    <SignOut v-if="auth == true" @update="authentificate" />
    <br>
    <InputMessage :user_id="user_id" :auth="auth" v-if="auth==true"/>
    
    <DisplayMessage :user_id="user_id" :auth="auth" :username="username"></DisplayMessage>
  </div>
</template>

<script>

import SignIn from "./components/authentification/SignIn.vue";
import SignOut from "./components/authentification/SignOut.vue";
import InputMessage from './components/app/InputMessage.vue';
import DisplayMessage from './components/app/DisplayMessage.vue';

export default {
  name: "App",
  components: {
    SignIn,
    SignOut,
    InputMessage,
    DisplayMessage,

  },
  data() {
    return {
      auth: false,
      username: "",
      user_id: "",
    };
  },
  methods: {
    authentificate(data) {
      if (data == false) {
        console.log("i'm here")
        this.auth = false
      } else {
        (this.username = data.user.name), (this.user_id = data.user.id);
        this.auth = true;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
