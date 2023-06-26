/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.model";

@Entity('categories', {schema: 'ventas'})

export class CategoryEntity {
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
        name:'name',
        nullable:false,
        comment:'nombre de la categoria'
    })
    name:string;
    @Column('varchar',{
        name:'description',
        nullable:true,
        comment:'descripcion de la categoria'
    })
    description:string;
//relacion entre entidades
    @OneToMany(
      () =>ProductEntity,
      product => product.categorys)
      products: ProductEntity[];

    // @ManyToMany(
    //   () = ProductEntity,
    //   product => product.size
    // )
    // @JoinTable()
    // product: ProductEntity[];

    // @ManyToMany(
    //   () = SizeEntity,
    //   size => size.product
    // )
    // sizes: SizeEntity[];

    
}
