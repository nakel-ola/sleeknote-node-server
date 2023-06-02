import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

enum GenderEnum {
  MALE = "male",
  FEMALE = "female",
}

@Entity("users")
export class User extends BaseEntity {
  @PrimaryColumn()
  @Generated("uuid")
  uid!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  photoUrl!: string;

  @Column({ type: "enum", enum: GenderEnum })
  gender!: GenderEnum;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
