 <div>
    <div class="filter">
      <input
        type="checkbox"
        v-model.lazy="filterEveryone"
        v-on:change="displayMessage"
      />
      <label for="checkbox"> @everyone </label>

      <input type="checkbox" v-model="filterMe" v-on:change="displayMessage" />
      <label for="checkbox"> @me </label>

      <input
        type="checkbox"
        v-model="filterMyPost"
        v-on:change="displayMessage"
      />
      <label for="checkbox"> My post </label>

      <input
        type="checkbox"
        v-model="filterFollow"
        v-on:change="displayMessage"
      />
      <label for="checkbox"> Followed </label>
      <div></div>
      <input
        type="text"
        value="3"
        v-model="filterHashtag"
        placeholder="Search #"
        v-on:input="displayMessage"
      />

      <input
        type="text"
        value="3"
        v-model="userFilter"
        placeholder="Search User @"
        v-on:input="displayMessage"
      />
    </div>

    <div class="post">
      <div v-for="message in messages" v-bind:key="message.id">
        <!-- PARTIE TWEET -->

        <div v-if="message.retweet_user_id == null">
          <div class="Message">
            <div class="Message-information">
              <img
                :src="'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png'"
                contain
                height="20px"
                width="20px"
              />
              <a>{{ message.username }}</a>
              <div>
                {{
                  new Date(message.message_date)
                    .toLocaleString()
                    .replace(/,/g, " -")
                }}
              </div>
            </div>

            <div class="Message-content"></div>
          </div>

          <div></div>
          <section></section>

          <div>{{ message.message_content }}</div>

          <button
            v-if="message.username == username"
            @click="deleteMessage(message.message_id)"
          >
            Delete
          </button>

          <button v-if="auth" @click="likeMessage(message.message_id, user_id)">
            Like {{ message.liked }}
          </button>
          <button
            v-if="auth"
            @click="retweetMessage(message.message_id, user_id)"
          >
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

        <!-- PARTIE RETWEET -->

        <div v-if="message.retweet_user_id != null">
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

              <img
                :src="'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png'"
                contain
                height="20px"
                width="20px"
              />
              <!-- WHO WROTE THE MESSAGE -->
              <a> @{{ message.username }} </a>

              <!-- DATE -->
              {{
                new Date(message.message_date)
                  .toLocaleString()
                  .replace(/,/g, " -")
              }}
            </div>
            <div class="Message-content">{{ message.message_content }}</div>
            <div class="Message-functions">
              <button
                v-if="message.username == username"
                @click="deleteMessage(message.message_id)"
              >
                Delete
              </button>

              <button
                v-if="auth"
                @click="likeMessage(message.message_id, user_id)"
              >
                Like {{ message.liked }}
              </button>
              <button
                v-if="message.retweet_user_id == user_id"
                @click="delete_retweetMessage(message.message_id, user_id)"
              >
                DeTweet
              </button>
              <button
                v-if="auth && message.user_id != user_id"
                @click="followUser(message.user_id)"
              >
                Follow {{ message.follow }}
              </button>
            </div>
          </div>

          <section></section>

          <br />
        </div>
      </div>
    </div>

    <button @click="decrease_display_size()">Show less</button>
    <button @click="increase_display_size()">Show more</button>
  </div>