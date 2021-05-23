var str = "This product price is ##HAHA15.00 and old price is #19.00";

// if `£` follows non-digit also then use
console.log(str.match(/#\S+/g));
// if `£` follows only number with fraction
console.log(str.match(/#(\d+(\.\d+)?)/g));






select message_id,user_id,name as username,message_content,message_date,(select count(followed) as followed from follow where user_id= 4 and usertofollow_id = message.user_id group by followed) as follow from message, users where message.user_id = users.id ;


var query = "SELECT message_id,user_id,name AS username,message_content,message_date,(SELECT count(message_id) FROM message_user_like WHERE message_id = message.message_id AND liked='t' GROUP BY message_id ) AS liked,"
+ "(SELECT count(followed) AS followed FROM follow WHERE followed ='t' and user_id= 4 AND usertofollow_id = message.user_id GROUP BY followed) AS follow" 
+ "FROM message,users WHERE message.user_id = users.id "