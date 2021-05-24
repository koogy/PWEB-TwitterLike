<template>
  <img
    src="../../../src/assets/signout.png"
    contain
    height="25px"
    width="25px"
    @click="submit"
  />
</template>

<script>
import axios from "axios";
export default {
  name: "SignOut",
  data() {
    return {};
  },
  methods: {
    async submit() {
      console.log("submitted");
      axios.post("/signOut");
      this.$emit("update", false);
    },
  },
};
</script>
