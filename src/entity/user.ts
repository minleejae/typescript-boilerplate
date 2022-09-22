import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  //id : auto Increment
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastName: string;

  @Column()
  nickName: string;
}
