<template>
  <div>
    <div class="filter">
      <input
        type="checkbox"
        v-model.lazy="filterEveryone"
        v-on:change="displayMessage"
      />
      @everyone
      <input type="checkbox" v-model="filterMe" v-on:change="displayMessage" />
      @me
      <input type="checkbox" v-model="filterMe" v-on:change="displayMessage" />
      My post
      <input
        type="checkbox"
        v-model="filterFollow"
        v-on:change="displayMessage"
      />
      follow
      <input
        type="text"
        id="3"
        value="3"
        v-model="filterHashtag"
        placeholder="Search #"
        v-on:input="displayMessage"
      />
    </div>

    <div v-for="message in messages" v-bind:key="message.id">
      <div>
        <img
          :src="'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png'"
          contain
          height="50px"
          width="50px"
        />
        <a>{{ message.username }}</a>
      </div>
      <section></section>

      <div>
        <div v-if="message.rt_user_id != null ">
          {{ message.rt_username == username ? "Vous" : message.rt_username }} a
          retweeté
        </div>
        {{
          new Date(message.message_date).toLocaleString().replace(/,/g, " -")
        }}
      </div>
      <div>{{ message.message_content }}</div>

      <div v-if="message.username == username">
        <button @click="deleteMessage(message.message_id)">Delete</button>
        <br />
      </div>

      <button v-if="auth" @click="likeMessage(message.message_id, user_id)">
        Like {{ message.liked }}
      </button>
      <button v-if="auth" @click="retweetMessage(message.message_id, user_id)">
        Retweet
      </button>
      <button
        v-if="auth && message.user_id != user_id"
        @click="followUser(message.user_id)"
      >
        Follow {{ message.follow }}
      </button>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DisplayMessage",
  data() {
    return {
      content: "",
      message_max_length: 140,
      messages: Array,
      filterEveryone: false,
      filterMe: false,
      filterHashtag: "",
      filterFollow: false,
    };
  },
  props: ["user_id", "auth", "username"],

  created() {
    var self = this;
    function foo() {
      self.displayMessage();
      setTimeout(foo, 5000);
      console.log("hey");
    }
    foo();
  },
  methods: {
    followUser(userid) {
      axios
        .post("/followUser", {
          follow: {
            userid: this.user_id,
            userToFollow_id: userid,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.displayMessage();
          }
          console.log(res.status);
        })
        .catch((err) => {
          // what now?
          console.log(err.response);
        });
    },
    deleteMessage(messageID) {
      axios
        .post("/deleteMessage", {
          messageID,
        })
        .then((res) => {
          if (res.status == 200) {
            this.displayMessage();
          }
          console.log(res.status);
        })
        .catch((err) => {
          // what now?
          console.log(err.response);
        });
    },
    likeMessage(messageID, user_id) {
      axios
        .post("/likeMessage", {
          messageID,
          user_id,
        })
        .then((res) => {
          if (res.status == 200) {
            this.displayMessage();
          }
          console.log(res.status);
        })
        .catch((err) => {
          // what now?
          console.log(err.response);
        });
    },
    retweetMessage(messageID, user_id) {
      axios
        .post("/retweetMessage", {
          messageID,
          user_id,
        })
        .then((res) => {
          if (res.status == 200) {
            this.displayMessage();
          }
          console.log(res.status);
        })
        .catch((err) => {
          // what now?
          console.log(err.response);
        });
    },
    displayMessage() {
      var mentionFilter = [];
      var hashtagFilter = [];
      var followFilter = this.filterFollow;

      console.log("Zzz " + this.filterFollow);
      if (this.filterEveryone) {
        mentionFilter.push("@everyone");
      }

      if (this.filterMe) {
        mentionFilter.push("@" + this.username);
      }

      if (this.filterHashtag.length > 0) {
        var hashtag = this.filterHashtag.match(/#\S+/g);
        hashtag = hashtag.join();
        if (hashtag != null) {
          hashtagFilter.push(hashtag);
        }
      }

      console.log("hola" + this.user_id);

      var user_id = this.user_id;

      if (user_id == "") {
        user_id = -1;
      }
      axios
        .post("/getMessage", {
          mentionFilter,
          hashtagFilter,
          followFilter,
          user_id,
        })
        .then((res) => {
          this.messages = res.data.array;
          console.log(this.messages);
        })
        .catch((err) => {
          // what now?
          console.log(err.response);
        });
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
  mounted() {
    this.$root.$on("displayMessage", () => {
      this.displayMessage();
    });
  },
};
</script>
