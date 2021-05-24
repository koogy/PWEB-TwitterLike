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


insert into message(message_id,user_id,message_content,message_date) values(24,1,'Hello World ! I''m Alex @everyone','2021-05-24 18:18:24');
insert into message(message_id,user_id,message_content,message_date) values(26,3,'Bonjour @everyone, moi c''est Patrick. Je ne parle pas le english #spongebob#pink','2021-05-24 18:30:56');
insert into message(message_id,user_id,message_content,message_date) values(27,2,'Pourquoi est-ce que je suis jaune ? #spongebob#pink','2021-05-24 18:31:32');
insert into message(message_id,user_id,message_content,message_date) values(29,4,'Wouf wouf @alex','2021-05-24 18:32:40');
insert into message(message_id,user_id,message_content,message_date) values(30,1,'Mais qu''est ce qu''il fait ici @snoopy ? ','2021-05-24 18:42:12');
insert into message(message_id,user_id,message_content,message_date) values(31,2,'Je vais aller faire la vaisselle ! @everyone','2021-05-24 18:43:44');
insert into message(message_id,user_id,message_content,message_date) values(32,3,'Sevenworm slips on a banana peel. Je ne sais pas ce que je viens de dire...@everyone #help#translate#english','2021-05-24 18:49:00');
insert into message(message_id,user_id,message_content,message_date) values(33,3,'ffffeajiuqdnceapov xwpoeaaaaaaaa j,idsvj zjiogzr^grç''(çe&fjf e!§*','2021-05-24 18:50:13');
insert into message(message_id,user_id,message_content,message_date) values(34,3,'Oh non, mon chat recommence... #cat#cute','2021-05-24 18:51:07');

insert into message(message_id,user_id,message_content,message_date) values(35,4,'@patrick Toujours là pour nous embêter ces chats ... #hate#cat#wouf','2021-05-24 18:52:48');
insert into message(message_id,user_id,message_content,message_date) values(36,2,'@patrick Moi j''ai un dragon à la maison ! HAHA #dragon#pet','2021-05-24 18:53:58');
insert into message(message_id,user_id,message_content,message_date) values(37,2,'Oh non, mon dragon commence à tout détruire !! @everyone #help','2021-05-24 18:54:59');
insert into message(message_id,user_id,message_content,message_date) values(38,2,'@alex Appelle Superman vite !!','2021-05-24 18:55:47');
insert into message(message_id,user_id,message_content,message_date) values(39,1,'@bob Mais qu''est ce que tu racontes ? un dragon ?? #liar','2021-05-24 18:57:43');
insert into message(message_id,user_id,message_content,message_date) values(40,4,'J''ai faim !! Donnez moi à manger svpp @everyone #hungry#nomoney#wouf','2021-05-24 18:58:50');
insert into message(message_id,user_id,message_content,message_date) values(41,3,'Youhou ! Ma pizza arrive, tchao tout le monde @everyone #hungry#wouf','2021-05-24 19:01:19');






