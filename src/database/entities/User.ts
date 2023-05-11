import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

export enum TypeAuth {
  LOCAL    = "local",
  GOOGLE   = "google",
  FACEBOOK = "facebook",
  GITHUB   = "github"
}

@Entity({name:"users"})
export class User extends BaseEntity {
  @Column({default: null})
  avatar: string;

  @Column({default:null})
  email:string;

  @Column({default:null})
  name:string;

  @Column({default:null})
  nickname:string;

  @Column({default:null})
  phone:string;

  @Column({default:null})
  address:string;

  @Column({default:null})
  password:string;

  @Column({
    name:"type_auth", 
    type: "enum", 
    enum: TypeAuth,
    default: TypeAuth.LOCAL
  })
  typeAuth: TypeAuth;

  @Column({name: "google_id", default:null})
  googleId: string;

  @Column({name: "facebook_id", default:null})
  facebookId: string;

  @Column({name: "github_id", default:null})
  githubId: string;

  @Column({default:"user"})
  role:string;
}