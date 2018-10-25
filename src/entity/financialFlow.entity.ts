import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class FinancialFlow {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({type: 'datetime'})
  create_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @Column({type: 'varchar', length: 200})
  type_icon: string;

  @Column({type: 'int'})
  type_id: number;

  @Column({ type: 'float' })
  money: number;
}