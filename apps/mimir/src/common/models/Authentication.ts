import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Authentication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
    unique: true,
  })
  userId: number;
}
