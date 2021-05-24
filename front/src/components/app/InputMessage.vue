<template>
  <div>
    <div>
      <div>
        <form @submit.prevent="submitMessage">
          <div class ="input">
          <textarea id="inputMessage" placeholder="Quoi de neuf ?" v-model="content"></textarea>
          </div>

          <div class ="input-information">
            <div>
            <p>{{ getMessageLength }} caractères restants</p>
            </div>
            <div>
            <button :disabled="!canSubmit">Twotter !</button>

            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "InputMessage",
  data() {
    return {
      content: "",
      message_max_length: 140,
    };
  },
  props: ["user_id", "auth"],
  methods: {
    submitMessage() {
      var currentDate = new Date().toLocaleString();
      console.log(currentDate)
      axios.post("/postMessage", {
        message_content: this.content,
        date: currentDate,
        user_id : this.user_id
      });

      this.$root.$emit("displayMessage");
    },
  },
  computed: {
    getMessageLength() {
      return this.message_max_length - this.content.length;
    },

    canSubmit() {
      return this.getMessageLength >= 0 && this.content.length >= 0;
    },
  },
};
</script>

<style>
textarea {
  width: 250px;
  height: 85px;
  resize: none;
  outline: none;
}


p{
  margin:0;
  margin-left:50;
}

.input-information{
  display:inline-block
}
</style>
