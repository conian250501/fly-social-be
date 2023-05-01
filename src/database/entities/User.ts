import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

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

  @Column({default:null})
  type:string;

  @Column({default:"user"})
  role:string;
}