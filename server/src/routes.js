const { Router } = require('express');
const apiRouter = Router();
import { getPost, getAllPosts, createPost, removeLike, addLike, createUser, getUser, createComment } from "./database/Controllers";
require('./database/databaseTestingFunctions');

// apiRouter.get('/apple', (req, res) => {
//   console.log('hit')
// });
/*{
  GET to '/messages'
  params: required {location, username || userId}
  params: optional {radius, topics}
  Retruns: a body with an array of all messages in that radius.
    If topics were provided, it will  only return posts with those topics
  }
  */
apiRouter.get('/messages/all', (req, res)=>{
  getAllPosts()
  .then(allPosts=>{
    res.send(allPosts);
  })
  .catch(err=>{
    console.log(err)
    res.status(400)
    res.send("error")
  })
})
apiRouter.get('/messages', (req, res)=>{
  console.log(req.body);
  let post = {};
  for (let key in req.body){
    post[key] = req.body[key];
  }
  console.log(post.length);
  getPost(post).then(post=>{
    console.log(post);
    res.send(post)
  })
  .catch(err=>{
    res.status(400)
    console.log(err)
    res.send("error")
  })
})
apiRouter.post('/messages',(req, res)=>{
  const { title, text, post_public, post_local, time_created, updated_at, time_expires, post_anonymous, coordinate, userId} = req.body;
  let user = {id:userId};
  let post = {
    title :title,
    text : text,
    post_public : post_public,
    post_local : post_local,
    // time_created,
    // updated_at,
    time_expires : "unfinshed",
    post_anonymous : post_anonymous,
  };
  console.log('this is the text', req.body)
  createPost(post, coordinate, user)
  .then(post=>{
    res.send(post);
  })
  .catch(err=>{
    res.status(400)
    console.log(err, 'error')
    res.send("error")
  });
})

apiRouter.get('/users',(req, res)=>{
  let user = {};
  for (let key in req.body) {
    user[key] = req.body[key];
  }
  getUser(user)
  .then(user => {
    res.status = 200;
    res.send(user);
  })
  .catch(err => {
    console.log(err)
    res.status = 404;
    res.send()
  })
})

apiRouter.post('/users',(req, res)=>{
  let user = {};
  for (let key in req.body) {
    user[key] = req.body[key];
  }
  createUser(user)
  .then(user => {
    res.status = 200;
    res.send(user);
  })
  .catch(err => {
    console.log(err)
    res.status = 404;
    res.send()
  })
})

apiRouter.post('/likes',(req, res) => {
  const {userId, postId} = req.body
  addLike(userId, postId)
  .then(like=>{
    res.status=200;
    res.send(like);
  })
  .catch(err=>{
    console.log(err)
    res.status = 404;
    res.send('there was an error adding this like')
  })
})
apiRouter.delete('/likes',(req, res)=>{
  const { userId, postId } = req.body
  removeLike(userId, postId)
  .then(like=>{
    res.status=200;
    res.send(like)
  })
  .catch(err=>{
    console.log(err)
    res.status = 404;
    res.send('there was an error adding this like')
  })
})

apiRouter.post('/comments', (req, res) => {
  console.log (req.body)
  const {postId, text, userId}= req.body
  let comment = {text: text};
  createComment(comment, postId, userId)
  .then(comment=>{
    res.status = 200;
    res.send(comment);
  })
  .catch(err=>{
    console.log(err)
    res.status= 404;
    res.send()
  })
})


//endpoints we will need
//get: messages within x proximity of location

//get: messages within x promixity of location by interests
//get: tweets by location
//get: google places by location
//post: dropmessage at a location
//patch: alter message 
//get: own user profile
//get: other users profiles
//get: users groups
//get: groups members
//get: users friends
//get: users dms/converstaions
//get: messages from a conversation
//post: add a friend request
//get: users interests
//post: post a new user interst
//delete: remove a users interest
//get: a posts comments
//post: add a comment to a post
//post: make group
//post: add new group member
//patch: alter group bio




module.exports.apiRouter = apiRouter;
