import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  private products: Array<{ id: number; name: string; price: number; categoryId: number }> = [
    { id: 1, name: 'The Hobbit', price: 9.99, categoryId: 1 },
    { id: 2, name: 'Laptop', price: 799.99, categoryId: 2 },
  ];

  create(createProductDto: CreateProductDto) {
    const id = this.products.length + 1;
    const product = {
      id,
      name: createProductDto['name'] ?? 'Unnamed',
      price: createProductDto['price'] ?? 0,
      categoryId: Number(createProductDto['categoryId'] ?? 1),
    };
    this.products.push(product);
    return product;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((p) => p.id === Number(id)) ?? null;
  }

  findByCategory(categoryId: number) {
    return this.products.filter((p) => p.categoryId === Number(categoryId));
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const idx = this.products.findIndex((p) => p.id === Number(id));
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...(updateProductDto as any) };
    return this.products[idx];
  }

  remove(id: number) {
    const idx = this.products.findIndex((p) => p.id === Number(id));
    if (idx === -1) return null;
    const [removed] = this.products.splice(idx, 1);
    return removed;
  }
}
