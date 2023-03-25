import { UserType } from "src/common/types/user";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "users"})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column()
  mobile : string;

  @Column()
  userType: UserType

  @Column({nullable: true})
  avatar: string;

  @Column({ nullable: true, type:"text"})
  address: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  hashRt: string;
}
