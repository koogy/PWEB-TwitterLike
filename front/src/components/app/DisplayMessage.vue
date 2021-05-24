<template>
  <div class="container">
    <div class="filter">
      <div class="filter-container">
        <div class="test">
          <input
            type="checkbox"
            v-model.lazy="filterEveryone"
            v-on:change="displayMessage"
            :disabled="!auth"
          />
          <label for="checkbox"> @EVERYONE </label>
        </div>

        <div class="test">
          <input
            type="checkbox"
            v-model="filterMe"
            v-on:change="displayMessage"
            :disabled="!auth"
          />
          <label for="checkbox"> @ME </label>
        </div>

        <div class="test">
          <input
            type="checkbox"
            v-model="filterMyPost"
            v-on:change="displayMessage"
            :disabled="!auth"
          />
          <label for="checkbox"> MY POSTS </label>
        </div>
        <div class="test">
          <input
            type="checkbox"
            v-model="filterFollow"
            v-on:change="displayMessage"
            :disabled="!auth"
          />
          <label for="checkbox"> FOLLOWING </label>
        </div>

        <div class="test">
          <input
            type="text"
            v-model="filterHashtag"
            placeholder="SEARCH HASHTAG"
            v-on:input="displayMessage"
            :disabled="!auth"
          />
        </div>

        <div class="test">
          <input
            type="text"
            v-model="userFilter"
            placeholder="SEARCH USER"
            v-on:input="displayMessage"
            :disabled="!auth"
          />
        </div>
      </div>
    </div>

    <div class="body">
      <div v-if="auth" class="header">
        <InputMessage
          :user_id="user_id"
          :auth="auth"
          :username="username"
        ></InputMessage>
      </div>

      <div class="display-post">
        <div class="post">
          <div v-for="message in messages" v-bind:key="message.id" class="itsamessage">
            <!-- PARTIE TWEET -->

            <div class="message-body" v-if="message.retweet_user_id == null">
              <div class="Message">
                <div class="Message-information">
                  <img :src="require(`../../../src/assets/avatar/${message.username}.png`)"
                    contain
                    height="35px"
                    width="35px"
                  />
                  <a> @{{ message.username }}</a>
                  <div class="date">
                    {{
                      new Date(message.message_date)
                        .toLocaleString()
                        .replace(/,/g, "  -")
                    }}
                  </div>
                
                </div>

                <div class="Message-content"></div>
              </div>

              <div></div>
              <section></section>

              <div class="messagecontent">{{ message.message_content }}</div>

              <button
                class="functions"
                v-if="message.username == username"
                @click="deleteMessage(message.message_id)"
              >
                ❌
              </button>

              <button
                class="functions"
                v-if="auth"
                @click="likeMessage(message.message_id, user_id)"
              >
                ❤️ {{ message.liked }}
              </button>
              <button
                class="functions"
                v-if="auth"
                @click="retweetMessage(message.message_id, user_id)"
              >
                <img
                  src="../../../src/assets/retweet.png"
                  contain
                  height="15px"
                  width="15px"
                />
              </button>
              <button class="functions"
                v-if="auth && message.user_id != user_id"
                @click="followUser(message.user_id)"
              >
                👫 {{ message.follow }}
              </button>
              <br />
              <br />
            </div>

            <!-- PARTIE RETWEET -->

            <div class="message-body" v-if="message.retweet_user_id != null">
              <div class="Message">
                <div class="Message-information">
                  <!-- WHO RETWEETED ? -->
                  <div v-if="message.retweet_user_id != null">
                    {{
                      message.retweet_username == username
                        ? "Vous"
                        : message.retweet_username
                    }}
                    a retweeté
                  </div>
                  <!-- AVATAR -->
<!-- img src="../../../src/assets/avatar/alex.png" -->
                  <img :src="require(`../../../src/assets/avatar/${message.username}.png`)"
                    contain
                    height="35px"
                    width="35px"
                  />
                  <!-- WHO WROTE THE MESSAGE -->
                  <a> @{{ message.username }} </a>

                  <!-- DATE -->
                  <div class="date">{{
                    new Date(message.message_date)
                      .toLocaleString()
                      .replace(/,/g, " -")
                  }}</div>
                  
                </div>
                <div class="Message-content">{{ message.message_content }}</div>
                <div class="Message-functions">
                  <button class="functions"
                    v-if="message.username == username"
                    @click="deleteMessage(message.message_id)"
                  >
                    ❌
                  </button>

                  <button class="functions"
                    v-if="auth"
                    @click="likeMessage(message.message_id, user_id)"
                  >
                    ❤️ {{ message.liked }}
                  </button>
                  <button 
                    class="functions"
                    v-if="message.retweet_user_id == user_id"
                    @click="delete_retweetMessage(message.message_id, user_id)"
                  >
                    <img
                      src="../../../src/assets/detweet.png"
                      contain
                      height="16px"
                      width="16px"
                    />
                  </button>
                  <button class="functions"
                    v-if="auth && message.user_id != user_id"
                    @click="followUser(message.user_id)"
                  >
                    🧑‍🤝‍🧑 {{ message.follow }}
                  </button>
                </div>
              </div>

              <br />

              <div id="border-bottom"></div>
            </div>
          </div>
        </div>

        <button v-if="messages.length > 10" @click="decrease_display_size()">
          Show less
        </button>
        <button v-if="messages.length > 10" @click="increase_display_size()">Show more</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import InputMessage from "./InputMessage.vue";

export default {
  name: "DisplayMessage",
  components: {
    InputMessage,
  },
  data() {
    return {
      content: "",
      message_max_length: 140,
      messages: Array,
      filterEveryone: false,
      filterMe: false,
      filterMyPost: false,
      filterHashtag: "",
      userFilter: "",
      filterFollow: false,
      limitPost: 10,
    };
  },
  props: ["user_id", "auth", "username"],

  created() {
    var self = this;
    function loop_display() {
      self.displayMessage();
      setTimeout(loop_display, 5000);
    }
    loop_display();
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
    delete_retweetMessage(messageID, user_id) {
      axios
        .post("/delete_retweetMessage", {
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
    increase_display_size() {
      this.limitPost += 10;
      this.displayMessage();
    },
    decrease_display_size() {
      if (this.limitPost > 10) {
        this.limitPost -= 10;
        this.displayMessage();
      }
    },
    set_everyone(data) {},
    displayMessage() {
      var mentionFilter = [];
      var hashtagFilter = [];
      var followFilter = this.filterFollow;
      var MyPostFilter = this.filterMyPost;
      var userFilter = this.userFilter.trim();
      var limitPost = this.limitPost;

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

      var user_id = this.user_id;

      if (user_id == "") {
        user_id = -1;
      }
      axios
        .post("/getMessage", {
          mentionFilter,
          hashtagFilter,
          followFilter,
          MyPostFilter,
          userFilter,
          limitPost,
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

<style>
.container {
  display: flex;
  flex: 1;
}

.container .filter {
  flex: 0 0 40%;
  justify-content: flex-end;
  border-right: 2px solid #2c3e50;
  margin-right: 20px;

  margin-left:auto;
    margin-right:auto;
}

.container .filter .filter-container {
  display: flex;
  flex-direction: column;
  float: right;
  margin-right: 30px;
}

.container .filter .filter-container .test {
  margin-bottom: 5px;
}

.container .body {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left:30px;
}



.body .header {
  height: 200px;
}

.body .display-post {
  height: 100%;
}

.message-body {
  width: 30%;
  border-bottom: 2px solid #2c3e50;
  margin-bottom: 20px;
}

.functions {
  width: 50px;
  height: 25px;
}

.date{
  margin-bottom:10px;
  font-size:14px;
  font-style: italic;
  margin-left:195px;
}

.functions{
  margin-top:10px;
}

.itsamessage{
  width:900px;

}

.messagecontent{
   word-wrap: break-word;
}
</style>
