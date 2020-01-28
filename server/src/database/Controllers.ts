import "reflect-metadata";
import { getManager, EntityManager, Between } from "typeorm";
import { Locations } from "./entity/Locations";
import { Posts} from "./entity/Posts";
import { Comments} from "./entity/Comments";
import { Likes } from "./entity/Likes";
import { Users } from "./entity/Users";
const typeorm = require("typeorm"); // import * as typeorm from "typeorm";
const entityManager = getManager(); // you can also get it via getConnection().manager

const createPost = (postValues:object, locationValues:object)=>{
  let post = new Posts();
  Object.assign(post, postValues)
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
const createComment = (commentValues:any, postId:(number))=>{
  const comment = new Comments();
  Object.assign(comment, commentValues);
  return getPost({postId}).then((post:any)=>{
    console.log(post)
    comment.post = post;
    return entityManager.save(Comments, comment);
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
//testing area
setTimeout(()=>{ 
  //make post and location
  // const post = new Posts();
  // const location = new Locations();
  // post.coordinate = location;
  // post.post_anonymous = false;
  // post.post_local = false;
  // post.post_public = false;
  // post.text = "post text";
  // post.time_expires = "unfinished feature";
  // post.title = "post title";
  // location.long = 0.0;
  // location.lat = 0.0;
  // createPost(post, location)
  // const comment = new Comments();
  // comment.text = "lolol";
  // //make comment
  // createComment(comment, 1).then(x=>console.log(x)).catch(x=>console.error(x))
  // const user = new Users();
  // user.bio = "bio"
  // user.email = "email";
  // user.name_first = "paul"
  // user.name_last = "Stumpe"
  // user.password = 'lala'
  // user.public = true;
  // user.status = "status";
  // user.username = 'jerkey2';
  // createUser(user);
  removeLike(1,1).then(x=>console.log(x)).catch(x=>console.log(x))
  getAllPosts().then((posts:any)=>console.log(posts[0]));

  // addLike(1, 1).then(x=>console.log(x)).catch(x=>{console.log(x)})
  // addLike(1, 2).then(x => console.log(x)).catch(x => { console.log(x) })
  // addLike(1, 3).then(x => console.log(x)).catch(x => { console.log(x) })


}, 300);
//end of testing area
export {getLocation, createLocationOrFindLocation, getAllPosts, getPost, createPost}