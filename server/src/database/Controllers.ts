import "reflect-metadata";
import { getManager, EntityManager, Between } from "typeorm";
import { Locations } from "./entity/Locations";
import { Posts} from "./entity/Posts";
import { Comments} from "./entity/Comments";
import { Likes } from "./entity/Likes";
import { Users } from "./entity/Users";
import { userInfo } from "os";
const typeorm = require("typeorm"); // import * as typeorm from "typeorm";
const entityManager = getManager(); // you can also get it via getConnection().manager

const createPost = (postValues:object, locationValues:object, userValues:object)=>{
  let post = new Posts();
  let user = new Users();
  Object.assign(user, userValues);
  Object.assign(post, postValues);
  post.user = user;
  if(locationValues){
    let location = new Locations();
    Object.assign(location, locationValues);
    post.coordinate = location;
    return createLocationOrFindLocation(location)
      .then(loc => {
        post.coordinate = loc;
        return entityManager.save(Posts, post)
      })
      .catch()
  } else {
    return entityManager.save(Posts, post)
      .then(x=>{
        return x;
      })
      .catch(x => {
        console.log('error on making post');
      })
  }
}


const getPost = (postValues:object)=>{
  const post = new Posts();
  Object.assign(post, postValues)
  return entityManager.findOne(Posts, post)
}
const getAllPosts = ()=>{
  return entityManager.find(Posts, { relations: ["coordinate"] })
.catch(x=>console.log(x))
}

const getAllPostsInRadius = (location:Locations, radius:number)=>{
  let minLong = location.long - radius;
  let maxLong = location.long + radius;
  let minLat = location.lat - radius;
  let maxLat = location.lat + radius;
    return entityManager
    .createQueryBuilder()
    .leftJoinAndSelect("posts.coordinate","coordinate")
    .getMany();
}
const createComment = (commentValues:any, postId:(number), userId:(number))=>{
  let comment = new Comments();
  console.log(commentValues)
  Object.assign(comment, commentValues);
  let post = new Posts()
  let userL = new Users();
  return getPost({id:postId})
  .then((post:any)=>{
    // console.log(post)
    comment.post = post;
    // return entityManager.save(Comments, comment);
    return getUser({id:userId})
  })
  .then((user:any)=>{
    // comment.user = user;
    userL.id = userId;
    comment.user = userL
    console.log(userL)
    return entityManager.save(comment);
  })

}
//adds like from user to post
const addLike = (userId:number, postId:number)=>{
  const like = new Likes();
  const post = new Posts()
  const user = new Users();
  user.id = userId
  post.id = postId;
  like.post = post;
  like.user = user;
  return entityManager.save(Likes, like)
}
const removeLike = (userId: number, postId: number) => {
  const like = new Likes();
  const post = new Posts()
  const user = new Users();
  user.id = userId
  post.id = postId;
  like.post = post;
  like.user = user;
  return entityManager.findOne(Likes, like).then(like=>{
    return entityManager.remove(like);
  })
}

const createUser = (userValues:any)=>{
  let user = new Users();
  Object.assign(user,userValues);
  return entityManager.save(Users, user);
}

const getUser = (userValues: any) => {
  let user = new Users();
  Object.assign(user, userValues);
  return entityManager.find(Users, user);
}

const createLocationOrFindLocation = (locationValues:any)=>{
  const location = new Locations();
  Object.assign(location, locationValues)
  const entityManager = getManager(); // you can also get it via getConnection().manager
  return entityManager.findOne(Locations, location)
  .then((locationFound:any)=>{
    if(locationFound){
      return locationFound
    } else{
      return entityManager.save(Locations, location)
    }
  })
}

const getLocation = (locationValues:any)=>{
  const location = new Locations();
  Object.assign(location, locationValues);
  const entityManager = getManager();
  return entityManager.findOne(Locations, location)
  .then(x=>console.log(x, "HEREEEEEEEEEE"))
}

export {
  getLocation,
  createLocationOrFindLocation,
  getAllPosts,
  getPost,
  createPost,
  addLike,
  removeLike,
  createUser,
  createComment,
  getUser,
}