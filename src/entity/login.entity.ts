import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, Generated } from 'typeORM';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  vip_id: number;

  @Column({ type: 'char', length: 200 })
  name: string;

  @CreateDateColumn()
  create_time: string;

  @UpdateDateColumn()
  last_login_time: string;

  @Column({ type: 'varchar', length: 200 })
  avatar: string;

  @Column({ type: 'char', length: 200 })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;
}