<template>
<form @submit.prevent="submit">
  <div class="container">
    <div class="another">
           <input
      type="text"
      name="username"
      id="username"
      placeholder="USERNAME"
      v-model="form.username"
      @change="reset"
    />
    <input
      type="text"
      name="password"
      id="password"
      placeholder="PASSWORD"
      v-model="form.password"
      @change="reset"
    />
    </div>

    <img
      src="../../../src/assets/signin.png"
      contain
      height="48px"
      width="48px"
      @click="submit"
    />
  </div>

  <button v-show="false" type ="submit">Sign In</button>
  </form>
</template>


<script>
import axios from "axios";
import $ from "jquery";
export default {
  name: "SignIn",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async submit() {
      $("#username").addClass("sign-in-error");
      $("#password").addClass("sign-in-error");

      axios.post("/signIn", this.form).then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          console.log("logged in");
          this.$emit("update", res.data);
        } else {
          this.$emit("update", false);
        }
      });
    },

    reset() {
      $("#username").removeClass("sign-in-error");
      $("#password").removeClass("sign-in-error");
    },
  },
};
</script>

<style>

.container{
    display:flex;
    align-content: center;
    justify-content: center;

}

.another{
        display:flex;
    align-content: center;
    justify-content: center;
    margin-right:5px;

}

.another input{
    height:15px;
    margin-top:15px;
      text-align:center;
}


.sign-in-error {
  border: 1px solid red;
}
</style>
