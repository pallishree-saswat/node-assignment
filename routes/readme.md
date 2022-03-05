#nodejs blog with mongodb

#npm install
#npm start

#blog
#create blog
http://localhost:4000/api/v1/blog -- POST
#get single blog
http://localhost:4000/api/v1/blog/blogid --GET
#get all blogs
http://localhost:4000/api/v1/blog --GET
#update blog
http://localhost:4000/api/v1/blog/blogid --PUT
#delete blog
http://localhost:4000/api/v1/blog/blogid --DELETE

#paragraph
#create paragraph
http://localhost:4000/api/v1/para/blogid --POSt
#update paragraph
http://localhost:4000/api/v1/para/blogid/paragraphIndex --PUT
#delete paragraph
http://localhost:4000/api/v1/para/blogid/paragraphIndex --DELETE
#get paragraph
http://localhost:4000/api/v1/para --GET

#comment
#create comment on paragraph
http://localhost:4000/api/v1/blog/comment/paraId --POST
#delete comment
http://localhost:4000/api/v1/blog/comment/commentId --DELETE
#get all comments on paragraph
http://localhost:4000/api/v1/blog/comment/paraId --GET
