import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Photo } from "./entity/Photo";
import { Locations } from "./entity/Locations";
import { Posts } from "./entity/PostsSchema";


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
    Posts
  ],
  synchronize: true,
  logging: false
})
.then(()=>{}).catch(()=>{})