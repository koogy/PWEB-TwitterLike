
<template>
  <div id="app">
    <header id="header">
      <div class="header-content">
        <div id="welcome"><h1 v-if="auth">Hello {{ username }} ! </h1></div>
        <div id="signout"><SignOut v-if="auth == true" @update="authentificate" /></div>
      
        <SignIn v-if="auth == false" @update="authentificate" />

      
      </div>

      <DisplayMessage ref="itsatest"
        :user_id="user_id"
        :auth="auth"
        :username="username"

     
      ></DisplayMessage>
    </header>

    <!--     
  <h1>  Hello {{ username }} ! </h1>
    
    <SignIn v-if="auth == false" @update="authentificate" />
    <SignOut v-if="auth == true" @update="authentificate" />
    <br>
    <InputMessage :user_id="user_id" :auth="auth" v-if="auth==true"/>
    
    <DisplayMessage :user_id="user_id" :auth="auth" :username="username"></DisplayMessage> -->
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import SignIn from "./components/authentification/SignIn.vue";
import SignOut from "./components/authentification/SignOut.vue";
import InputMessage from "./components/app/InputMessage.vue";
import DisplayMessage from "./components/app/DisplayMessage.vue";

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
        this.auth = false;
        this.$refs.itsatest.set_everyone(true) 
      } else {
        (this.username = data.user.name), (this.user_id = data.user.id);
        this.auth = true;
        this.$refs.itsatest.displayMessage() 

      }


    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;

  /* text-align: center;

  margin-top: 20px; */
}

.header-content {
  
  display:flex;
    margin: auto;
  width: 50%;
  padding: 10px;
  margin-bottom:10px;
}

.header-content #welcome {
  margin-right:10px;
}

.header-content #signout {
    display: flex;
  justify-content: center;
  align-items: center;
}

</style>
