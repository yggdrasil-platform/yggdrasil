import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Authentication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
    unique: true,
  })
  userId: string;
}
