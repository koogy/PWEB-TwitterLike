
var mentionFilter = ['@everybody','@alex']
var hashtagFilter = ["#beau","#bogoss"]
var followFilter =  true
console.log(mentionFilter)
console.log(hashtagFilter)
console.log(followFilter)



var query =`
select message_id,user_id,username,message_content,message_date,
(SELECT count(message_id)
FROM message_user_like
WHERE message_id = bigboi.message_id
  AND liked='t'
GROUP BY message_id) AS liked
,
(SELECT count(followed) AS followed FROM follow WHERE followed ='t' and user_id= 4 AND usertofollow_id = bigboi.user_id GROUP BY followed) AS follow
,retweet_username,retweet_message_id,retweet_user_id from
(SELECT message.message_id,
    message.user_id,
    name as username,
    message_content,
    message_date,
    NULL as retweet_username,
    NULL AS retweet_message_id,
    NULL AS retweet_user_id
    FROM message join users on message.user_id = users.id
    
    UNION
    
    SELECT message_id,id as user_id,name as username,message_content,message_date,
    retweet_username,retweet_message_id,retweet_user_id
    FROM users
    JOIN
    (SELECT m.message_id,
        m.user_id,
        m.message_content,
        message_date,
        name AS retweet_username,
        retweet.message_id AS retweet_message_id,
        retweet.user_id AS retweet_user_id
    FROM message m
    JOIN retweet ON m.message_id = retweet.message_id
    JOIN users ON retweet.user_id = users.id) AS SQ1 ON users.id = SQ1.user_id) as bigboi
    where message_id != -1
`

var filtersQuery =""
for(var i = 0 ; i < mentionFilter.length ; i++){
  filtersQuery += "message_content like '%" + mentionFilter[i] + "%'"
  if(i+1 <mentionFilter.length){
    filtersQuery += ' AND '
  }
}

if(mentionFilter.length > 0 && hashtagFilter.length > 0){
  filtersQuery += ' AND '
}
for(var i = 0 ; i < hashtagFilter.length ; i++){
  filtersQuery += "message_content like '%" + hashtagFilter[i] + "%'"
  if(i+1 <hashtagFilter.length){
    filtersQuery += ' OR '
  }
}

if(filtersQuery.length >0){
  filtersQuery = " AND (" + filtersQuery + ") "
}

query += filtersQuery
if(followFilter){
    console.log("FOLLLOW FILTER !!")
    query += " AND ((select count(followed) AS followed FROM follow WHERE followed ='t' AND user_id= 4 AND usertofollow_id = bigboi.user_id group by followed)) =1"
  }

console.log(query)