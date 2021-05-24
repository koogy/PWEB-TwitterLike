<template>
  <div>
    <div>
      <div>
        <div class="input">
          <textarea
            id="inputMessage"
            placeholder="Quoi de neuf ?"
            v-model="content"
          ></textarea>
        </div>

        <div class="input-information">
          <div class="container1">
            <p id="charleft">{{ getMessageLength }} caractères restants</p>
          </div>
          <div>
            <br />
            <br />
          </div>

          <div class="container2">
            <img v-show="canSubmit"
              src="../../../src/assets/submit.png"
              contain
              height="50px"
              width="50px"
              @click="submitMessage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
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

      console.log("length : " + this.content.length)
      if(this.content.length >0){
        axios.post("/postMessage", {
        message_content: this.content,
        date: currentDate,
        user_id: this.user_id,
      });

      this.$root.$emit("displayMessage");
      this.content = "";
      }
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

p {
  margin: 0;
  margin-left: 50;
}

.input-information {
  display: flex;
  flex-direction: row;
}

.container2 {
  margin-left: 50px;
}

#inputMessage {
  border: 2px solid #2c3e50;
  padding: 5px;
}

#charleft {
  font-size: 15px;
}
</style>
