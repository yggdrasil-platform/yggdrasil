import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class BaseModel {
  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
