CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name character varying(200) NOT NULL,
    password character varying(200) NOT NULL
);

CREATE TABLE message(
message_id SERIAL PRIMARY KEY,
user_id BIGINT,
message_content VARCHAR(140),
message_date timestamp,
FOREIGN KEY(user_id) REFERENCES users(id)
);


CREATE TABLE message_user_like(
message_id BIGINT REFERENCES message(message_id) ON DELETE CASCADE,
user_id BIGINT,
liked boolean, 
PRIMARY KEY(message_id,user_id),
FOREIGN KEY(user_id) REFERENCES users(id),
FOREIGN KEY(message_id) REFERENCES message(message_id)
);


CREATE TABLE follow(
    user_id BIGINT,
    userToFollow_id BIGINT,
    followed boolean, 
    PRIMARY KEY(user_id,userToFollow_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(userToFollow_id) REFERENCES users(id)
);

CREATE TABLE retweet(
    message_id BIGINT REFERENCES message(message_id) ON DELETE CASCADE,
    user_id BIGINT,
    PRIMARY KEY(user_id,message_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(message_id) REFERENCES message(message_id)
);


insert into users(name,password) values ('alex','azer');
insert into users(name,password) values ('bob','azer');
insert into users(name,password) values ('patrick','azer');
insert into users(name,password) values ('snoopy','azer');
