import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Posts } from "./Posts";
import { Users } from "./Users";

@Entity()
export class Comments {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  time_created: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(type => Posts, (posts: Posts) => posts, {
  })
  post: Posts;

  @ManyToOne(type => Users, (users: Users) => users, {
    eager: true,
    nullable: false,
  })
  public user: Users;
}


// const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
// const Comments = require("../model/Comments").Comments; // import {Post} from "../model/Post";

// module.exports = new EntitySchema({
//   name: "Comments",
//   target: Comments,
//   columns: {
//     id: {
//       primary: true,
//       type: "int",
//       generated: "true",
//     },
//   }
// });


// /*export */ class Comments {
//   constructor(id, id_Posts, id_Users, text, time_created) {
//     this.id = id;
//     this.id_Posts = id_Posts;
//     this.id_Users = id_Users;
//     this.text = text;
//     this.time_created = time_created;

//   }
// }

// module.exports = {
//   Comments: Comments
// };
