import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Photo } from "./entity/Photo";
import { Locations } from "./entity/Locations";
import { Posts } from "./entity/Posts";
import { Comments } from "./entity/Comments";
import { Likes } from "./entity/Likes";
import { Users } from "./entity/Users";



createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "test",
  entities: [
    Photo,
    Locations,
    Comments,
    Posts,
    Users,
    Likes,
  ],
  synchronize: true,
  logging: false,
})
.then(()=>{}).catch((err)=>{console.log(err, 'didnt establish connection')
})