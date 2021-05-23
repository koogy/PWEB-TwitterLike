CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name character varying(200) NOT NULL,
    password character varying(200) NOT NULL,
    role character varying(200) NOT NULL
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
    message_id BIGINT,
    user_id BIGINT,
    PRIMARY KEY(user_id,message_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(message_id) REFERENCES message(message_id)
);

insert into users(name,password,role) values ('alex','azer','client');
insert into users(name,password,role) values ('bob','azer','client');
insert into message(message_id,message_content,message_date) values(1,'haaha','2001-09-28 01:00:00');


select message_id,user_id,message_content,(SELECT count(message_id) from message_user_like where message_id = message.message_id group by message_id) from message;
select message_id,user_id as username,message_content,(SELECT count(message_id) from message_user_like where message_id = message.message_id group by message_id) from message,users where message.user_id = users.id;
insert into message_user_like(message_id,user_id,liked) values(73,4,'true') on CONFLICT(message_id,user_id) DO UPDATE SET liked = NOT message_user_like.liked;



var query = 'select message_id,user_id as username,message_content,message_date,(SELECT count(message_id) from message_user_like where message_id = message.message_id group by message_id) as liked from message,users where message.user_id = users.id'

/* A IMPLEMENTER */
select * from message where message_content like '%#haha' or message_content like '%#haha %' or message_content like '%#haha#%';








SELECT message.message_id,message.user_id,name AS username,message_content,message_date, retweet.user_id as retweet FROM (message join users ON message.user_id = users.id) LEFT OUTER JOIN retweet on message.message_id = retweet.message_id;

 SELECT message.message_id,message.user_id,name AS username,message_content,message_date, retweet.user_id as retweet FROM (message join users ON message.user_id = users.id) LEFT OUTER JOIN retweet on message.message_id = retweet.message_id;



 select message_id,user_id,name from retweet left join users on retweet.user_id = users.id;







 /* 
 
  */









  SELECT message.message_id,message.user_id,name,message.message_content FROM (message join users ON message.user_id = users.id)



  SELECT message.message_id,message.user_id,users.name,message.message_content,retweet.message_id,retweet.user_id,u2.name 
  FROM (((message join users ON message.user_id = users.id) 
  left outer join retweet on message.message_id = retweet.message_id)
  left join users as u2 on retweet.user_id = u2.id);



SELECT message.message_id,message.user_id,users.name AS username,message_content,message_date,
(SELECT count(message_id) FROM message_user_like 
WHERE message_id = message.message_id AND liked='t' GROUP BY message_id ) AS liked,
(SELECT count(followed) AS followed FROM follow WHERE followed ='t' and user_id= 4 AND usertofollow_id = message.user_id GROUP BY followed) AS follow,retweet.message_id as rt_message_user_id,retweet.user_id as rt_user_id,u2.name as rt_username 
FROM (((message join users ON message.user_id = users.id) 
left outer join retweet on message.message_id = retweet.message_id) 
left join users as u2 on retweet.user_id = u2.id) 
UNION 
(SELECT message.message_id,message.user_id,users.name AS username,message_content,message_date,(SELECT count(message_id) FROM message_user_like WHERE message_id = message.message_id AND liked='t' GROUP BY message_id ) AS liked,(SELECT count(followed) AS followed FROM follow WHERE followed ='t' and user_id= 4 AND usertofollow_id = message.user_id GROUP BY followed) AS follow,'-1' as rt_message_user_id,'-1' as rt_user_id,'' as rt_username 
FROM (message join users ON message.user_id = users.id)) 



And message_content like ‘%everyone’%

