import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with ID: ', this.id);
  }

  @AfterUpdate()
  logUpdated() {
    console.log('Updated user with ID: ', this.id);
  }

  @AfterRemove()
  logRemoved() {
    console.log('Removed user with ID: ', this.id);
  }
}
