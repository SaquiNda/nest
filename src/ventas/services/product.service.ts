import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from 'src/shared/enums';
import { FindOptionsWhere, Repository } from 'typeorm'
import { ProductEntity } from '../entities/product.entity';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { ReadProduct } from '../dtos/products/read-product.dto';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { FilterProductDto } from '../dtos/products/filter-product.dto';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '../dtos/pagination.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ProductService {
    constructor(@Inject(RepositoryEnum.PRODUCT_REPOSITORY)
    private repository: Repository<ProductEntity>) {
    }
    //asisncorno el metoddo
    async create(payload: CreateProductDto): Promise<ServiceResponseHttpModel>
    //se tranbaja con la libreria htttp
    {
        const newProduct = this.repository.create(payload);
        const productCrated = await this.repository.save(newProduct)
        return { dta: planToInstance(ReadProduct, productCrated) }
    }
    async catalogue(): Promise<ServiceResponseHttpModel> {
        const response = await this.repository.findAndCount({ take: 1000 });
        return {
            data: response[0],
            pagination: { totalItem: response[1], limit: 10 }
        };
    }
    async finAll(params?: FilterProductDto) Promise<ServiceResponseHttpModel>{
        if(params?. limit > 0 && ParamsTokenFactory.page >= 0){
            return this.paginationAndFilter(params);
        }
        const response = await this.repository.findAndCount({
            order: { updateAt: 'DESC' }
        });
        return {
            data: plainToInstance(ReadProduct, response[1]),
            pagination: { totalItems: response[1], limit:10}
        }
        }
        async findOne(id: string): Promise<ServiceResponseHttpModel>{
            const response = await this.repository.findOneBy({ id });
            if (!response){
                throw new NotFoundException('request not found')
            }
            return {
                data: plainToInstance(ReadProductDto, response),
            }
        }

        private paginationAndFilter(params: FilterProductDto): Promise<ServiceResponseHttpModel>{
            let where:
            FindOptionsWhere<ProductEntity>
            
            where = {};
            let { page, search } = params;
            const { limit } = params;
            if(search) {
                search = search.trim();
                page = 0;
                where = [];
            }
            const data = this.repository.findAndCount({
                relations: ['bloodType', 'gender'],
                where,
                take: limit,
                skip: PaginationDto.getOffset(limit, page),
            });
            return { pagination: { limit, totalItems: data[1]}, data:data[0]}
        }

        //metodos para relaizR EL UPDATE Y REMOVE
        //CODIGOS GENERICOS PARA SERVICION CON EL NOMBRE RESPONSE
        async update(id: string, payload: UpdateProductDto){
            const product = await this.repository.findOneBy({ id });
            if(!product){
                throw new NotFoundException('product not found');
            }
            this.repository.merge(product, payload);
            return this.repository.save(product);
        }
        async remove(id: string){
            const product = await this.repository.findOneBy({ id });
            if(!product){
                throw new NotFoundException('product not found');
            }
            return await this.repository.softRemove(product);
        }
        async removeAll(payload: ProductEntity){
            const product = await this.repository.findOneBy({ id });
            if(!product){
                throw new NotFoundException('product not found');
            }
            this.repository.merge(product, payload);
            return this.repository.save(product);
        }
    }
