/* eslint-disable prettier/prettier */
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.model';
// import { before } from 'node:test';

@Entity('products', { schema: 'ventas' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'create_at', //trabajamos con guion bajo
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
  @DeleteDateColumn({
    name: 'delete_at',
    type: 'timestamp',
    nullable: true,
  })
  deleteAt: Date;
  @Column('varchar',{
    name:'title',
    nullable:false,
    comment:'nombre del producto'
  })
  title:string;
  @Column('number',{
    name:'price',
    nullable:false,
    comment:'precio del producto'
  })
  price:number;
  @Column('varchar',{
    name:'description',
    nullable:false,
    comment:'descripcion del producto'
  })
  description:string;
  @Column('varchar',{
    name:'imagen',
    nullable:false,
    comment:'imagen del producto'
  })
  imagen:string;
  @Column('number', {
    name:'category',
    nullable: false,
    comment:'category del producto'
  })
  category:CategoryEntity;
  main: any;
  @ManyToOne(
    () => CategoryEntity,
    category => category.products
  )
  categorys: CategoryEntity;

  @BeforeInsert()
  @BeforeUpdate()
  setMail(){
    if (this.main) {
      return;
    }
    this.main = this.main.toLowerCase().trim();
  }
  
  // @Entity('products',)
  // @Befo rel nsert()
  // @BeforeUpdateO
  // @getTitle0{
  // if (!this.title) {
  // return;
  // this.title = this.title.toUpperCaseO;
  // getEmai10{
  // if (!this.email) {
  // return;
  // this.email = this.email.toLowerCase0.trim0,
  // getPassword0{
  // if (!this.password) {
  // return;
  // this.password = Bcrypt.hash(this.password, 12);
  // 13:08
  
}
